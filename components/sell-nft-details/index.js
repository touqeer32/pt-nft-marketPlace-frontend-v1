import Link from "next/link";
import React, { useState, useEffect } from "react";
import PopUpInfo from "./../info/popUpInfo";
import ListNft from "./popup-modal-complete-your-listing";
import { Modal } from "flowbite-react";
import Card from "./../card-signle-nft";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
  faStopwatch,
  faMoneyBill1,
  faAngleDown,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BorderOutlined } from "@ant-design/icons";

export default function SellNFTDetails(probs) {
  const [curresncies, setCurresncies] = useState([
    {
      name: "PHT",
      logo: "https://pharmatracenft.infura-ipfs.io/ipfs/QmSKFPbynjZLq5T6wQidkUPaZSZPK2ziG2RVZMFr7YhCpD",
      currencyAddress: "0xfDA036A53E7616a5cC9Ad44c7774892A9c3eFc4F",
    },
    {
      name: "ETH",
      logo: "https://pharmatracenft.infura-ipfs.io/ipfs/QmSKFPbynjZLq5T6wQidkUPaZSZPK2ziG2RVZMFr7YhCpD",
      currencyAddress: "0xfDA036A53E7616a5cC9Ad44c7774892A9c3eFc4F",
    },
  ]);
  let newDate = new Date();

  const [curresncyIndex, setCurresncyIndex] = useState(0);
  const [currency, setCurresncy] = useState(curresncies[0].name);
  const [isFixedPrice, setIsFixedPrice] = useState(true);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(newDate);
  const [ercPopup, setErcPopup] = useState(false);
  const [openModle, setOpenModle] = useState(false);
  const [isListed, setisListed] = useState(false);

  function onClick() {
    setOpenModle(true);
    return openModle;
  }
  function onClose() {
    setOpenModle(false);
    return openModle;
  }
  return (
    <>
      <section className="nft__create-choose-type-single mt-36 px-36 xl:max-w-full lg:container">
        <div className="ml-[25%] basis-9/12 pl-4">
          <hgroup>
            <h4 className="text-dark_mode font-semibold">Item for Sale</h4>
            <h6 className="w-[50%] mt-10 text-dark_mode text-lg font-semibold">
              Lorem Ipsum is simply dummy text of the printing.
            </h6>
          </hgroup>
        </div>
        <div className="flex flex-row gap-4 mt-10 ml-[25%] pl-4">
          <div className="basis-6/12">
            <form id="create-item-for-sale">
              <div>
                <span className="block mb-2 text-dark_mode text-sm font-semibold">
                  Type*
                </span>
                <div className="flex justify-between gap-4">
                  <div
                    className="basis-2/4"
                    onClick={() => {
                      setIsFixedPrice(true);
                    }}
                  >
                    <input
                      type="radio"
                      name="type"
                      checked={isFixedPrice}
                      id="type-fixed-price"
                      value="type-fixed-price"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="type-fixed-price"
                      className="inline-flex w-full p-8 bg-light_mode rounded-xl border border-gray-200 cursor-pointer peer-checked:bg-nft_institutional/20 hover:bg-gray-100"
                    >
                      <span className="block mx-auto text-center">
                        <FontAwesomeIcon
                          icon={faMoneyBill1}
                          className="fa-solid fa-money-bill-1 text-dark_mode text-3xl"
                        />
                        <span className="block mt-2 text-dark_mode text-base font-semibold">
                          Fixed Price
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    className="basis-2/4"
                    onClick={() => {
                      setIsFixedPrice(false);
                    }}
                  >
                    <input
                      type="radio"
                      name="type"
                      id="type-timed-auction"
                      value="type-timed-auction"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="type-timed-auction"
                      className="inline-flex w-full p-8 bg-light_mode rounded-xl border border-gray-200 cursor-pointer peer-checked:bg-nft_institutional/20 hover:bg-gray-100"
                    >
                      <span className="block mx-auto text-center">
                        <FontAwesomeIcon
                          icon={faStopwatch}
                          className=" fa-solid fa-stopwatch text-dark_mode text-3xl"
                        />
                        <span className="block mt-2 text-dark_mode text-base font-semibold">
                          Timed Auction
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <label
                  htmlFor="starting-price"
                  className="block mb-2 text-dark_mode text-sm font-semibold"
                >
                  {isFixedPrice ? "Price*" : "Minimum Price*"}
                </label>
                <div className="flex gap-4">
                  <div className="basis-4/12 relative">
                    <div className="nft__select-box--current" tabIndex="1">
                      {/* {% for token in tokens %} */}
                      <div className="nft__select-box--value flex">
                        {/* <input className="nft__select-box--input " type="radio" name="token" id="token-{{ loop.index }}" value="{{ token | lower }}" {% if loop.first %} checked="checked" {% endif %} /> */}
                        <input
                          className="nft__select-box--input "
                          type="radio"
                          name="token"
                          id={currency}
                          value={currency}
                          checked="checked"
                          readOnly
                        />

                        <p className="nft__select-box--input-text p-4 w-full text-dark_mode text-sm font-medium bg-gray-300/20 rounded-lg border border-solid border-transparent hover:bg-gray-300/30">
                          {/* {{ token }} */}
                          {currency}
                        </p>
                      </div>
                      {/* {% endfor %} */}
                      <i className="nft__select-box--icon fa-solid fa-angle-down absolute top-[50%] right-[15px] text-gray-300"></i>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className="nft__select-box--icon fa-solid fa-angle-down absolute top-[50%] right-[15px] text-gray-300"
                      />
                    </div>
                    <ul className="nft__select-box--list absolute z-10 w-full p-0 list-none mt-2 bg-light_mode rounded-lg border border-solid border-gray-100/60">
                      {curresncies &&
                        curresncies.map((defaultValues, index) => (
                          <li
                            key={defaultValues.name}
                            className="rounded-lg bg-light_mode hover:bg-gray-100/40"
                          >
                            {" "}
                            <option
                              onClick={(e) => {
                                // console.log("e.target.value", e.target);
                                if (e.target.value) {
                                  setCurresncyIndex(index);
                                  setCurresncy(e.target.value);
                                }
                              }}
                              name="test"
                              key={defaultValues.name}
                              value={defaultValues.name}
                              className="nft__select-box--option p-4 text-dark_mode text-sm font-medium"
                              htmlFor={index}
                              aria-hidden="true"
                            >
                              {" "}
                              {defaultValues.name}
                            </option>
                          </li>
                        ))}

                      {/* {props.defaultValues.length > 0 &&
            props.defaultValues.map((defaultValues, index) => (
                                    <li className="rounded-lg bg-light_mode hover:bg-gray-100/40">
                        <label
                          className="nft__select-box--option p-4 text-dark_mode text-sm font-medium"
                          htmlFor="token-{{ loop.index }}"
                          aria-hidden="true"
                        >
                          <i className="mr-3 fa-brands fa-ethereum text-[#627EEA] text-xl align-middle"></i>
                          <i className="mr-3 fa-brands fa-ethereum text-[#E51D75] text-xl align-middle"></i>
                        </label>
                      </li>*/}
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
                      min="0"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <label
                  htmlFor="expiration-date"
                  className="block mb-2 text-dark_mode text-sm font-semibold"
                >
                  Expiration Date*
                </label>

                <div className="relative">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      style={{ BorderOutlined: 0 }}
                      renderInput={(props) => <TextField {...props} />}
                      className="datetime-picker block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className="mt-8">
                <hr className="mb-6" />

                <span className="block mb-2 text-dark_mode text-sm font-semibold">
                  Fees
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    onMouseEnter={() => {
                      setErcPopup(true);
                    }}
                    onMouseLeave={() => setErcPopup(false)}
                    className="fa-solid fa-circle-info ml-2 text-dark_mode text-base cursor-pointer hover:scale-110 ease-out duration-300"
                    data-popover-target="popover-erc-721"
                    data-popover-placement="bottom"
                    type="button"
                  />
                </span>
                <PopUpInfo
                  popup={ercPopup}
                  title={"Fees"}
                  description={
                    "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
                  }
                />
                <div className="flex justify-between">
                  <div>
                    <span className="block text-gray-300 text-sm font-medium">
                      Service Fee
                    </span>
                    <span className="block mt-1 text-gray-300 text-sm font-medium">
                      Creator Fee
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-300 text-sm font-medium">
                      2.5%
                    </span>
                    <span className="block mt-1 text-gray-300 text-sm font-medium">
                      0%
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClick}
                data-modal-toggle="popup-modal-complete-your-listing"
                className="block py-3 px-8 mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
              >
                Complete
              </button>
            </form>
            <ListNft
              selectedImage={probs.image}
              name={probs.name}
              collectionName={probs.collectionName}
              collectionAddress={probs.collectionAddress}
              openModle={openModle}
              onClose={onClose}
              tokenId={probs.tokenId}
              uri={probs.uri}
              injectedProvider={probs.injectedProvider}
              price={price}
              isFixedPrice={isFixedPrice}
              currency={curresncies[curresncyIndex]}
              setisListed={setisListed}
              isOnChain={probs.isOnChain}
              date={date}
            />
          </div>
          <div className="basis-4/12 ml-[8.333333%]">
            <div className="sticky top-36">
              <div>
                <span className="block mb-2 text-dark_mode text-sm font-semibold">
                  Preview
                </span>
                <Card
                  selectedImage={probs.image}
                  likes={""}
                  name={probs.name}
                  tokenId={probs.tokenId}
                  description={probs.description}
                  salePrice={price}
                  maxBidPrice={""}
                  collectionName={probs.collectionName}
                  collectionImage={probs.collectionImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <button
        type="button"
        onClick={onClick}
        data-modal-toggle="popup-modal-complete-your-listing"
        className="block py-3 px-8 mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
      >
        Complete
      </button>
      <Modal show={test} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">?</div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
