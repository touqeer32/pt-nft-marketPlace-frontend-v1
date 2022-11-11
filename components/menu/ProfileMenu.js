import {
  faArrowUp,
  faCertificate,
  faCheck,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";

export default function ProfileMenu({ show, profile }) {
  return (
    <div
      data-popover
      id="popover-account-profile"
      role="tooltip"
      className={`!ml-[-15px] m-0 fixed top-20 right-10 inline-block transition-opacity duration-100 ${
        show ? "" : "invisible opacity-0"
      } z-10 w-64 bg-white rounded-lg border border-solid border-gray-100 shadow-sm `}
    >
      <div className="p-6">
        <figure className="flex flex-row items-center relative">
          <Link href="/account/">
            <img
              src={profile?.image ? profile?.image : "/avatars/avatar-10.jpg"}
              alt="Avatar 10"
              className="w-16 h-16 rounded-full border-2 border-solid border-gray-100 object-cover"
            />
          </Link>

          <figcaption className="ml-4">
            <span className="absolute top-[2px] left-[32px] align-middle ml-2">
              <FontAwesomeIcon
                icon={faCertificate}
                className="fa-solid fa-certificate text-nft_institutional text-xl"
              />
              <FontAwesomeIcon
                icon={faCheck}
                className="fa-solid fa-check text-light_mode text-sm absolute top-[1px] left-[3px]"
              />
            </span>
            <span className="block text-dark_mode text-base font-semibold">
              {profile?.name}
            </span>
            <span className="block text-sm text-gray-300">
              @{profile?.name}
            </span>
          </figcaption>
        </figure>
        <nav className="nft_profile_nav mt-10 space-y-2 flex flex-col">
          <Link href="/account/profile">
            <span className="cursor-pointer flex items-center justify-between text-dark_mode text-base font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300">
              Profile
              <FontAwesomeIcon
                icon={faArrowUp}
                className="ml-1 fa-solid fa-arrow-up-right-from-square"
              />
            </span>
          </Link>
          <Link href="/account/activity">
            <span className="cursor-pointer block text-dark_mode text-base font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300">
              Activity
            </span>
          </Link>
          <Link href="/account/gathering">
            <span className="cursor-pointer block text-dark_mode text-base font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300">
              Gathering
            </span>
          </Link>
          <Link href="/account/settings/wallet">
            <span className="cursor-pointer block text-dark_mode text-base font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300">
              Account settings
            </span>
          </Link>
          <a
            href="#"
            className="cursor-pointer block text-dark_mode text-base font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300"
          >
            Help Center
          </a>
        </nav>
        <span className="block mt-10 text-dark_mode text-xs font-semibold">
          Connected Wallet
        </span>
        <div className="mt-2 py-6 px-4 border border-solid border-gray-200 rounded-lg">
          <figure>
            <img
              src="/trademarks/trademark-metamask.svg"
              alt="Trademark Metamask"
              className="w-[7rem]"
            />
          </figure>
          <div className="flex items-end justify-between mt-6">
            <hgroup>
              <h5 className="text-dark_mode text-sm font-semibold">Ethereum</h5>
              <h6 className="mt-1 text-gray-300 text-xs">0x2acAb3…31bA17B</h6>
            </hgroup>
            <FontAwesomeIcon
              icon={faCopy}
              className="fa-regular fa-copy text-gray-300 text-sm hover:text-dark_mode cursor-pointer"
              data-tooltip-target="tooltip-animation"
              data-tooltip-placement="right"
              type="button"
            />
          </div>
          <div className="flex flex-col mt-6">
            <hgroup>
              <h5 className="text-dark_mode text-sm font-semibold">
                Wallet Balance
              </h5>
              <h4 className="mt-1 text-success text-sm font-semibold">
                15 ETH
              </h4>
            </hgroup>
            <hgroup className="mt-4">
              <h5 className="text-dark_mode text-sm font-semibold">
                Marketplace Balance
              </h5>
              <h4 className="mt-1 text-success text-sm font-semibold">
                99 ETH
              </h4>
            </hgroup>
          </div>
          <hr className="mt-3" />
          <button
            type="button"
            className="block mt-3 text-error text-xs font-semibold relative left-0 hover:left-1 ease-out duration-300"
          >
            Disconnect
          </button>
        </div>
      </div>
      <div data-popper-arrow className="!ml-[15px]"></div>
    </div>
  );
}
