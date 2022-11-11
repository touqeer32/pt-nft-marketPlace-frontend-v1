import React, { useState, useEffect } from "react";
import Card from "../card-details-nft";

import axios from "axios";
import { get } from "./../../utils";

export default function Collections(probs) {
  var [collectionImage, setCollectionImage] = useState([]);

  useEffect(() => {
    let imgNFTs = [];
    // declare the data fetching function
    const fetchData = async () => {
      var userCollectionNFTApi = await get("get-collection-nft-with-limit", {
        collectionId: probs.collectionAddress,
        wallet: probs.wallet,
        limit: probs.limit,
      });
      if (userCollectionNFTApi.data.status == 200) {
        try {
          setCollectionImage(userCollectionNFTApi.data.row);
        } catch (err) {
          console.log("error to load metadata", err);
        }
      }
    };
    if (collectionImage.length === 0 && probs.wallet != "") {
      fetchData();
    }
  }, [probs]);
  return (
    // {# nft__related-collections #}
    <section className="nft__related-collections mt-24 px-36 xl:max-w-full lg:container">
      <div className="flex items-center justify-between">
        <h5 className="text-dark_mode  font-medium">
          More from this collection
        </h5>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10">
        {/* {% for nft in nfts %} */}
        {/* <div className="basis-3/12 "> */}
        {collectionImage &&
          collectionImage.map((element, index) => (
            // <></>
            <div key={index}>
              <Card
                metadata={element.metadata}
                likes={""}
                salePrice={""}
                maxBidPrice={""}
                collectionName={probs.name}
                collectionImage={probs.image}
                collectionAddress={probs.address}
              />
            </div>
          ))}
        {/* </div> */}
        {/* {% endfor %} */}
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
  );
}
