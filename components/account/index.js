import React, { useState, useEffect } from "react";
import CollectionCard from "../card-collection-nft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setCookie } from "cookies-next";
import { getNftsForOwner } from "./../../utils/alchmey/getUserNFT";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { get } from "../../utils";
export default function Account(probs) {
  const [collectionNames, setCollectionsName] = useState([]);
  var [collectionOwen, setCollectionOwen] = useState(0);
  var [isGetOwnNFT, setIsGetOwnNFT] = useState(false);
  var [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var collectionApi = await get("get-all-collection", {});
      if (collectionApi.data.status == 200) {
        setCookie("router", "account");
        setCollectionsName(collectionApi.data.row);
      } else {
        setCollectionsName([]);
      }
    };
    if (collectionNames.length == 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log("probs.userAddress", probs.userAddress);

    // declare the data fetching function
    const fetchData = async () => {
      setIsGetOwnNFT(true);
      console.log("probs.userAddress", probs.userAddress);
      var ownNFTs = await getNftsForOwner(probs.userAddress, 100);
      if (Object.keys(ownNFTs).length != 0) {
        for (let index = 0; index < collectionNames.length; index++) {
          if (
            Object.keys(ownNFTs).includes(
              collectionNames[index].address.toLowerCase()
            )
          ) {
            var userCollectionNFTApi = await get(
              "get-collection-nft-with-limit",
              {
                collectionId: collectionNames[index].address.toLowerCase(),
                wallet: probs.userAddress,
                limit: 1,
              }
            );
            console.log(
              "userCollectionNFTApi",
              userCollectionNFTApi,
              collectionNames[index].address.toLowerCase()
            );
            if (
              userCollectionNFTApi.data.status == 200 &&
              userCollectionNFTApi.data.row.length == 0
            ) {
              let arr = collectionNames;
              arr = arr.splice(index, 1);
              setCollectionsName(arr);
            } else {
              delete ownNFTs[collectionNames[index].address.toLowerCase()];
            }
          }
        }
        console.log("ownNFTs", ownNFTs);

        var keys = Object.keys(ownNFTs);
        console.log("keys====", keys);
        // console.log("ownNFTs", ownNFTs[keys[0]][0]);

        for (let index = 0; index < keys.length; index++) {
          let temp = {
            name: ownNFTs[keys[index]][0].contract.name,
            address: ownNFTs[keys[index]][0].contract.address,
            tokenId: ownNFTs[keys[index]][0].tokenId,
          };
          let arr = collectionNames;
          arr.push(temp);
          console.log("arrarrarr", arr);
          setCollectionsName(arr);
        }
        setIsLoaded(true);
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
      {/* {# nft__hero-cover-creator-details #} */}
      <section className="nft__hero-cover-creator-details mt-24 px-20 xl:max-w-full lg:container">
        <figure className="relative">
          {probs.isColour && (
            <div
              className="w-full h-[40vh] rounded-xl border-4 border-solid border-gray-100 object-cover"
              style={{ background: probs.profilePicColor }}
            ></div>
          )}
          {!probs.isColour && (
            <img
              src="/creators/cover-creator.jpg"
              alt="Cover creator"
              className="w-full h-[40vh] rounded-xl border-4 border-solid border-gray-100 object-cover"
            />
          )}
          <figcaption className="absolute bottom-4 right-4">
            <button
              type="button"
              className="py-2 px-4 flex items-center justify-center rounded-full bg-nft_institutional hover:bg-nft_institutional_dark text-dark_mode text-sm font-medium"
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                className="fa-solid fa-share-nodes mr-3 text-lg"
              />
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
                    className="w-36 h-36 rounded-full object-cover border-4 border-solid border-gray-100"
                    style={{ background: probs.profilePicColor }}
                  ></div>
                )}
                {!probs.isColour && (
                  <img
                    src="/ /avatar-profile-creator.jpg"
                    alt="Avatar profile creator"
                    className="w-36 h-36 rounded-full object-cover border-4 border-solid border-gray-100"
                  />
                )}

                <figcaption className="mt-6">
                  <h5 className="text-dark_mode font-semibold">
                    Monkey Leahpar
                    <span className="relative align-middle ml-2">
                      <i className="fa-solid fa-certificate text-nft_institutional text-2xl"></i>
                      <i className="fa-solid fa-check text-light_mode text-lg absolute top-[1px] left-[3px]"></i>
                    </span>
                  </h5>
                  <h6 className="text-base text-gray-300">@monkeyleahpar</h6>
                </figcaption>
              </figure>
              <div className="mt-10">
                <p className="text-dark_mode leading-loose">
                  Artist based in Germany.
                  <br />
                  My work revolves around human emotion and our mind states.
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour.
                </p>
              </div>
            </div>
            <div className="basis-4/12">
              <div className="flex flex-row items-start justify-end mt-16">
                <hgroup className="first:ml-0">
                  <h5 className="text-dark_mode text-xl font-semibold">
                    90.19 ETH
                  </h5>
                  <h6 className="text-gray-300 text-sm">Total balance</h6>
                </hgroup>
                <hgroup className="ml-10">
                  <h5 className="text-dark_mode text-xl font-semibold">115</h5>
                  <h6 className="text-gray-300 text-sm">Following</h6>
                </hgroup>
                <hgroup className="ml-10">
                  <h5 className="text-dark_mode text-xl font-semibold">88</h5>
                  <h6 className="text-gray-300 text-sm">Followers</h6>
                </hgroup>
              </div>
              <div className="flex flex-row items-start justify-end mt-16">
                <hgroup className="first:ml-4">
                  <h6 className="text-gray-300 text-sm">Joined on</h6>
                  <h6 className="mt-1 text-dark_mode text-base font-semibold">
                    July 2022
                  </h6>
                </hgroup>
                <div className="ml-14">
                  <h6 className="text-gray-300 text-sm">Followed by</h6>
                  <div className="flex -space-x-4 mt-2">
                    {/* {% for alt, src in site.data.avatars %} */}
                    <img
                      src="/avatars/avatar-1.jpg"
                      alt="avatar-1.jpg"
                      className="w-10 h-10 rounded-full border-2 border-solid border-gray-100 shadow-lg object-cover"
                    />
                    {/* {% endfor %} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {# nft__main-creator-details #} */}
      <section className="nft__main-creator-details px-36 mt-16 xl:max-w-full lg:container">
        <div className="flex flex-row items-center">
          <div className="basis-8/12">
            <div className="border-b border-gray-200">
              <ul
                className="flex flex-wrap text-lg font-semibold text-center"
                data-tabs-toggle="#tab-main-creator-details"
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
                    Collections
                    <span className="ml-2">{collectionOwen}</span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-3 pb-2 !text-gray-300 pointer-events-none"
                    id="tab-on-bid"
                    data-tabs-target="#on-bid"
                    type="button"
                    role="tab"
                    aria-controls="on-bid"
                    aria-selected="false"
                  >
                    On Bid
                    <span className="ml-2">8</span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-3 pb-2 !text-gray-300 pointer-events-none"
                    id="tab-owned"
                    data-tabs-target="#owned"
                    type="button"
                    role="tab"
                    aria-controls="owned"
                    aria-selected="false"
                  >
                    Owned
                    <span className="ml-2">890</span>
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="inline-block p-3 pb-2 !text-gray-300 pointer-events-none"
                    id="tab-liked"
                    data-tabs-target="#liked"
                    type="button"
                    role="tab"
                    aria-controls="liked"
                    aria-selected="false"
                  >
                    Liked
                    <span className="ml-2">415,673</span>
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
          <div className="basis-4/12">
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
        <div id="tab-main-creator-details" className="mt-10">
          <div
            className="block"
            id="nfts"
            role="tabpanel"
            aria-labelledby="tab-nfts"
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
                      callpage="account"
                      tokenId={element.tokenId}
                    />
                  </>
                ))}
            </div>
          </div>
          <div
            className="hidden"
            id="on-bid"
            role="tabpanel"
            aria-labelledby="tab-on-bid"
          >
            <span>Tab content - On Bid</span>
          </div>
          <div
            className="hidden"
            id="owned"
            role="tabpanel"
            aria-labelledby="tab-owned"
          >
            <span>Tab content - Owned</span>
          </div>
          <div
            className="hidden"
            id="liked"
            role="tabpanel"
            aria-labelledby="tab-liked"
          >
            <span>Tab content - Liked</span>
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
