import React from "react";
import StandardLayout from "../../components/layouts/StandardLayout";
import Link from "next/link";

export default function CreatePage(props) {
  return (
    <section className="nft__create-choose-type relative mt-36 px-36 xl:max-w-full lg:container">
      <div className="flex">
        <div className="ml-[16.666667%] basis-9/12">
          <h4 className="text-dark_mode font-semibold">Choose Type</h4>
          <div className="flex flex-row gap-4 mt-10">
            <Link href="/create/nft-single">
              <div className="basis-4/12">
                <input
                  type="radio"
                  name="choose_type"
                  id="type-single"
                  value="type-single"
                  className="hidden peer"
                />
                <label
                  htmlFor="type-single"
                  className="inline-flex w-full min-h-[350px] p-10 bg-light_mode rounded-xl border border-gray-200 cursor-pointer peer-checked:bg-nft_institutional/20 hover:bg-gray-100"
                >
                  <span className="block">
                    <img
                      src="https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/633ea08716788805849f80ca_radio-type-single.svg"
                      alt="Choose Type Single"
                      className="h-40"
                    />
                    <span className="block mt-6 text-dark_mode text-lg font-semibold">
                      Single
                    </span>
                    <span className="block mt-1 text-gray-300 text-sm">
                      Create single NFT for one of a kind.
                    </span>
                  </span>
                </label>
              </div>
            </Link>
            <Link href="/create/nft-multiple">
              <div className="basis-4/12">
                <input
                  type="radio"
                  name="choose_type"
                  id="type-multiple"
                  value="type-multiple"
                  className="hidden peer"
                />
                <label
                  htmlFor="type-multiple"
                  className="inline-flex w-full min-h-[350px] p-10 bg-light_mode rounded-xl border border-gray-200 cursor-pointer peer-checked:bg-nft_institutional/20 hover:bg-gray-100"
                >
                  <span className="block">
                    <img
                      src="https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/633ea087d338d50466fca793_radio-type-multiple.svg"
                      alt="Choose Type Multiple"
                      className="h-40"
                    />
                    <span className="block mt-6 text-dark_mode text-lg font-semibold">
                      Multiple
                    </span>
                    <span className="block mt-1 text-gray-300 text-sm">
                      Create multiple NFTs to sell one collectible multiple
                      times.
                    </span>
                  </span>
                </label>
              </div>
            </Link>
            <Link href="/create/nft-auction">
              <div className="basis-4/12">
                <input
                  type="radio"
                  name="choose_type"
                  id="type-create-auction"
                  value="type-create-auction"
                  className="hidden peer"
                  required=""
                />
                <label
                  htmlFor="type-create-auction"
                  className="inline-flex w-full min-h-[350px] p-10 bg-light_mode rounded-xl border border-gray-200 cursor-pointer peer-checked:bg-nft_institutional/20 hover:bg-gray-100"
                >
                  <span className="block">
                    <img
                      src="https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/633ea08700fa5e5badafb140_radio-type-create-auction.svg"
                      alt="Choose Type Create and Auction"
                      className="h-40"
                    />
                    <span className="block mt-6 text-dark_mode text-lg font-semibold">
                      Create and Auction
                    </span>
                    <span className="block mt-1 text-gray-300 text-sm">
                      Create it and put it up for auction at the same time.
                    </span>
                  </span>
                </label>
              </div>
            </Link>
          </div>
          <h6 className="mt-14 text-dark_mode text-lg font-semibold">
            Do you want create a collection? &nbsp;
            <Link
              href="/create/collection"
            >
                <span className="underline text-nft_institutional hover:text-dark_mode">
                    Let's go.
                </span>
            </Link>
          </h6>
        </div>
      </div>
    </section>
  );
}
CreatePage.Layout = StandardLayout;
