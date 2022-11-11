import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { get } from "./../../utils/";
import {
  getNftsForOwner,
  getNftMetadataForExplorer,
} from "./../../utils/alchmey/getUserNFT";

export default function CollectionCard(probs) {
  var [isDataSet, setIsDataSet] = useState(false);
  var [isOnChainNFT, setIsOnChainNFT] = useState(false);
  var [isEmpty, setIsEmpty] = useState(false);
  var [isLoaded, setIsLoaded] = useState(false);

  var [countLazzNFT, setCountLazzNFT] = useState(0);
  var [collectionImage, setCollectionImage] = useState({
    image1: "",
  });

  async function setCardImage(ownNFTs) {
    console.log("setCardImage", ownNFTs);
    setIsOnChainNFT(true);
    if (
      Object.keys(ownNFTs).length != 0 &&
      Object.keys(ownNFTs).includes(probs.id.toLowerCase())
    ) {
      try {
        setIsEmpty(ownNFTs[probs.id.toLowerCase()].length > 0);

        var nftImage = collectionImage;
        console.log("before", nftImage);
        console.log(
          "ownNFTs[probs.id.toLowerCase()].length",
          ownNFTs[probs.id.toLowerCase()].length
        );
        // for (let index = 0; index < ownNFTs[probs.id].length; index++)
        if (ownNFTs[probs.id.toLowerCase()].length == 1) {
          if (
            ownNFTs[probs.id.toLowerCase()][0].rawMetadata.metadata &&
            ownNFTs[probs.id.toLowerCase()][0].rawMetadata.metadata.length == 0
          ) {
            const { data } = await axios.get(
              ownNFTs[probs.id.toLowerCase()][0].tokenUri.raw
            );
            console.log("data===>", data);
            if (nftImage[`image${1}`] == "") {
              nftImage[`image${1}`] = data.image;
              // }
            }
          } else {
            const element =
              ownNFTs[probs.id.toLowerCase()][0].rawMetadata.image;
            // for (let i = 0; i < 3; i++) {
            if (nftImage[`image${1}`] == "") {
              nftImage[`image${1}`] = element;
              // }
            }
          }
        }
        console.log("after", nftImage);

        setCollectionImage(nftImage);

        if (collectionImage.length != 0) {
          var tempCount = probs.collectionOwen;
          tempCount++;
          probs.setCollectionOwen(tempCount++);
        }
      } catch (err) {
        console.log("error to load metadata", err);
      }
    }
  }
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var userCollectionNFTApi = await get(
        probs.callpage == "account"
          ? "get-collection-nft-with-limit"
          : "get-listed-nft-with-limit",
        {
          collectionId: probs.id,
          wallet: probs.userAddress,
          limit: 1,
        }
      );
      console.log("CollectionName", probs.CollectionName, userCollectionNFTApi);
      if (userCollectionNFTApi.data.status == 200) {
        try {
          var nftImage = {
            image1: "",
          };
          setIsEmpty(userCollectionNFTApi.data.row.length > 0);
          setIsDataSet(true);
          setCountLazzNFT(userCollectionNFTApi.data.row.length);
          // for (let i = 0; i < userCollectionNFTApi.data.row.length; i++)
          if (userCollectionNFTApi.data.row.length == 1) {
            const { data } = await axios.get(
              userCollectionNFTApi.data.row[0].metadata
            );
            nftImage[`image${1}`] = data.image;
          }
          setCollectionImage(nftImage);

          if (collectionImage.length != 0) {
            var tempCount = probs.collectionOwen;
            tempCount++;
            probs.setCollectionOwen(tempCount++);
          }
        } catch (err) {
          console.log("error to load metadata", err);
        }
      }
    };
    if (!isDataSet && probs.userAddress != "") {
      fetchData();
    }
  });

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setIsLoaded(true);

      var ownNFTs = await getNftMetadataForExplorer(probs.id, probs.tokenId);
      console.log("account===>", ownNFTs);

      setCardImage(ownNFTs);
    };
    if (
      collectionImage["image1"] == "" &&
      countLazzNFT == 0 &&
      !isOnChainNFT &&
      probs.tokenId &&
      !isLoaded &&
      probs.callpage == "account"
    ) {
      fetchData();
    }
  });

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var ownNFTs = await getNftMetadataForExplorer(probs.id, probs.tokenId);
      console.log("getNftsForOwner", ownNFTs);
      setCardImage(ownNFTs);
    };

    if (
      collectionImage["image1"] == "" &&
      countLazzNFT == 0 &&
      !isOnChainNFT &&
      probs.tokenId &&
      probs.callpage != "account"
    ) {
      fetchData();
    }
  });
  return (
    <>
      {collectionImage.image1 && isEmpty && (
        <Link
          href={{
            pathname: `/collections/${probs.CollectionName}/${probs.id}`,
          }}
        >
          <div key={probs.index}>
            {collectionImage.image1 && (
              <div
                name={probs.index}
                key={probs.index}
                className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100"
              >
                <>
                  <div
                    name={probs.index}
                    className="grid grid-rows-4 grid-flow-col gap-x-4"
                  >
                    {collectionImage.image1 && (
                      <figure className="row-span-4 col-span-2">
                        <img
                          src={collectionImage.image1}
                          alt="Doodle 1"
                          className="w-full h-[280px] rounded-lg object-cover"
                        />
                      </figure>
                    )}
                    {collectionImage.image2 && (
                      <figure className="row-span-2 self-start">
                        <img
                          src={collectionImage.image2}
                          alt="Doodle 2"
                          className="w-full h-[133px] rounded-lg object-cover"
                        />
                      </figure>
                    )}
                    {collectionImage.image3 && (
                      <figure className="row-span-2 self-end">
                        <img
                          src={collectionImage.image3}
                          alt="Doodle 3"
                          className="w-full h-[133px] rounded-lg object-cover"
                        />
                      </figure>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="block text-dark_mode font-semibold">
                      {probs.CollectionName}
                    </span>
                    {probs.floorPrice && (
                      <span className="block text-sm text-gray-300">
                        Floor price: {probs.floorPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="block text-dark_mode text-sm font-semibold">
                      {probs.averagePrice}
                    </span>
                    <span className="block text-xs text-error font-medium">
                      {probs.percentage}
                    </span>
                  </div>
                </>
              </div>
            )}
          </div>
        </Link>
      )}
      {!collectionImage.image1 && isEmpty && (
        <div className="nft__card_collection-empty py-6 px-4 border border-solid border-gray-100 rounded-xl">
          <div className="animate-pulse">
            <div className="w-full h-[280px] rounded-lg bg-gray-100"></div>

            <div className="flex flex-row items-center mt-4">
              {/* Collection image */}

              <div className="flex flex-col ml-3">
                <div className="py-2 bg-gray-100 min-w-[130px] text-xs"></div>
                <div className="py-2 mt-1 bg-gray-100 min-w-[130px]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
