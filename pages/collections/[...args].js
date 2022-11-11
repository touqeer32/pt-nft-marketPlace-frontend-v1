import { useState, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { getNftsForOwner } from "./../../utils/alchmey/getUserNFT";
import { getListedMetaData } from "./../../utils/subgraph/getMarketListedItem";
import Card from "../../components/card-details-nft";
import { get } from "../../utils";
import { useApolloClient } from "@apollo/client";
import { GET_LISTED_ITEMS_STATUS } from "../../config/graphQLQueries";
export default function collectionDetails(probs) {
  const router = useRouter();

  const { args } = router.query;
  const [collection, setCollection] = useState({});
  var [collectionNFTs, setCollectionNFTs] = useState([]);
  var [collectionOnChainNFTs, setCollectionOnChainNFTs] = useState([]);
  var [isOnChainNFT, setIsOnChainNFT] = useState(false);

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
      var collectionApi = await get("get-collection-by-address", {
        address: args[1],
      });
      if (collectionApi.data.status == 200) {
        setCollection(collectionApi.data.collections);
      } else {
        toast.error("Server Issue Please Check Later");
        Router.push("/account/profile");
      }
    };
    if (collection && Object.keys(collection).length === 0 && args) {
      fetchData();
    }
  });

  useEffect(() => {
    let router = getCookie("router");
    // declare the data fetching function
    const fetchData = async () => {
      if (router) {
        var collectionApi = await get(
          router != "explorer"
            ? "get-user-lazy-nft"
            : "get-listed-nft-with-collection",
          {
            collectionId: args[1],
            wallet: probs.userAddress,
          }
        );
        console.log(router, "collectionApi", args[1]);
        if (collectionApi.data.status == 200 && collectionApi.data.row) {
          setCollectionNFTs(collectionApi.data.row);
        } else {
          toast.error("Server Issue Please Check Later");
          Router.push("/account/");
        }
      } else {
        Router.push("/account/");
      }
    };

    if (collectionNFTs.length == 0 && probs.userAddress != "") {
      fetchData();
    }
  }, [probs]);

  useEffect(() => {
    // declare the data fetching function
    let router = getCookie("router");

    const fetchData = async () => {
      setIsOnChainNFT(true);
      let ownNFTs = await getNftsForOwner(probs.userAddress, 100);
      console.log("getNftsForOwner");
      if (
        Object.keys(ownNFTs).length != 0 &&
        Object.keys(ownNFTs).includes(args[1].toLowerCase())
      ) {
        try {
          setCollectionOnChainNFTs(ownNFTs[args[1].toLowerCase()]);
          console.log("collectionOnChainNFTs", ownNFTs[args[1].toLowerCase()]);
        } catch (err) {
          console.log("error to load metadata", err);
        }
      }
    };
    if (
      collectionOnChainNFTs.length == 0 &&
      probs.userAddress != "" &&
      router != "explorer" &&
      !isOnChainNFT
    ) {
      fetchData();
    }
  });
  useEffect(() => {
    // declare the data fetching function
    let router = getCookie("router");

    const fetchData = async () => {
      setIsOnChainNFT(true);
      var listedItems = await runQuery();
      console.log("listedItem", listedItems);
      var nfts = await getListedMetaData(listedItems.data, args[1]);
      console.log("nfts", nfts);
      if (
        Object.keys(nfts).length != 0 &&
        Object.keys(nfts).includes(args[1])
      ) {
        try {
          setCollectionOnChainNFTs(nfts[args[1]]);
          console.log("collectionOnChainNFTs", nfts[args[1]]);
        } catch (err) {
          console.log("error to load metadata", err);
        }
      }
    };
    if (
      collectionOnChainNFTs.length == 0 &&
      probs.userAddress != "" &&
      router == "explorer" &&
      !isOnChainNFT
    ) {
      fetchData();
    }
  });
  return (
    <>
      {/* {# nft__hero-cover-collection-details #} */}
      <section className="nft__hero-cover-collection-details mt-24 px-20 xl:max-w-full lg:container">
        <figure className="relative">
          {probs.isColour && (
            <div
              className="w-full h-[60vh] rounded-xl border-4 border-solid border-gray-100 object-cover"
              style={{ background: probs.profilePicColor }}
            ></div>
          )}

          {!probs.isColour && (
            <img
              src={{ background: probs.profilePicColor }}
              alt="Cover collection"
              className="w-full h-[60vh] rounded-xl border-4 border-solid border-gray-100 object-cover"
            />
          )}

          <figcaption className="absolute bottom-4 right-4">
            <button
              type="button"
              className="py-2 px-4 flex items-center justify-center rounded-full bg-nft_institutional hover:bg-nft_institutional_dark text-dark_mode text-sm font-medium"
            >
              <i className="fa-solid fa-share-nodes mr-3 text-lg"></i>
              Share
            </button>
          </figcaption>
        </figure>
        <div className="px-16 xl:max-w-full lg:container">
          <div className="flex justify-between">
            <div className="basis-6/12">
              <figure className="relative z-10 mt-[-100px]">
                {probs.isColour && (
                  <div
                    className="w-36 h-36 rounded-lg object-cover border-4 border-solid border-gray-100"
                    style={{ background: probs.profilePicColor }}
                    alt="Avatar profile collection"
                  ></div>
                )}
                {!probs.isColour && (
                  <img
                    src={probs.profilePicColor}
                    alt="Avatar profile collection"
                    className="w-36 h-36 rounded-lg object-cover border-4 border-solid border-gray-100"
                  />
                )}

                <figcaption className="mt-6">
                  <h5 className="text-dark_mode font-semibold">
                    {collection && collection.name}
                    <span className="relative align-middle ml-2">
                      <i className="fa-solid fa-certificate text-nft_institutional text-2xl"></i>
                      <i className="fa-solid fa-check text-light_mode text-lg absolute top-[1px] left-[3px]"></i>
                    </span>
                  </h5>
                  <h6 className="text-base text-gray-300">
                    Created by
                    <span className="underline">Yung DooMari</span>
                  </h6>
                </figcaption>
              </figure>
              <div className="mt-10">
                <p className="text-dark_mode leading-loose">
                  {collection && collection.description}
                </p>
              </div>
            </div>
            <div className="basis-4/12">
              <div className="flex flex-row items-start justify-end mt-16">
                <hgroup className="first:ml-0">
                  <h5 className="text-dark_mode text-xl font-semibold">
                    142.5K ETH
                  </h5>
                  <h6 className="text-gray-300 text-sm">Total Volume</h6>
                </hgroup>
                <hgroup className="ml-10">
                  <h5 className="text-dark_mode text-xl font-semibold">
                    13.59 ETH
                  </h5>
                  <h6 className="text-gray-300 text-sm">Floor price</h6>
                </hgroup>
                <hgroup className="ml-10">
                  <h5 className="text-dark_mode text-xl font-semibold">
                    1.05 ETH
                  </h5>
                  <h6 className="text-gray-300 text-sm">1.05 ETH</h6>
                </hgroup>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="nft__main-collection-details px-36 mt-16 xl:max-w-full lg:container">
        <div className="flex flex-row items-center">
          <div className="basis-6/12">
            <div className="border-b border-gray-200">
              <ul
                className="flex flex-wrap text-lg font-semibold text-center"
                data-tabs-toggle="#tab-main-collection-details"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-3 pb-2 border-b-2 !border-dark_mode !hover:border-gray-200 !text-dark_mode"
                    id="tab-nfts"
                    data-tabs-target="#nfts"
                    type="button"
                    role="tab"
                    aria-controls="nfts"
                    aria-selected="false"
                  >
                    NTFs
                    <span className="ml-2">
                      {collectionNFTs.length + collectionOnChainNFTs.length}
                    </span>
                  </button>
                </li>
                <li className="last:mr-0" role="presentation">
                  <button
                    className="inline-block p-3 pb-2 !text-gray-300 pointer-events-none"
                    id="tab-activities"
                    data-tabs-target="#activities"
                    type="button"
                    role="tab"
                    aria-controls="activities"
                    aria-selected="false"
                  >
                    Activities
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
                className="py-1 px-4 last:mr-0 flex items-center justify-center rounded-full border border-solid border-gray-200 bg-transparent text-dark_mode text-sm font-semibold hover:bg-gray-100"
              >
                <i className="fa-solid fa-arrow-up-wide-short mr-4 text-lg"></i>
                Recently listed
              </button>
            </div>
          </div>
        </div>
        <div id="tab-main-collection-details" className="mt-10">
          <div
            className="block"
            id="nfts"
            role="tabpanel"
            aria-labelledby="tab-nfts"
          >
            <div className="grid grid-cols-4 gap-4">
              <>
                {collection &&
                  collectionNFTs &&
                  collectionNFTs.map((element, index) => (
                    // <></>
                    <div key={index}>
                      <Card
                        metadata={element.metadata}
                        likes={""}
                        salePrice={""}
                        maxBidPrice={""}
                        injectedProvider={probs.injectedProvider}
                        collectionName={collection.name}
                        collectionImage={collection.image}
                        collectionAddress={collection.address}
                        isOnChain={false}
                      />
                    </div>
                  ))}
                {collectionOnChainNFTs &&
                  collectionOnChainNFTs.map((element, index) => (
                    // <></>
                    <div key={index}>
                      <Card
                        metadata={element.rawMetadata}
                        likes={""}
                        salePrice={""}
                        maxBidPrice={""}
                        injectedProvider={probs.injectedProvider}
                        collectionName={element.contract.name}
                        collectionImage={collection ? collection.image : ""}
                        collectionAddress={element.contract.address}
                        isOnChain={true}
                        tokenId={element.tokenId ? element.tokenId : ""}
                      />
                    </div>
                  ))}
              </>
            </div>
          </div>
          <div
            className="hidden"
            id="activities"
            role="tabpanel"
            aria-labelledby="tab-activities"
          >
            <span>Tab content - Activities</span>
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
