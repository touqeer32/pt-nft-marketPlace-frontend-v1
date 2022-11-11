import React from "react";
import Link from "next/link";
import { get } from "./../../utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { getNftMetadata } from "./../../utils/alchmey/getUserNFT";
export default function Card(probs) {
  console.log("probs", probs);
  var [isDataSet, setIsDataSet] = useState(false);

  var [nftDetails, setNftDetails] = useState({});
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setIsDataSet(true);

      try {
        if (!probs.isOnChain) {
          const { data } = await axios.get(probs.metadata);
          setNftDetails(data);
        } else {
          console.log("tokenid", probs.tokenId);
          if (probs.metadata.metadata) {
            var nftMetaData = await getNftMetadata(
              probs.collectionAddress,
              probs.tokenId
            );
            if (
              nftMetaData.rawMetadata.metadata &&
              nftMetaData.rawMetadata.metadata.length == 0
            ) {
              const { data } = await axios.get(nftMetaData.tokenUri.raw);
              setNftDetails(data);
            } else {
              const element = nftMetaData.rawMetadata;
              setNftDetails(element);
            }
          } else {
            if (probs.tokenId != "" && probs.metadata != "") {
              probs.metadata["tokenId"] = probs.tokenId;
              setNftDetails(probs.metadata);
            } else {
              var nftMetaData = await getNftMetadata(
                probs.collectionAddress,
                probs.tokenId
              );
              console.log("nftMetaData", nftMetaData);
              setNftDetails(nftMetaData.rawMetadata);
            }
          }
        }
      } catch (err) {
        console.log("error to load metadata", err);
      }
    };
    if (!isDataSet && probs.probs != "") {
      fetchData();
    }
  });
  return (
    <>
      {nftDetails.image && (
        <Link
          href={{
            pathname: `/nft-detail/${probs.collectionAddress}/${nftDetails.tokenId}/`,
          }}
        >
          <div
            key={probs.tokenId}
            className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100"
          >
            <>
              <figure className="relative">
                {nftDetails.image && (
                  <img
                    src={nftDetails.image}
                    alt="Crypto Goro #006"
                    className="w-full h-[280px] rounded-lg object-cover"
                  />
                )}
                {probs.likes && (
                  <figcaption className="flex py-1 px-3 items-center rounded-full bg-light_mode absolute top-3 right-3">
                    <i className="fa-solid fa-heart text-error"></i>
                    <span className="block ml-1 text-dark_mode text-xs font-medium">
                      13K
                    </span>
                  </figcaption>
                )}
              </figure>
              <div className="mt-4">
                <figure className="flex flex-row items-center">
                  {nftDetails.collectionImage && (
                    <img
                      src={probs.collectionImage}
                      alt="Collection 1"
                      className="w-12 h-12 rounded-full border-2 border-solid border-gray-100 object-cover text-xs	"
                    />
                  )}
                  <figcaption className="ml-4">
                    {nftDetails.name && (
                      <span className="block text-dark_mode text-xs font-semibold">
                        {nftDetails.name} #{nftDetails.tokenId}
                      </span>
                    )}
                    {nftDetails.description && (
                      <span className="block text-dark_mode text-xs font-semibold">
                        {nftDetails.description.length > 30 && (
                          <> {nftDetails.description.substring(0, 30)}...</>
                        )}

                        {nftDetails.description.length < 30 &&
                          nftDetails.description}
                      </span>
                    )}
                    <span className="block text-sm text-gray-300">
                      {" "}
                      {probs.collectionName != "select collection" &&
                        probs.collectionName}
                    </span>
                  </figcaption>
                </figure>
              </div>
              {probs.salePrice ||
                (probs.maxBidPrice && (
                  <div className="flex items-center justify-between mt-6">
                    <span className="block text-dark_mode text-sm font-semibold">
                      {probs.salePrice}
                    </span>
                    <span className="block text-xs text-gray-300 font-medium">
                      {probs.salePrice && <>Highest Bid</>}
                      <br />
                      {probs.maxBidPrice}
                    </span>
                  </div>
                ))}
            </>
          </div>
        </Link>
      )}
      {!nftDetails.image && (
        <div className="nft__card_collection-empty py-4 px-4 border border-solid border-gray-100 rounded-xl">
          <div className="animate-pulse">
            <div className="w-full h-[280px] rounded-lg bg-gray-100"></div>

            <div className="flex flex-row items-center mt-4">
              {/* Collection image */}

              <div className="flex flex-col ml-3">
                <div className="py-2 bg-gray-100 min-w-[130px] text-xs"></div>
                <div className="py-2 mt-1 bg-gray-100 min-w-[130px]"></div>
                <div className="py-2 mt-1 bg-gray-100 min-w-[130px]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
