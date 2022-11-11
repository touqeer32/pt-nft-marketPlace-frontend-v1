import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import TransactionMessage from "../../info/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { post } from "../../../utils";
import { toast } from "react-toastify";
import {
  PT_TOKEN,
  PT_TOKEN_ABI,
  PTNFT_MARKETPLACE,
  PTNFT_MARKETPLACE_ABI,
  PTNFT_NFT,
  PTNFT_NFT_ABI,
} from "../../../config";

export default function PlaceBid(probs) {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [processOffer, serProcessOffer] = useState(true);
  const [placeBidAmount, setPlaceBidAmount] = useState(0);
  let [minPrice, setMinPrice] = useState(0);

  let [checkBalance, setCheckbalance] = useState("none");
  let [checkApproval, setCheckApproval] = useState("none");
  let [checkOffer, setCheckOffer] = useState("none");

  let [tokenApprovalMessage, setTokenApprovalMessage] = useState(
    "Checking Token Transfer Permission To Contract"
  );
  let [approvalMessage, setApprovalMessage] = useState(
    "Please Approval Token Amount To Contract"
  );
  let [offerMessage, setOfferMessage] = useState("Please Conform you offer");

  async function placeOffer() {
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
        if (placeBidAmount < balance) {
          serProcessOffer(true);
          const signer = await probs.injectedProvider.getSigner();
          var address = await signer.getAddress();
          console.log("probs.price", probs.price);
          let price = ethers.utils.parseEther(probs.price);
          let _placeBidAmount = ethers.utils.parseEther(placeBidAmount);
          let ptMarketplace = new ethers.Contract(
            PTNFT_MARKETPLACE,
            PTNFT_MARKETPLACE_ABI,
            signer
          );
          let ptToken = new ethers.Contract(PT_TOKEN, PT_TOKEN_ABI, signer);
          let transaction;
          let tx;
          transaction = await ptToken.allowance(address, PTNFT_MARKETPLACE);

          let temp =
            parseInt(transaction.toString()) <
            parseInt(_placeBidAmount.toString());
          setCheckbalance(!temp ? "check" : "xmark");
          setTokenApprovalMessage(
            !temp
              ? "Contract have Permission"
              : "Please Give Permission To Contract"
          );
          if (
            parseInt(transaction.toString()) <
            parseInt(_placeBidAmount.toString())
          ) {
            transaction = await ptToken.approve(
              PTNFT_MARKETPLACE,
              _placeBidAmount
            );
            tx = await transaction.wait();
            setApprovalMessage("Successfully Approve Token Spend Permission");
            setCheckApproval("check");
          } else {
            setApprovalMessage("Already Approve Token Spend Permission");
            setCheckApproval("check");
          }
          console.log("probs.isOnChain", probs.isOnChain);
          if (!probs.isOnChain) {
            var voucher = {
              currency: probs.currency,
              isFixedPrice: probs.isFixedPrice,
              minPrice: price.toString(),
              signature: probs.signature,
              tokenId: probs.tokenId,
              uri: probs.uri,
            };
            console.log("voucher", voucher);
            transaction = await ptMarketplace.createLazzOffer(
              PTNFT_NFT,
              voucher,
              _placeBidAmount
            );
          } else {
            transaction = await ptMarketplace.createOffer(
              probs.collectionAddress,
              probs.tokenId,
              _placeBidAmount
            );
          }
          setOfferMessage("Wating For Transaction Complete");
          tx = await transaction.wait();

          if (tx) {
            probs.setLoadSubGraphData(true);
            setCheckOffer("check");
            toast.success("You have successfully place the offer");
            probs.onClose();
          }
        } else {
          toast.error("Insufficiente Balance");
        }
      } catch (error) {
        // console.log("herer on reject", error);
        setApprovalMessage("Error In Approve Token");
        setCheckApproval("xmark");
        setCheckOffer("xmark");

        probs.onClose();
      }
    }
  }
  async function placeBuy() {
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
        const signer = await probs.injectedProvider.getSigner();
        // console.log("voucher", voucher);
        let ptToken = new ethers.Contract(PT_TOKEN, PT_TOKEN_ABI, signer);
        let ptMarketplace = new ethers.Contract(
          PTNFT_MARKETPLACE,
          PTNFT_MARKETPLACE_ABI,
          signer
        );
        var address = await signer.getAddress();

        let price = ethers.utils.parseEther(probs.price);
        let transaction;
        let tx;
        transaction = await ptToken.allowance(address, PTNFT_MARKETPLACE);
        // let tx = await transaction.wait();
        let temp = parseInt(transaction.toString()) < parseInt(price);
        setCheckbalance(!temp ? "check" : "xmark");
        setTokenApprovalMessage(
          !temp
            ? "Contract have Permission"
            : "Please Give Permission To Contract"
        );
        console.log("transaction", transaction.toString());

        if (parseInt(transaction.toString()) < parseInt(price)) {
          transaction = await ptToken.approve(PTNFT_MARKETPLACE, price);
          tx = await transaction.wait();
          setApprovalMessage("Successfully Approve Token Spend Permission");
          setCheckApproval("check");
        } else {
          setApprovalMessage("Already Approve Token Spend Permission");
          setCheckApproval("check");
        }
        console.log("probs.isOnChain", probs.isOnChain);
        if (!probs.isOnChain) {
          var voucher = {
            currency: probs.currency,
            isFixedPrice: probs.isFixedPrice,
            minPrice: price.toString(),
            signature: probs.signature,
            tokenId: probs.tokenId,
            uri: probs.uri,
          };
          console.log("placeBuy", voucher);
          transaction = await ptMarketplace.buyLazzNFT(PTNFT_NFT, voucher);
        } else {
          transaction = await ptMarketplace.buyItem(
            probs.collectionAddress,
            probs.tokenId
          );
        }
        tx = await transaction.wait();
        console.log("tx", tx);
        probs.setLoadSubGraphData(true);

        var response = await post("change-status-nft", {
          collectionId: probs.collectionAddress,
          wallet: probs.wallet,
          tokenId: probs.tokenId,
        });

        if (response.status != 200) {
          toast.error("Issue in with But Please Try Again");
        } else {
          toast.success("You Successfully Bought");
        }
        router.push({
          pathname: `/account/`,
        });
      } catch (error) {
        console.log("herer on reject", error);
        probs.onClose();
      }
    }
  }
  async function loadBalace() {
    const { chainId } = await probs.injectedProvider.getNetwork();
    if (chainId == "5") {
      try {
        const signer = await probs.injectedProvider.getSigner();
        var address = await signer.getAddress();
        let ptToken = new ethers.Contract(PT_TOKEN, PT_TOKEN_ABI, signer);
        const balanceInWei = (+(await ptToken.balanceOf(
          address.toString()
        ))).toLocaleString("fullwide", { useGrouping: false });
        // let price = ethers.utils.formatEther(probs.price);
        // console.log("pricepriceprice", price.toString());
        // setMinPrice(price.toString());
        const balanceInEth = ethers.utils.formatEther(balanceInWei);
        setBalance(balanceInEth);
      } catch (error) {
        console.log("herer on reject", error);
        probs.onClose();
      }
    }
  }
  useEffect(() => {
    // declare the data fetching function

    // declare the data fetching function
    const fetchData = async () => {
      await loadBalace();
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
      className="nft__modal overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center outline-none"
      aria-hidden="true"
    >
      <div className="relative bg-white rounded-lg">
        <button
          type="button"
          className="w-8 h-8 absolute top-3 right-3 text-gray-300 bg-transparent hover:bg-gray-100 hover:text-dark_mode rounded-lg ml-auto inline-flex items-center justify-center"
          data-button-close="popup-modal-place-bid"
        >
          <FontAwesomeIcon
            icon={faXmark}
            onClick={probs.onClose}
            className="fa-solid fa-xmark text-lg"
          />{" "}
          <span className="sr-only">Close modal</span>
        </button>
        <div className="py-12 px-16">
          <i className="block fa-solid fa-tag mt-2 text-nft_institutional text-6xl text-center"></i>
          <h5 className="mt-5 text-dark_mode text-lg font-semibold text-center">
            {probs.isFixedPrice ? "Buy NFT" : "Place a bid"}
          </h5>
          <div className="w-4/5 mx-auto mt-8">
            <form id="place-bid">
              <div>
                <label
                  htmlFor="starting-price"
                  className="block mb-2 text-dark_mode text-sm font-semibold"
                >
                  {probs.isFixedPrice ? "" : "Offer amount*"}
                </label>
                {!probs.isFixedPrice && (
                  <>
                    {" "}
                    <div className="flex gap-4">
                      <div className="basis-4/12 relative">
                        <div className="nft__select-box--current" tabIndex="1">
                          {/* {% for token in tokens %} */}
                          <div className="nft__select-box--value flex">
                            <img src="https://pharmatracenft.infura-ipfs.io/ipfs/QmSKFPbynjZLq5T6wQidkUPaZSZPK2ziG2RVZMFr7YhCpD" />

                            <p className="nft__select-box--input-text p-4 w-full text-dark_mode text-sm font-medium bg-gray-300/20 rounded-lg border border-solid border-transparent hover:bg-gray-300/30">
                              {/* {% if loop.first %} */}
                              <i className="mr-3 fa-brands fa-ethereum text-[#627EEA] text-xl align-middle"></i>
                              {/* {% else %} */}
                              <i className="mr-3 fa-brands fa-ethereum text-[#E51D75] text-xl align-middle"></i>
                              {/* {% endif %} */}
                              {/* {{ token }} */}
                            </p>
                          </div>
                          {/* {% endfor %} */}
                          <i className="nft__select-box--icon fa-solid fa-angle-down absolute top-[50%] right-[15px] text-gray-300"></i>
                        </div>
                        <ul className="nft__select-box--list absolute z-10 w-full p-0 list-none mt-2 bg-light_mode rounded-lg border border-solid border-gray-100/60">
                          {/* {% for token in tokens %} */}
                          <li className="rounded-lg bg-light_mode hover:bg-gray-100/40">
                            <label
                              className="nft__select-box--option p-4 text-dark_mode text-sm font-medium"
                              htmlFor="token-{{ loop.index }}"
                              aria-hidden="true"
                            >
                              <img src="https://pharmatracenft.infura-ipfs.io/ipfs/QmSKFPbynjZLq5T6wQidkUPaZSZPK2ziG2RVZMFr7YhCpD" />
                            </label>
                          </li>
                          {/* {% endfor %} */}
                        </ul>
                      </div>
                      <div className="basis-8/12">
                        <input
                          type="number"
                          name="starting_price"
                          id="starting-price"
                          className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                          placeholder="Enter the amount"
                          autoComplete="off"
                          onChange={(e) => {
                            setPlaceBidAmount(e.target.value);
                          }}
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <span className="block mt-3 text-gray-300 text-sm">
                      Total balance: {balance} PT ($0.13)
                    </span>
                  </>
                )}
                {probs.isFixedPrice && (
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
                          Buy Status
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
                        {checkBalance != "none" &&
                          checkApproval != "none" &&
                          checkOffer != "none" && (
                            <TransactionMessage
                              check={checkOffer}
                              message={offerMessage}
                            />
                          )}
                        <span className="block mt-3 text-gray-300 text-sm">
                          Total balance: {balance} PT ($0.13)
                        </span>
                      </hgroup>
                    </div>
                  </>
                )}
              </div>
              {processOffer && !probs.isFixedPrice && (
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
                        Bid Status
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
                      {checkBalance != "none" &&
                        checkApproval != "none" &&
                        checkOffer != "none" && (
                          <TransactionMessage
                            check={checkOffer}
                            message={offerMessage}
                          />
                        )}

                      <button
                        type="button"
                        className="mt-10 min-h-[44px] py-2 px-6 mr-4 inline-flex items-center justify-center rounded-full bg-gray-100 text-dark_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                        disabled
                      >
                        Waiting for Transaction
                      </button>
                    </hgroup>
                  </div>
                </>
              )}
              {!probs.isFixedPrice && (
                <button
                  type="button"
                  onClick={placeOffer}
                  className="block py-3 px-16 mx-auto mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                >
                  Place bid
                </button>
              )}{" "}
              {probs.isFixedPrice && (
                <button
                  type="button"
                  onClick={placeBuy}
                  className="block py-3 px-16 mx-auto mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                >
                  Buy NFT
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
