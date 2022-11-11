import React, { useState, useEffect } from "react";
import CollectionCard from "./../card-collection-nft";
import { setCookie } from "cookies-next";
import { getListedContractAddress } from "./../../utils/subgraph/getMarketListedItem";
import { useApolloClient } from "@apollo/client";
import { GET_LISTED_ITEMS_STATUS } from "../../config/graphQLQueries";

import { get } from "./../../utils/";

export default function ExploreDetails(probs) {
  const [collectionNames, setCollectionsName] = useState([]);
  var [collectionOwen, setCollectionOwen] = useState(0);
  var [isGetOwnNFT, setIsGetOwnNFT] = useState(false);
  var [isLoaded, setIsLoaded] = useState(false);
  const client = useApolloClient();

  async function runQuery() {
    const useQueryData = await client.query({
      query: GET_LISTED_ITEMS_STATUS,
      variables: {
        status: true,
        limit: 3,
        userAddress: probs.userAddress.toLowerCase(),
      },
    });
    console.log(probs.id, "runQuery", useQueryData);
    return useQueryData;
  }
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var collectionApi = await get("get-all-collection", {});
      if (collectionApi.data.status == 200) {
        setCookie("router", "explorer");
        setCollectionsName(collectionApi.data.row);
      } else {
        setCollectionsName([]);
      }
    };
    // console.log("categories.length", categories.length);
    if (collectionNames.length == 0) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    console.log("probs.userAddress", probs.userAddress);

    // declare the data fetching function
    const fetchData = async () => {
      setIsGetOwnNFT(true);
      var listedItem = await runQuery();
      console.log("listedItem", listedItem);
      if (listedItem.data.itemListedEntities) {
        var ownNFTs = await getListedContractAddress(listedItem.data);
        console.log("ownNFTs", ownNFTs);
        if (Object.keys(ownNFTs).length != 0) {
          for (let index = 0; index < collectionNames.length; index++) {
            if (Object.keys(ownNFTs).includes(collectionNames[index].address)) {
              collectionNames[index]["tokenId"] =
                ownNFTs[collectionNames[index].address][0].tokenId;
              console.log("collectionNames[index]", collectionNames[index]);
              delete ownNFTs[collectionNames[index].address];
            }
          }
          console.log("ownNFTs", collectionNames);
          var keys = Object.keys(ownNFTs);
          for (let index = 0; index < keys.length; index++) {
            let temp = {
              name: ownNFTs[keys[index]][0].name,
              address: ownNFTs[keys[index]][0].address,
              tokenId: ownNFTs[keys[index]][0].tokenId,
            };
            let arr = collectionNames;
            arr.push(temp);
            console.log("arr", temp);
            setCollectionsName(arr);
          }
          setIsLoaded(true);
        } else {
          setIsLoaded(true);
        }
      } else {
        setIsLoaded(true);
      }
    };
    // console.log("categories.length", categories.length);
    if (probs.userAddress && !isGetOwnNFT) {
      fetchData();
    }
  }, [probs]);
  return (
    <>
      <section className="nft__explore-whole-items mt-36 px-36 xl:max-w-full lg:container">
        <h2 className="text-dark_mode font-semibold">Explore</h2>
        <div className="flex flex-row items-center mt-24">
          <div className="basis-6/12">
            <div className="border-b border-gray-200">
              <ul
                className="flex flex-wrap text-lg font-semibold text-center"
                data-tabs-toggle="#tab-explore-whole-items"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 pb-2 border-b-2 !border-dark_mode !hover:border-gray-200 !text-dark_mode"
                    id="tab-collections"
                    data-tabs-target="#collections"
                    type="button"
                    role="tab"
                    aria-controls="collections"
                    aria-selected="false"
                  >
                    Collections
                    <span className="ml-3">{collectionOwen}</span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 pb-2 !text-gray-300 pointer-events-none"
                    id="tab-nfts"
                    data-tabs-target="#nfts"
                    type="button"
                    role="tab"
                    aria-controls="nfts"
                    aria-selected="false"
                  >
                    NFTs
                    <span className="ml-3">465,367</span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-4 pb-2 !text-gray-300 pointer-events-none"
                    id="tab-creators"
                    data-tabs-target="#creators"
                    type="button"
                    role="tab"
                    aria-controls="creators"
                    aria-selected="false"
                  >
                    Creators
                    <span className="ml-3">232,987</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-6/12">
            <div className="flex flex-row justify-end">
              <button
                type="button"
                className="py-1 px-4 mr-4 flex items-center justify-center rounded-full border border-solid border-gray-200 bg-transparent text-dark_mode text-sm font-semibold hover:bg-gray-100"
              >
                <i className="fa-solid fa-arrow-up-wide-short mr-4 text-lg"></i>
                Price range
              </button>
              <button
                type="button"
                className="py-1 px-4 mr-4 flex items-center justify-center rounded-full border border-solid border-gray-200 bg-transparent text-dark_mode text-sm font-semibold hover:bg-gray-100"
              >
                <i className="fa-solid fa-arrow-up-wide-short mr-4 text-lg"></i>
                Categories
              </button>
              <button
                type="button"
                className="py-1 px-4 last:mr-0 flex items-center justify-center rounded-full border border-solid border-gray-200 bg-transparent text-dark_mode text-sm font-semibold hover:bg-gray-100"
              >
                <i className="fa-solid fa-arrow-up-wide-short mr-4 text-lg"></i>
                Recently listed
              </button>
            </div>
          </div>
        </div>
        <div id="tab-explore-whole-items" className="mt-10">
          <div
            className="block"
            id="collections"
            role="tabpanel"
            aria-labelledby="tab-collections"
          >
            {" "}
            <div className="grid grid-cols-4 gap-4">
              {isLoaded &&
                collectionNames &&
                collectionNames.map((element, index) => (
                  <>
                    <CollectionCard
                      index={index}
                      id={element.address}
                      CollectionName={element.name}
                      userAddress={probs.userAddress}
                      setCollectionOwen={setCollectionOwen}
                      collectionOwen={collectionOwen}
                      injectedProvider={probs.injectedProvider}
                      callpage="explorer"
                      tokenId={element.tokenId}
                    />
                  </>
                ))}
            </div>
          </div>
          <div
            className="hidden"
            id="nfts"
            role="tabpanel"
            aria-labelledby="tab-nfts"
          >
            <span>Tab content - NFTs</span>
          </div>
          <div
            className="hidden"
            id="creators"
            role="tabpanel"
            aria-labelledby="tab-creators"
          >
            <span>Tab content - Creators</span>
          </div>
        </div>
        <div className="nft__load-more-button flex justify-center mt-10">
          <button
            type="button"
            className="py-3 px-12 mr-4 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium"
          >
            Load more
          </button>
        </div>
      </section>
    </>
  );
}
