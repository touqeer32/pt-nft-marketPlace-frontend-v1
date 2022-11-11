import React from "react";
import Link from "next/link";

export default function Card(probs) {
  return (
    <Link
      href={{
        pathname: `/nft-detail/${probs.collectionName}/${probs.tokenId}`,
      }}
    >
      <>
        {probs.selectedImage && (
          <div
            key={probs.tokenId}
            className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100"
          >
            <>
              <figure className="relative">
                <img
                  src={probs.selectedImage}
                  alt="Crypto Goro #006"
                  className="w-full h-[280px] rounded-lg object-cover"
                />
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
                  {probs.collectionImage && (
                    <img
                      src={probs.collectionImage}
                      alt="Collection 1"
                      className="w-12 h-12 rounded-full border-2 border-solid border-gray-100 object-cover text-xs	"
                    />
                  )}
                  <figcaption className="ml-4">
                    <span className="block text-dark_mode text-xs font-semibold">
                      {probs.name} #{probs.tokenId}
                    </span>
                    {probs.description && (
                      <span className="block text-dark_mode text-xs font-semibold">
                        {probs.description.length > 30 && (
                          <> {probs.description.substring(0, 30)}...</>
                        )}

                        {probs.description.length < 30 && probs.description}
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
        )}
        {!probs.selectedImage && (
          <div className="nft__card_collection-empty py-4 px-4 border border-solid border-gray-100 rounded-xl">
            <div className="animate-pulse">
              <div className="w-full h-[280px] rounded-lg bg-gray-100"></div>

              <div className="flex flex-row items-center mt-4">
                {/* Collection image */}
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>

                <div className="flex flex-col ml-3">
                  <div className="py-2 bg-gray-100 min-w-[130px] text-xs"></div>
                  <div className="py-2 mt-1 bg-gray-100 min-w-[130px]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="min-w-[70px] py-2 bg-gray-100"></div>
                <div className="min-w-[70px] py-2 bg-gray-100"></div>
              </div>
            </div>
          </div>
        )}
      </>
    </Link>
  );
}
