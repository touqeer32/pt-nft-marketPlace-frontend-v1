import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import OfferDetails from "./popup-modal-offer-Details";
import { useApolloClient } from "@apollo/client";
import { GET_ACTIVE_ITEMS } from "../../config/graphQLQueries";

export default function BidDetails(probs) {
  const [openOfferModle, setOpenOfferModle] = useState(false);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const client = useApolloClient();

  function onOfferOpen() {
    setOpenOfferModle(true);
    return openOfferModle;
  }
  function onOfferClose() {
    setOpenOfferModle(false);
    return openOfferModle;
  }
  // const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS, {
  //   variables: { tokenId: probs.tokenId },
  // });

  async function runQuery() {
    const useQueryData = await client.query({
      query: GET_ACTIVE_ITEMS,
      variables: {
        tokenId: probs.tokenId,
        collection: probs.collectionAddress,
        limit: 5,
      },
    });
    probs.setLoadSubGraphData(false);
    setLoading(true);
    setData(useQueryData.data);
    console.log(data, "BidDetails", useQueryData);
    return useQueryData;
  }
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await runQuery();
    };
    // console.log("categories.length", categories.length);
    if (probs.loadSubGraphData) {
      fetchData();
    }
  }, [probs.loadSubGraphData]);
  return (
    <>
      <section className="nft__info-details mt-24 px-36 xl:max-w-full lg:container">
        <div className="flex flex-row gap-4">
          <div className="basis-5/12">
            <h5 className="text-dark_mode font-medium">Details</h5>
            <hgroup className="mt-6">
              <h6 className="text-gray-300 text-base">Type</h6>
              <h6 className="mt-1 text-dark_mode text-base">
                Image 5000 x 5000 px, JPEG (6.7 MB)
              </h6>
            </hgroup>
            <hgroup className="mt-6">
              <h6 className="text-gray-300 text-base">Contract Address</h6>
              <h6 className="mt-1 text-dark_mode text-base">
                {probs.collectionAddress}
              </h6>
            </hgroup>
            <hgroup className="mt-6">
              <h6 className="text-gray-300 text-base">Token ID</h6>
              <h6 className="mt-1 text-dark_mode text-base">
                #{probs.tokenId}
              </h6>
            </hgroup>
            <hgroup className="mt-6">
              <h6 className="text-gray-300 text-base">Token Standard</h6>
              <h6 className="mt-1 text-dark_mode text-base">ERC-721</h6>
            </hgroup>
            <hgroup className="mt-6">
              <h6 className="text-gray-300 text-base">Blockchain</h6>
              <h6 className="mt-1 text-dark_mode text-base">Ethereum</h6>
            </hgroup>
            <hgroup className="mt-6">
              <h6 className="text-gray-300 text-base">Creator Fees</h6>
              <h6 className="mt-1 text-dark_mode text-base">5%</h6>
            </hgroup>
          </div>
          <div className="basis-6/12 ml-32">
            <h5 className="text-dark_mode font-medium">Recent Bids</h5>
            <div className="nft__custom-table mt-6">
              <ul className="nft__custom-table-heading grid grid-cols-6 gap-5 px-3">
                <li>
                  <span className="text-gray-300">Type</span>
                </li>
                <li>
                  <span className="text-gray-300">Floor Diff.</span>
                </li>
                <li className="col-span-2">
                  <span className="text-gray-300">Timestamp</span>
                </li>
                <li className="col-span-2">
                  <span className="text-gray-300">View Details</span>
                </li>
              </ul>
              {/* {% for recentBid in recentBids %} */}
              {!loading && <div>Loading...</div>}
              {loading &&
                data &&
                data.offerCreatedEntities &&
                data.offerCreatedEntities.map((defaultValues, index) => (
                  <ul
                    key={index}
                    className="nft__custom-table-rows grid grid-cols-6 gap-5 py-3 px-3 mt-4 rounded-lg border border-solid border-gray-200 bg-gray-100/30 hover:bg-gray-100"
                  >
                    <li>
                      <span className="text-dark_mode">
                        {" "}
                        {ethers.utils.formatEther(defaultValues.offerPrice)} PT
                      </span>
                    </li>
                    <li>
                      <span className="text-dark_mode">8% below</span>
                    </li>
                    <li className="col-span-2">
                      <span className="text-dark_mode">{defaultValues.ts}</span>
                    </li>
                    <li className="col-span-2">
                      <span className="text-dark_mode">
                        <button
                          style={{
                            background: "",
                            border: "none",
                            padding: 0,
                            /*optional*/
                            /*input has OS specific font-family*/
                            color: "#385FD7",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            console.log("click", index);
                            setSelectedOfferIndex(index);
                            onOfferOpen();
                          }}
                        >
                          View Offer
                        </button>
                      </span>
                    </li>
                  </ul>
                ))}

              {/* {% endfor %} */}
            </div>
          </div>
        </div>
      </section>
      {loading && data && (
        <OfferDetails
          collectionAddress={probs.collectionAddress}
          openModle={openOfferModle}
          onClose={onOfferClose}
          tokenId={probs.tokenId}
          injectedProvider={probs.injectedProvider}
          isFixedPrice={probs.isFixedPrice}
          wallet={probs.wallet}
          isOwner={probs.isOwner}
          offerData={data.offerCreatedEntities[selectedOfferIndex]}
          isListed={probs.isListed}
          setLoadSubGraphData={probs.setLoadSubGraphData}
          userAddress={probs.userAddress.toLowerCase()}
        />
      )}
    </>
  );
}
