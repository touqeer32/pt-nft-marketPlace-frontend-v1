import React from 'react'
import SettingLayout from "../../../components/layouts/SettingLayout";

export default function Wallet() {
  return (
    <div className="basis-5/12">
        <div className="p-8 border border-solid border-gray-200 rounded-lg">
          <figure>
            <img src="/trademarks/trademark-metamask.svg" alt="Trademark Metamask" className="w-[8rem]"/>
          </figure>
          <div className="flex items-end justify-between mt-10">
            <hgroup>
              <h6 className="text-dark_mode text-sm font-semibold">
                Ethereum
              </h6>
              <h5 className="text-gray-300 text-sm">
                0x2acAb3DEa77832C09420663b0E1cB386031bA17B
              </h5>
            </hgroup>
            <i className="fa-regular fa-copy text-gray-300 text-base hover:text-dark_mode cursor-pointer" data-tooltip-target="tooltip-animation" data-tooltip-placement="right" type="button">
            </i>
          </div>
          <div className="flex mt-6">
            <hgroup>
              <h6 className="text-dark_mode text-sm font-semibold">
                Wallet Balance
              </h6>
              <h4 className="text-success font-semibold">
                15 ETH
              </h4>
            </hgroup>
            <hgroup className="ml-16">
              <h6 className="text-dark_mode text-sm font-semibold">
                Marketplace Balance
              </h6>
              <h4 className="text-success font-semibold">
                99 ETH
              </h4>
            </hgroup>
          </div>
          <hr className="mt-4"/>
          <button type="button" className="block mt-4 text-error text-sm font-semibold relative left-0 hover:left-1 ease-out duration-300">
            Disconnect
          </button>
        </div>
        <button type="button" className="block py-3 px-8 mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300">
          Connect new Wallet
        </button>
      </div>
  )
}
Wallet.Layout=SettingLayout
