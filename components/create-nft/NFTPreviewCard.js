import React from "react";

export default function NFTPreviewCard({
  item,
  collectionImage,
  collectionName,
  maxBidPrice,
  salePrice,
  tokenId,
}) {
  return (
    <div className="top-36" style={{ marginTop: "20px", marginBottom: "80vh" }}>
      <div>
        <span className="block mb-2 text-dark_mode text-sm font-semibold">
          Preview
        </span>
        {item?.preview ? (
          <div className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100">
            <>
              <figure className="relative">
                <img
                  src={item.preview}
                  alt="Crypto Goro #006"
                  className="w-full h-[280px] rounded-lg object-cover"
                />
                {item.likes && (
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
                  {collectionImage && (
                    <img
                      src={collectionImage}
                      alt="Collection 1"
                      className="w-12 h-12 rounded-full border-2 border-solid border-gray-100 object-cover text-xs	"
                    />
                  )}
                  <figcaption className="ml-4">
                    <span className="block text-dark_mode text-xs font-semibold">
                      {item.name} #{item.tokenId}
                    </span>
                    {item.description && (
                      <span className="block text-dark_mode text-xs font-semibold">
                        {item.description.length > 30 && (
                          <> {item.description.substring(0, 30)}...</>
                        )}

                        {item.description.length < 30 && item.description}
                      </span>
                    )}
                    <span className="block text-sm text-gray-300">
                      {" "}
                      {collectionName != "select collection" && collectionName}
                    </span>
                  </figcaption>
                </figure>
              </div>
              {salePrice ||
                (maxBidPrice && (
                  <div className="flex items-center justify-between mt-6">
                    <span className="block text-dark_mode text-sm font-semibold">
                      {salePrice}
                    </span>
                    <span className="block text-xs text-gray-300 font-medium">
                      {salePrice && <>Highest Bid</>}
                      <br />
                      {maxBidPrice}
                    </span>
                  </div>
                ))}
            </>
          </div>
        ) : (
          <div className="nft__card_collection-empty py-4 px-4 border border-solid border-gray-100 rounded-xl">
            <div className="animate-pulse">
              <div className="w-full h-[280px] rounded-lg bg-gray-100"></div>
              <div className="flex flex-row items-center mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                <div className="flex flex-col ml-3">
                  <div className="py-2 bg-gray-100 min-w-[130px]"></div>
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
      </div>
    </div>
  );
}
