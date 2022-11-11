import React from 'react'
import { useRouter } from "next/router";
import {
  faBagShopping,
  faWallet,
  faBoxOpen,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardsFooter = () => {
  return (
    <section className="nft__steps-to-start px-36 mt-36 xl:max-w-full lg:container relative">
      <div className="flex flex-row items-center p-16 rounded-xl bg-gray-300/20">
        <div className="basis-5/12">
          <hgroup>
            <h4 className="text-dark_mode font-medium">
              Start your &nbsp;
              <span className="underline text-pt_institutional">
                own collection
              </span>
              <br />
              today and sell your NFTs.
            </h4>
            <h6 className="mt-4 text-gray-300 text-sm">
              Mint for free | Earn $MINT | Instant payments
            </h6>
          </hgroup>
        </div>
        <div className="basis-7/12">
          <div className="flex flex-row items-center gap-x-14">
            <div className="basis-6/12">
              <div className="flex items-center">
                <span className="block p-5 rounded-xl bg-light_mode">
                  <FontAwesomeIcon
                    icon={faWallet}
                    className="fa-solid fa-wallet text-nft_institutional text-2xl"
                  />
                  <i className="fa-solid fa-wallet text-nft_institutional text-2xl"></i>
                </span>
                <h6 className="ml-6 text-dark-mode text-lg font-medium">
                  Set up your wallet
                </h6>
              </div>
              <p className="mt-6 text-dark_mode/90 text-sm leading-loose">
                Once you’ve set up your wallet of choice, connect it to
                PharmaTrace by clicking the wallet icon in the top right corner.
                Learn about the wallets we support.
              </p>
            </div>
            <div className="basis-6/12">
              <div className="flex items-center">
                <span className="block p-5 rounded-xl bg-light_mode">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="fa-solid fa-box-open text-nft_institutional text-2xl"
                  />
                </span>
                <h6 className="ml-6 text-dark-mode text-lg font-medium">
                  Create your collection
                </h6>
              </div>
              <p className="mt-6 text-dark_mode/90 text-sm leading-loose">
                Click My Collections and set up your collection. Add social
                links, a description, profile & banner images, and set a
                secondary sales fee.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-14 mt-14">
            <div className="basis-6/12">
              <div className="flex items-center">
                <span className="block p-5 rounded-xl bg-light_mode">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="fa-solid fa-box-open text-nft_institutional text-2xl"
                  />
                </span>
                <h6 className="ml-6 text-dark-mode text-lg font-medium">
                  Add your NFTs
                </h6>
              </div>
              <p className="mt-6 text-dark_mode/90 text-sm leading-loose">
                Upload your work (image, video, audio, or 3D art), add a title
                and description, and customize your NFTs with properties, stats,
                and unlockable content.
              </p>
            </div>
            <div className="basis-6/12">
              <div className="flex items-center">
                <span className="block p-5 rounded-xl bg-light_mode">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="fa-solid fa-bag-shopping text-nft_institutional text-2xl"
                  />
                  {/* <i className="fa-solid fa-bag-shopping text-nft_institutional text-2xl"></i> */}
                </span>
                <h6 className="ml-6 text-dark-mode text-lg font-medium">
                  List Them for Sale
                </h6>
              </div>
              <p className="mt-6 text-dark_mode/90 text-sm leading-loose">
                Choose between auctions, fixed-price listings, and
                declining-price listings. You choose how you want to sell your
                NFTs, and we help you sell them!
              </p>
            </div>
          </div>
        </div>
      </div>
      <figure className="absolute bottom-[10px] left-[-90px]">
        <img
          src="https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/633d8bd5779ed71cca580dc6_dotted-line-fingerprint.svg"
          alt="Illustration - Dotted line with fingerprint blot"
          className="w-6/12"
        />
      </figure>
    </section>
  )
}

export default CardsFooter
