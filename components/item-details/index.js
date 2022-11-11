import React, { useState, useEffect } from "react";
import Collections from "../collections";
import BidDetails from "./bid-details";
import BidButtion from "./bid";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { post } from "../../utils";
import ReviewInfoUnListedNft from "./unlistedItem/popup-modal-review-info-unlisted-nft";
import {
  faUpRightAndDownLeftFromCenter,
  faHeart,
  faCircleInfo,
  faEye,
  faShareNodes,
  faCertificate,
  faCheck,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ItemDetail(probs) {
  console.log("ItemDetail ==>", probs);
  const router = useRouter();

  const [loadSubGraphData, setLoadSubGraphData] = useState(true);

  const [openModle, setOpenModle] = useState(false);
  function onUnListItemClick() {
    setOpenModle(true);
    return openModle;
  }
  function onUnListItemClose() {
    setOpenModle(false);
    return openModle;
  }

  async function cancelListing() {
    if (!probs.isOnChain) {
      var response = await post("unlisting-nft", {
        collectionId: probs.collectionAddress,
        wallet: probs.wallet,
        tokenId: probs.tokenId,
        signature: "",
        price: "",
        isFixedPrice: false,
        currency: "",
      });
      if (response.status != 200) {
        toast.error("Issue in cancel Please Try Again");
      } else {
        toast.success("Your NFT is Not Listed Any more");
      }
      router.reload();
    } else {
      onUnListItemClick();
    }
  }

  return (
    <>
      {/* {# nft__hero-cover-nft-details #} */}
      <section className="nft__hero-cover-nft-details h-[calc(100vh-9rem)] relative mt-36 px-36 xl:max-w-full lg:container">
        <div className="flex flex-row items-center gap-4">
          <div className="basis-5/12">
            <figure className="relative">
              <img
                src={probs.nftImage}
                alt="Cover collection"
                className="w-full h-[60vh] rounded-xl border-4 border-solid border-gray-100 object-cover"
              />
              <figcaption>
                <button
                  type="button"
                  className="py-1 px-5 flex items-center justify-center absolute top-4 left-4 rounded-full bg-light_mode text-dark_mode text-sm font-medium"
                >
                  <FontAwesomeIcon
                    icon={faUpRightAndDownLeftFromCenter}
                    className="fa-solid fa-up-right-and-down-left-from-center text-lg"
                  />{" "}
                  {/* <i className="fa-solid fa-up-right-and-down-left-from-center text-lg"></i> */}
                </button>
                <button
                  type="button"
                  className="py-1 px-3 flex items-center justify-center absolute top-4 right-4 rounded-full bg-light_mode text-dark_mode text-sm font-medium"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="fa-regular fa-heart mr-2 text-error text-lg"
                  />
                  {"   "}
                  &nbsp; Like
                </button>
              </figcaption>
            </figure>
          </div>
          <div className="basis-5/12 ml-28">
            <hgroup>
              <h4 className="text-dark_mode font-bold">
                {probs.nftName}&nbsp; #{probs.tokenId}
                <span className="relative align-super ml-2">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="fa-solid fa-circle-info text-nft_institutional text-xl"
                  />
                  {/* <i className="fa-solid fa-circle-info text-nft_institutional text-xl"></i> */}
                </span>
              </h4>
              <h6 className="mt-2 text-gray-300 text-base">
                Owned by
                <span> &nbsp; {probs.wallet}</span>
              </h6>
            </hgroup>
            <div className="flex flex-row items-center mt-8">
              <span className="flex items-center text-dark_mode text-sm font-medium">
                {/* <i className="fa-solid fa-heart text-error text-xl mr-2"></i> */}
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-solid fa-heart text-error text-xl mr-2"
                />
                &nbsp; {probs.likes} Likes
              </span>
              <span className="flex items-center ml-6 text-dark_mode text-sm font-medium">
                {/* <i className="fa-solid fa-eye text-pt_institutional text-xl mr-2"></i> */}
                <FontAwesomeIcon
                  icon={faEye}
                  className="fa-solid fa-eye text-pt_institutional text-xl mr-2"
                />
                &nbsp; {probs.view} Views
              </span>
              <button className="flex py-1 px-4 ml-6 items-center rounded-full text-dark_mode bg-gray-100 hover:bg-nft_institutional">
                {/* <i className="fa-solid fa-share-nodes mr-2 text-lg"></i> */}
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className="fa-solid fa-share-nodes mr-2 text-lg"
                />
                <span className="block ml-1 text-sm font-medium">
                  {" "}
                  &nbsp;Share
                </span>
              </button>
            </div>
            <div className="mt-10">
              <p className="text-dark_mode leading-loose">{probs.nftDetails}</p>
            </div>
            <div className="flex flex-row items-center mt-10">
              <div>
                <h6 className="text-gray-300 text-base">Created by</h6>
                <figure className="flex flex-row items-center mt-4 relative">
                  {probs.isColour && (
                    <div
                      className="w-14 h-14 rounded-full border-2 border-solid border-gray-100 object-cover"
                      style={{ background: probs.profilePicColor }}
                      alt="Avatar profile collection"
                    ></div>
                  )}
                  {!probs.isColour && (
                    <img
                      src={probs.profilePicColor}
                      alt="Avatar 6"
                      className="w-14 h-14 rounded-full border-2 border-solid border-gray-100 object-cover"
                    />
                  )}
                  <figcaption className="ml-4">
                    &nbsp;
                    <span className="absolute top-[2px] left-[32px] align-middle ml-2">
                      {/* <i className="fa-solid fa-certificate text-nft_institutional text-xl"></i> */}
                      <FontAwesomeIcon
                        icon={faCertificate}
                        className="fa-solid fa-certificate text-nft_institutional text-xl"
                      />
                      {/* <i className="fa-solid fa-check text-light_mode text-sm absolute top-[1px] left-[3px]"></i> */}
                      {/* <FontAwesomeIcon
                          icon={faCheck}
                          className="fa-solid fa-check text-light_mode text-sm absolute top-[1px] left-[3px]"
                        /> */}
                    </span>
                    <span className="block text-dark_mode text-sm font-semibold">
                      Yung DooMari
                    </span>
                    <span className="block text-sm text-gray-300">
                      yung_doomari
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="ml-10">
                <h6 className="text-gray-300 text-base">Collection</h6>
                <figure className="flex flex-row items-center mt-4">
                  <img
                    src={probs.collectionImage}
                    alt="Avatar 9"
                    className="w-14 h-14 rounded-xl border-2 border-solid border-gray-100 object-cover"
                  />
                  <figcaption className="ml-4">
                    <span className="block text-dark_mode text-sm font-semibold">
                      {probs.collectionName}
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
        {!probs.isOwner && probs.isListed && (
          <aside className="flex justify-center w-full absolute left-0 bottom-6">
            <BidButtion
              collectionAddress={probs.collectionAddress}
              injectedProvider={probs.injectedProvider}
              tokenId={probs.tokenId}
              currency={probs.currency}
              price={probs.price}
              uri={probs.uri}
              isFixedPrice={probs.isFixedPrice}
              nftName={probs.nftName}
              wallet={probs.wallet}
              signature={probs.signature}
              isListed={probs.isListed}
              isOnChain={probs.isOnChain}
              loadSubGraphData={loadSubGraphData}
              setLoadSubGraphData={setLoadSubGraphData}
            />
          </aside>
        )}
        {probs.isOwner && probs && (
          <aside className="flex justify-center w-full absolute left-0 bottom-6">
            <div className="py-5 px-12 rounded-full bg-gray-100">
              <div className="flex flex-row items-center justify-center">
                <a
                  href="#"
                  type="button"
                  className="py-4 px-6 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                >
                  Edit NFT
                </a>
                {!probs.isListed && (
                  <Link
                    href={{
                      pathname: `/sell-nft/${probs.collectionAddress}/${probs.tokenId}`,
                      // query: {
                      //   collectionAddress: probs.collectionAddress,
                      //   tokenId: probs.tokenId,
                      // },
                    }}
                  >
                    <button
                      type="button"
                      className="py-4 px-6 ml-8 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                    >
                      Sell NFT
                    </button>
                  </Link>
                )}
                {probs.isListed && (
                  <button
                    type="button"
                    onClick={cancelListing}
                    className="py-4 px-6 ml-8 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                  >
                    Cancel Listing
                  </button>
                )}
                <>
                  <ReviewInfoUnListedNft
                    openModle={openModle}
                    onClose={onUnListItemClose}
                    injectedProvider={probs.injectedProvider}
                    tokenId={probs.tokenId}
                    currency={probs.currency}
                    collectionAddress={probs.collectionAddress}
                    price={probs.price}
                    nftName={probs.nftName}
                    wallet={probs.wallet}
                    isListed={probs.isListed}
                  />
                </>
              </div>
            </div>
          </aside>
          // </Link>
        )}
      </section>

      <BidDetails
        collectionAddress={probs.collectionAddress}
        tokenId={probs.tokenId}
        injectedProvider={probs.injectedProvider}
        currency={probs.currency}
        price={probs.price}
        uri={probs.uri}
        isFixedPrice={probs.isFixedPrice}
        nftName={probs.nftName}
        wallet={probs.wallet}
        isOwner={probs.isOwner}
        signature={probs.signature}
        isListed={probs.isListed}
        loadSubGraphData={loadSubGraphData}
        setLoadSubGraphData={setLoadSubGraphData}
        userAddress={probs.userAddress.toLowerCase()}
      />
      <Collections
        collectionAddress={probs.collectionAddress}
        wallet={probs.wallet}
        limit={10}
        collectionName={probs.collectionName}
        collectionImage={probs.collectionImage}
      />
    </>
  );
}
