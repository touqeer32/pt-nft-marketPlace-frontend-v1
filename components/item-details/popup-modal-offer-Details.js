import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { post } from "../../utils";
import { toast } from "react-toastify";
import {
  PTNFT_MARKETPLACE,
  PTNFT_MARKETPLACE_ABI,
  PTNFT_NFT,
} from "./../../config";
export default function OfferDetails(probs) {
  const router = useRouter();
  const [isAccepted, setIAccepted] = useState(false);
  const [processOffer, serProcessOffer] = useState(false);

  async function acceptOffer(_isAccepted) {
    serProcessOffer(true);
    const { chainId } = await probs.injectedProvider.getNetwork();
    if (chainId == "5") {
      try {
        setIAccepted(_isAccepted);
        const signer = await probs.injectedProvider.getSigner();
        var address = await signer.getAddress();
        let transaction;
        let tx;

        let ptMarketplace = new ethers.Contract(
          PTNFT_MARKETPLACE,
          PTNFT_MARKETPLACE_ABI,
          signer
        );
        transaction = await ptMarketplace.acceptOffer(
          PTNFT_NFT,
          probs.tokenId,
          _isAccepted
        );
        tx = await transaction.wait();
        if (_isAccepted) {
          var response = await post("change-status-nft", {
            collectionId: probs.offerData.collection,
            wallet: address,
            tokenId: probs.offerData.tokenId,
          });
          if (response.status != 200) {
            toast.error("Issue in with But Please Try Again");
          } else {
            toast.success("You Successfully Process Offer");
          }
        } else {
          toast.error("Transaction Successful");
        }

        probs.onClose();

        router.push({
          pathname: `/account/`,
        });
      } catch (error) {
        probs.onClose();
      }
    }
  }
  async function withdrawOffer() {
    serProcessOffer(true);
    const { chainId } = await probs.injectedProvider.getNetwork();
    if (chainId == "5") {
      try {
        const signer = await probs.injectedProvider.getSigner();
        let transaction;
        let tx;
        let ptMarketplace = new ethers.Contract(
          PTNFT_MARKETPLACE,
          PTNFT_MARKETPLACE_ABI,
          signer
        );
        transaction = await ptMarketplace.withdrawOffer(
          probs.collectionAddress,
          probs.tokenId
        );
        tx = await transaction.wait();

        if (tx) {
          probs.setLoadSubGraphData(true);
          toast.success("Successfully Wothdraw Offer");
        } else {
          toast.error("Issue with Withdraw offer try later");
        }

        probs.onClose();
      } catch (error) {
        console.log("withdraw ", error);
        probs.onClose();
      }
    }
  }
  useEffect(() => {
    // declare the data fetching function

    // declare the data fetching function
    const fetchData = async () => {
      serProcessOffer(false);
    };
    if (probs.openModle) {
      fetchData();
    }
  }, [probs.openModle]);

  return (
    <Modal
      show={probs.openModle}
      size="4xl"
      popup={true}
      onClose={probs.onClose}
      tabIndex="-1"
      aria-hidden="true"
      id="popup-modal-review-info-buy-bid"
      className="nft__modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center outline-none"

      //   tabIndex="-1"
    >
      {probs.offerData && (
        <div className="relative bg-white rounded-lg">
          <button
            type="button"
            className="w-8 h-8 absolute top-3 right-3 text-gray-300 bg-transparent hover:bg-gray-100 hover:text-dark_mode rounded-lg ml-auto inline-flex items-center justify-center"
            data-button-close="popup-modal-review-info-buy-bid"
          >
            <FontAwesomeIcon
              icon={faXmark}
              onClick={probs.onClose}
              className="fa-solid fa-xmark text-lg"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-12 px-16">
            <i className="block fa-solid fa-clipboard-check mt-2 text-nft_institutional text-6xl text-center"></i>
            <h5 className="mt-5 text-dark_mode text-lg font-semibold text-center">
              Review this information about the offer place by Buyer
            </h5>
            <div className="nft_custom-table-wrapper w-4/5 mx-auto mt-8 rounded-lg border border-solid border-gray-200">
              <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
                <li>
                  <span className="text-gray-300 text-sm">Offer By</span>
                </li>
                <li>
                  <span className="text-dark_mode text-sm font-semibold">
                    {probs.offerData.buyer}
                  </span>
                </li>
              </ul>
              <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
                <li>
                  <span className="text-gray-300 text-sm">Amount</span>
                </li>
                <li>
                  <span className="text-dark_mode text-sm font-semibold">
                    {ethers.utils.formatEther(probs.offerData.offerPrice)} PT
                  </span>
                </li>
              </ul>
              <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
                <li>
                  <span className="text-gray-300 text-sm">Collection</span>
                </li>
                <li>
                  <span className="text-dark_mode text-sm font-semibold">
                    {probs.offerData.collection}
                  </span>
                </li>
              </ul>
              <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
                <li>
                  <span className="text-gray-300 text-sm">Status</span>
                </li>
                <li>
                  <span className="text-dark_mode text-sm font-semibold">
                    {probs.offerData.status ? "Active" : "Deactive"}
                  </span>
                </li>
              </ul>
              <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
                <li>
                  <span className="text-gray-300 text-sm">Timestamp</span>
                </li>
                <li>
                  <span className="text-dark_mode text-sm font-semibold">
                    {probs.offerData.ts}
                  </span>
                </li>
              </ul>
            </div>
            {processOffer && (
              <>
                <hr className="mb-6" />
                <div className="mt-10 flex">
                  <div role="status">
                    <svg
                      className="inline w-8 h-8 text-gray-100 animate-spin fill-nft_institutional"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <hgroup className="ml-6">
                    <h5 className="text-dark_mode text-base font-semibold">
                      Confirm Offer Status
                    </h5>
                    <h6 className="mt-1 text-gray-300 text-sm">
                      Are you sure you want to{" "}
                      {isAccepted ? "Accepted " : "Rejected"} Offer
                    </h6>
                    <button
                      type="button"
                      className="mt-10 min-h-[44px] py-2 px-6 mr-4 inline-flex items-center justify-center rounded-full bg-gray-100 text-dark_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                    >
                      Waiting for approval...
                    </button>
                  </hgroup>
                </div>
              </>
            )}
            {probs.offerData.status && probs.isOwner && probs.isListed && (
              <div className="w-4/5 mx-auto mt-8 flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    acceptOffer(true);
                  }}
                  className="block py-3 px-16 mx-auto mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                >
                  Accept Offer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    acceptOffer(false);
                  }}
                  className="block py-3 px-16 mx-auto mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                >
                  Reject Offer
                </button>
              </div>
            )}
            {probs.offerData.status &&
              probs.userAddress == probs.offerData.buyer &&
              probs.isListed && (
                <div className="w-4/5 mx-auto mt-8 flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      withdrawOffer();
                    }}
                    className="block py-3 px-16 mx-auto mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                  >
                    Withdraw Offer
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </Modal>
  );
}
