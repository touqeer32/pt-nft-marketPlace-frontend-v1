import ReviewInfoBuyNft from "./popup-modal-review-info-buy-bid";
import React, { useState, useEffect } from "react";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApolloClient } from "@apollo/client";
import { GET_MIN_OFFER, GET_MAX_OFFER } from "./../../../config/graphQLQueries";
import { ethers } from "ethers";

export default function BidButtion(probs) {
  console.log("BidButtion", probs);
  const [openModle, setOpenModle] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const client = useApolloClient();

  async function getBid() {
    const minOffer = await client.query({
      query: GET_MIN_OFFER,
      variables: {
        tokenId: probs.tokenId,
        collection: probs.collectionAddress.toLowerCase(),
      },
    });
    const maxOffer = await client.query({
      query: GET_MAX_OFFER,
      variables: {
        tokenId: probs.tokenId,
        collection: probs.collectionAddress.toLowerCase(),
      },
    });
    let isMaxData = false;
    if (maxOffer.data.offerCreatedEntities.length > 0) {
      console.log(
        "maxOffer.data.offerCreatedEntities[0].offerPrice",
        maxOffer.data.offerCreatedEntities[0].offerPrice
      );
      let price = ethers.utils.formatEther(
        maxOffer.data.offerCreatedEntities[0].offerPrice
      );
      isMaxData = true;
      setMaxPrice(price);
    }
    if (minOffer.data.offerCreatedEntities.length > 0) {
      let price = ethers.utils.formatEther(
        minOffer.data.offerCreatedEntities[0].offerPrice
      );
      if (!isMaxData) {
        setMaxPrice(price);
      }
      setMinPrice(price);
    }

    console.log(probs.id, "minOffer", minOffer);
    console.log(probs.id, "minOffer", maxOffer);
  }
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await getBid();
    };
    // console.log("categories.length", categories.length);
    fetchData();
  });
  function onBidReviewClick() {
    setOpenModle(true);
    return openModle;
  }
  function onBidReviewClose() {
    setOpenModle(false);
    return openModle;
  }
  return (
    <>
      <div className="py-5 px-12 rounded-full bg-nft_institutional/20">
        <div className="flex flex-row items-center justif-center">
          {!probs.isFixedPrice && (
            <>
              <hgroup className="first:ml-0">
                <h5 className="text-dark_mode text-xl font-semibold">
                  {minPrice} PTH
                </h5>
                <h6 className="text-dark_mode text-sm">Minimun Bid</h6>
              </hgroup>
              <hgroup className="ml-8">
                <h5 className="text-dark_mode text-xl font-semibold">
                  {maxPrice} PTH
                </h5>
                <h6 className="text-dark_mode text-sm">Highest Bid</h6>
              </hgroup>
            </>
          )}
          {probs.isFixedPrice && (
            <hgroup className="ml-8">
              <h5 className="text-dark_mode text-xl font-semibold">
                {probs.price} PTH
              </h5>
              <h6 className="text-dark_mode text-sm">Sale Price </h6>
            </hgroup>
          )}
          {probs.isListed && (
            <button
              type="button"
              onClick={onBidReviewClick}
              className="py-2 px-4 ml-8 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium"
            >
              <FontAwesomeIcon
                icon={faTag}
                className="fa-solid fa-tag mr-2 text-lg"
              />
              &nbsp; {probs.isFixedPrice ? "Buy NFT" : "Place Bid"}
            </button>
          )}
        </div>
        <ReviewInfoBuyNft
          openModle={openModle}
          onClose={onBidReviewClose}
          injectedProvider={probs.injectedProvider}
          tokenId={probs.tokenId}
          currency={probs.currency}
          collectionAddress={probs.collectionAddress}
          price={probs.price}
          uri={probs.uri}
          isFixedPrice={probs.isFixedPrice}
          nftName={probs.nftName}
          wallet={probs.wallet}
          signature={probs.signature}
          isOnChain={probs.isOnChain}
          setLoadSubGraphData={probs.setLoadSubGraphData}
        />
      </div>
    </>
  );
}
