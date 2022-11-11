import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { PTMinter } from "../../lib";
import TransactionMessage from "../info/message";

import {
  PT_TOKEN,
  PT_TOKEN_ABI,
  PTNFT_MARKETPLACE,
  PTNFT_MARKETPLACE_ABI,
  PTNFT_NFT,
  PTNFT_NFT_ABI,
} from "../../config";
import { ethers } from "ethers";
import { post } from "../../utils";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ListNft(probs) {
  const router = useRouter();
  const [isListing, setIsListing] = useState(false);
  let [checkBalance, setCheckbalance] = useState("none");
  let [checkApproval, setCheckApproval] = useState("none");
  let [checkOffer, setCheckOffer] = useState("none");

  let [tokenApprovalMessage, setTokenApprovalMessage] = useState(
    "Checking Marketplace Permission"
  );
  let [approvalMessage, setApprovalMessage] = useState(
    "Please Approval NFT To Marketplace"
  );
  let [offerMessage, setOfferMessage] = useState("Please Conform you offer");

  async function listItem() {
    if (!props.walletConnected || props.userAddress == "") {
      toast.error("Please Connect to your wallet First");
      return;
    }
    if (!props.isOnGoerli) {
      toast.error("Please Change your network to Goerli");
      return;
    }
    const { chainId } = await probs.injectedProvider.getNetwork();
    if (chainId == "5" && !isListing) {
      setIsListing(true);
      try {
        const signer = await probs.injectedProvider.getSigner();
        var address = await signer.getAddress();
        let price = ethers.utils.parseEther(probs.price);
        let ptNFT = new ethers.Contract(PTNFT_NFT, PTNFT_NFT_ABI, signer);
        let ptMarketplace = new ethers.Contract(
          PTNFT_MARKETPLACE,
          PTNFT_MARKETPLACE_ABI,
          signer
        );
        let transaction;
        let tx;
        transaction = await ptNFT.getApproved(probs.tokenId);

        let temp = transaction != PTNFT_MARKETPLACE;
        setCheckbalance(!temp ? "check" : "xmark");
        setTokenApprovalMessage(
          !temp ? "Markeplace Need Permission" : " Martplace have permission"
        );
        if (transaction != PTNFT_MARKETPLACE) {
          transaction = await ptNFT.approve(PTNFT_MARKETPLACE, probs.tokenId);
          tx = await transaction.wait();
          setApprovalMessage("Successfully Give Permission");
          setCheckApproval("check");
        } else {
          setApprovalMessage("Alread Have Permission");
          setCheckApproval("check");
        }
        const epochTime = Date.parse(probs.date);

        console.log(
          "approve = ",
          probs.collectionAddress,
          probs.tokenId,
          probs.currency.currencyAddress,
          price,
          epochTime,
          probs.isFixedPrice
        );
        setOfferMessage("Wating For Transaction Complete");

        transaction = await ptMarketplace.listItem(
          probs.collectionAddress,
          probs.tokenId,
          probs.currency.currencyAddress,
          price,
          epochTime,
          probs.isFixedPrice
        );
        console.log("listItem = ", listItem);

        tx = await transaction.wait();
        if (tx) {
          setCheckOffer("check");
          toast.success("You have successfully List You NFT");
          setIsListing(false);
          probs.onClose();
          router.push({
            pathname: `/nft-detail/${probs.collectionAddress}/${probs.tokenId}`,
          });
        }
      } catch (error) {
        console.log("error", error);
        setIsListing(false);

        // console.log("herer on reject", error);
        probs.onClose();
      }
    }
  }
  async function createSale() {
    if (!props.walletConnected || props.userAddress == "") {
      toast.error("Please Connect to your wallet First");
      return;
    }
    if (!props.isOnGoerli) {
      toast.error("Please Change your network to Goerli");
      return;
    }
    const { chainId } = await probs.injectedProvider.getNetwork();
    if (chainId == "5") {
      try {
        let price = ethers.utils.parseEther(probs.price);

        const signer = await probs.injectedProvider.getSigner();
        var address = await signer.getAddress();
        let ptNFT = new ethers.Contract(PTNFT_NFT, PTNFT_NFT_ABI, signer);
        const ptMinter = new PTMinter({ ptNFT, signer });
        const voucher = await ptMinter.createVoucher(
          probs.tokenId, //tokenId
          probs.uri, //uri
          probs.currency.currencyAddress,
          price.toString(), //minPrice
          probs.isFixedPrice //isFixedPrice
        );
        // console.log("voucher", voucher);
        var response = await post("listing-nft", {
          collectionId: probs.collectionAddress,
          wallet: address.toString(),
          tokenId: probs.tokenId,
          signature: voucher.signature,
          price: probs.price,
          currency: probs.currency.currencyAddress,
          isFixedPrice: probs.isFixedPrice, //isFixedPrice
          autionDate: probs.date,
        });
        if (response.status != 200) {
          toast.error("Issue in Listing Please Try Again");
        } else {
          toast.success("Your NFT is Successfully Listed");
        }
        router.push({
          pathname: `/nft-detail/${probs.collectionAddress}/${probs.tokenId}`,
        });
      } catch (error) {
        console.log("herer on reject", error);
        probs.onClose();
      }
    }
  }

  async function checkIsOnChain() {
    if (probs.isOnChain) {
      listItem();
    } else {
      createSale();
    }
  }
  useEffect(() => {
    // declare the data fetching function

    // declare the data fetching function
    const fetchData = async () => {
      await checkIsOnChain();
    };
    if (probs.openModle) {
      fetchData();
    }
  }, [probs]);
  return (
    <Modal
      show={probs.openModle}
      size="2xl"
      popup={true}
      onClose={probs.onClose}
      //   tabIndex="-1"
      className="nft__modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center outline-none"
      aria-hidden="true"
    >
      <div>
        <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg">
            <button
              type="button"
              className="w-8 h-8 absolute top-3 right-3 text-gray-300 bg-transparent hover:bg-gray-100 hover:text-dark_mode rounded-lg ml-auto inline-flex items-center justify-center"
              data-modal-toggle="popup-modal-complete-your-listing"
            >
              <FontAwesomeIcon
                icon={faXmark}
                onClick={probs.onClose}
                className="fa-solid fa-xmark text-lg"
              />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-12 px-16">
              <h5 className="mt-5 text-dark_mode text-xl font-semibold text-center">
                Complete your listing
              </h5>
              <div className="my-10 flex items-center justify-between">
                <figure className="flex flex-row items-center mt-4">
                  <img
                    src={probs.selectedImage}
                    alt="Avatar 9"
                    className="w-20 h-20 rounded-xl border-2 border-solid border-gray-100 object-cover"
                  />
                  <figcaption className="ml-4 flex flex-col items-start">
                    <span className="text-gray-300 text-sm font-medium">
                      Collection: {probs.collectionName}
                    </span>
                    <span className="mt-1 text-dark_mode text-sm font-semibold">
                      {probs.name} #{probs.tokenId}
                    </span>
                  </figcaption>
                </figure>
                <div className="flex flex-col items-end">
                  <span className="text-gray-300 text-sm font-medium">
                    Price
                  </span>
                  <span className="mt-1 text-dark_mode text-sm font-semibold">
                    <i className="mr-3 fa-brands fa-ethereum text-[#627EEA] text-xl align-middle"></i>
                    {probs.price}
                  </span>
                </div>
              </div>
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
                  {probs.isOnChain && (
                    <>
                      {" "}
                      <h5 className="text-dark_mode text-base font-semibold">
                        Listing NFT
                      </h5>
                      <TransactionMessage
                        check={checkBalance}
                        message={tokenApprovalMessage}
                      />
                      {checkBalance != "none" && checkBalance != "check" && (
                        <TransactionMessage
                          check={checkApproval}
                          message={approvalMessage}
                        />
                      )}
                      {checkBalance != "none" && checkApproval != "none" && (
                        <TransactionMessage
                          check={checkOffer}
                          message={offerMessage}
                        />
                      )}
                    </>
                  )}
                  {!probs.isOnChain && (
                    <h5 className="text-dark_mode text-base font-semibold">
                      Listing NFT
                    </h5>
                  )}

                  <button
                    type="button"
                    disabled
                    className="mt-10 min-h-[44px] py-2 px-6 mr-4 inline-flex items-center justify-center rounded-full bg-gray-100 text-dark_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                  >
                    Waiting for approval...
                  </button>
                </hgroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
