import React, { useState } from "react";

export default function WalletDetail() {
  return (
    <div className="p-32">
      <h1 className="text-5xl font-bold">Connect Your Wallet</h1>
      <br />
      <br />
      <br />
      <br />
      <div className="lg:grid grid-cols-4 gap-4">
        {/* Coinbase Wallet */}
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-end px-4 pt-4">
            <div
              id="dropdown"
              className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="mb-3 w-28 h-28 rounded-full shadow-lg"
              src="/coinbase.png"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Coinbase Wallet
            </span>
            <div className="flex mt-4 space-x-3 lg:mt-6">
              <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* Metamask */}
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-end px-4 pt-4">
            <div
              id="dropdown"
              className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="mb-3 w-28 h-28 rounded-full shadow-lg"
              src="/coinbase.png"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Metamask Wallet
            </span>
            <div className="flex mt-4 space-x-3 lg:mt-6">
              <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* Wallet Connect */}
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-end px-4 pt-4">
            <div
              id="dropdown"
              className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="mb-3 w-28 h-28 rounded-full shadow-lg"
              src="/coinbase.png"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              WalletConnect Wallet
            </span>
            <div className="flex mt-4 space-x-3 lg:mt-6">
              <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* Other wallets */}
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-end px-4 pt-4">
            <div
              id="dropdown"
              className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Export Data
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="mb-3 w-28 h-28 rounded-full shadow-lg"
              src="/coinbase.png"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Bonnie Green
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Other Wallet
            </span>
            <div className="flex mt-4 space-x-3 lg:mt-6">
              <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-lime-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
