import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import UnlistItem from "./popup-modal-unlist-item";
export default function ReviewInfoUnListedNft(probs) {
  const [openBidModle, setOpenBidModle] = useState(false);
  const [isUnderstand, setIsUnderstand] = useState(false);

  function onBidClick() {
    probs.onClose();
    setIsUnderstand(false);
    setOpenBidModle(true);
    return setOpenBidModle;
  }
  function onBidClose() {
    setIsUnderstand(false);
    setOpenBidModle(false);
    return setOpenBidModle;
  }
  useEffect(() => {
    if (isUnderstand) {
      probs.onClose();
      onBidClick();
    } else {
    }
  }, [isUnderstand]);
  const router = useRouter();

  return (
    <Modal
      show={probs.openModle}
      size="4xl"
      popup={true}
      onClose={probs.onClose}
      //   tabIndex="-1"
      id="popup-modal-review-info-buy-bid"
      tabIndex="-1"
      aria-hidden="true"
      className="nft__modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center outline-none"
    >
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
            Review this information to ensure it's what you want to unlist from
            Marketplace.
          </h5>
          <div className="nft_custom-table-wrapper w-4/5 mx-auto mt-8 rounded-lg border border-solid border-gray-200">
            <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
              <li>
                <span className="text-gray-300 text-sm">Collection name</span>
              </li>
              <li>
                <span className="text-dark_mode text-sm font-semibold">
                  {probs.nftName}
                </span>
              </li>
            </ul>
            <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
              <li>
                <span className="text-gray-300 text-sm">Creator</span>
              </li>
              <li>
                <span className="text-dark_mode text-sm font-semibold">
                  {probs.wallet}
                </span>
              </li>
            </ul>
            <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
              <li>
                <span className="text-gray-300 text-sm">Total sales</span>
              </li>
              <li>
                <span className="text-dark_mode text-sm font-semibold">
                  0 sales
                </span>
              </li>
            </ul>
            <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
              <li>
                <span className="text-gray-300 text-sm">Total volume</span>
              </li>
              <li>
                <span className="text-dark_mode text-sm font-semibold">
                  ---
                </span>
              </li>
            </ul>
            <ul className="nft__custom-table-rows grid grid-cols-3 py-4 px-8 last:border-none border-b border-solid border-gray-200 hover:bg-gray-100/30">
              <li>
                <span className="text-gray-300 text-sm">Social</span>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  className="first:ml-0 text-gray-300 text-xl hover:text-dark_mode relative bottom-0 hover:bottom-0.5 hover:text-gray-300 ease-out duration-300"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="ml-4 text-gray-300 text-xl hover:text-dark_mode relative bottom-0 hover:bottom-0.5 hover:text-gray-300 ease-out duration-300"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="ml-4 text-gray-300 text-xl hover:text-dark_mode relative bottom-0 hover:bottom-0.5 hover:text-gray-300 ease-out duration-300"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-4/5 mx-auto mt-8 flex items-center">
            <input
              id="checkbox-understand"
              type="checkbox"
              checked={isUnderstand}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  setIsUnderstand(true);
                  onBidClick();
                }
                if (!checked) {
                  setIsUnderstand(false);
                }
              }}
              data-checkbox-understand="popup-modal-review-info-buy-bid"
              className="w-5 h-5 text-nft_institutional bg-gray-100 rounded border-gray-300 focus:ring-transparent focus:ring-0"
            />
            <label
              htmlFor="checkbox-understand"
              className="ml-4 text-dark_mode text-sm font-medium"
            >
              I understand that PharmaTrace has not reviewed this collection and
              blockchain transactions are irreversible.
            </label>
          </div>
          <UnlistItem
            openModle={openBidModle}
            onClose={onBidClose}
            injectedProvider={probs.injectedProvider}
            tokenId={probs.tokenId}
            currency={probs.currency}
            price={probs.price}
            nftName={probs.nftName}
            wallet={probs.wallet}
            collectionAddress={probs.collectionAddress}
            isListed={probs.isListed}
          />
        </div>
      </div>
    </Modal>
  );
}
