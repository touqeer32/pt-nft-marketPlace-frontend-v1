import React, { useState } from "react";
import GatheringLayout from "../../../components/layouts/GatheringLayout";

export default function Gathering() {
  const [tab, setTab] = useState(1);

  return (
    <div className="basis-9/12">
      <div className="inline-block border-b border-gray-200">
        <ul
          className="nft__tablist flex flex-wrap text-base font-semibold text-center"
          data-tabs-toggle="#tab-created"
          role="tablist"
        >
          <li className="mr-8" role="presentation">
            <button
              onClick={() => setTab(1)}
              className="inline-block p-0 pb-2 border-b-2"
              id="tab-nfts"
              data-tabs-target="#nfts"
              type="button"
              role="tab"
              aria-controls="nfts"
              aria-selected={tab == 1}
            >
              NFTs
              <span className="ml-3">67</span>
            </button>
          </li>
          <li className="last:mr-0" role="presentation">
            <button
              onClick={() => setTab(2)}
              className="inline-block p-0 pb-2 border-b-2"
              id="tab-collections"
              data-tabs-target="#collections"
              type="button"
              role="tab"
              aria-controls="collections"
              aria-selected={tab == 2}
            >
              Collections
              <span className="ml-3">234</span>
            </button>
          </li>
        </ul>
      </div>
      <div id="tab-created" className="mt-10">
        <div
          className={tab == 1 ? "" : "hidden"}
          id="nfts"
          role="tabpanel"
          aria-labelledby="tab-nfts"
        >
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100">
              <figure className="relative">
                <img
                  src="/nfts/crypto-goro-6.jpg"
                  alt="Crypto Goro #006"
                  className="w-full h-[280px] rounded-lg object-cover"
                />
                <figcaption className="flex py-1 px-3 items-center rounded-full bg-light_mode absolute top-3 right-3">
                  <i className="fa-solid fa-heart text-error"></i>
                  <span className="block ml-1 text-dark_mode text-xs font-medium">
                    13K
                  </span>
                </figcaption>
              </figure>
              <div className="mt-4">
                <figure className="flex flex-row items-center">
                  <img
                    src="/avatars/avatar-2.jpg"
                    alt="Avatar 1"
                    className="w-12 h-12 rounded-full border-2 border-solid border-gray-100 object-cover"
                  />
                  <figcaption className="ml-4">
                    <span className="block text-dark_mode text-sm font-semibold">
                      Crypto Goro #006
                    </span>
                    <span className="block text-sm text-gray-300">
                      Jimmy Aqui
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="block text-dark_mode text-sm font-semibold">
                  5 ETH
                </span>
                <span className="block text-xs text-gray-300 font-medium">
                  Highest Bid
                  <br />
                  1.09 ETH
                </span>
              </div>
            </div>

            <div className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100">
              <figure className="relative">
                <img
                  src="/nfts/crypto-goro-6.jpg"
                  alt="Crypto Goro #006"
                  className="w-full h-[280px] rounded-lg object-cover"
                />
                <figcaption className="flex py-1 px-3 items-center rounded-full bg-light_mode absolute top-3 right-3">
                  <i className="fa-solid fa-heart text-error"></i>
                  <span className="block ml-1 text-dark_mode text-xs font-medium">
                    13K
                  </span>
                </figcaption>
              </figure>
              <div className="mt-4">
                <figure className="flex flex-row items-center">
                  <img
                    src="/avatars/avatar-2.jpg"
                    alt="Avatar 1"
                    className="w-12 h-12 rounded-full border-2 border-solid border-gray-100 object-cover"
                  />
                  <figcaption className="ml-4">
                    <span className="block text-dark_mode text-sm font-semibold">
                      Crypto Goro #006
                    </span>
                    <span className="block text-sm text-gray-300">
                      Jimmy Aqui
                    </span>
                  </figcaption>
                </figure>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="block text-dark_mode text-sm font-semibold">
                  5 ETH
                </span>
                <span className="block text-xs text-gray-300 font-medium">
                  Highest Bid
                  <br />
                  1.09 ETH
                </span>
              </div>
            </div>
          </div>
          <div className="nft__load-more-button flex justify-center mt-10">
            <button
              type="button"
              className="py-3 px-12 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
            >
              Load more
            </button>
          </div>
        </div>
        <div
          className={tab == 2 ? "" : "hidden"}
          id="collections"
          role="tabpanel"
          aria-labelledby="tab-collections"
        >
          <div className="nft__no-found-block">
            <h6 className="text-dark_mode text-lg font-semibold">
              No collections found
            </h6>
            <span className="block mt-2 text-gray-300">
              We couldn’t find any of your collections.
            </span>
            <button
              type="button"
              className="mt-10 py-3 px-6 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
            >
              Create a collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
Gathering.Layout = GatheringLayout;
