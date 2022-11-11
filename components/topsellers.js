import React from "react";
import Link from "next/link";

export default function TopSellers() {
  return (
    // {# nft__top-sellers #}
    <section className="nft__top-sellers px-36 xl:max-w-full lg:container">
      <div className="flex items-center justify-between">
        <h5 className="text-dark_mode font-medium">Top sellers</h5>
        <ul
          className="flex flex-wrap p-1 text-dark_mode text-sm font-semibold text-center rounded-xl bg-gray-100/40"
          data-tabs-toggle="#tab-top-sellers"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              type="button"
              className="inline-block py-3 px-4 rounded-xl !text-dark_mode !bg-light_mode hover:bg-light_mode"
              id="tab-one-day-sellers"
              data-tabs-target="#one-day-sellers"
              role="tab"
              aria-controls="one-day"
              aria-selected="false"
            >
              1 day
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              type="button"
              className="inline-block py-3 px-4 rounded-xl !text-dark_mode hover:bg-light_mode"
              id="tab-seven-days-sellers"
              data-tabs-target="#seven-days-sellers"
              role="tab"
              aria-controls="seven-days"
              aria-selected="false"
            >
              7 days
            </button>
          </li>
          <li className="last:mr-0" role="presentation">
            <button
              type="button"
              className="inline-block py-3 px-4 rounded-xl !text-dark_mode hover:bg-light_mode"
              id="tab-thirty-days-sellers"
              data-tabs-target="#thirty-days-sellers"
              role="tab"
              aria-controls="thirty-days"
              aria-selected="false"
            >
              30 days
            </button>
          </li>
        </ul>
        <a href="#" className="underline text-sm hover:no-underline">
          View all
        </a>
      </div>

      <div id="#tab-top-sellers" className="mt-10">
        <div
          className="block"
          id="one-day-sellers"
          role="tabpanel"
          aria-labelledby="tab-one-day-sellers"
        >
          <div className="grid grid-rows-5 grid-flow-col gap-4">
            {/* {% for seller in sellers %} */}
            <div className="nft__card-seller flex flex-row items-center py-2 px-2 border border-solid border-gray-100 rounded-xl hover:bg-gray-100">
              <div>
                <span className="text-dark_mode text-sm font-semibold">1</span>
              </div>
              <figure className="flex flex-row items-center ml-4">
                <img
                  src="/avatars/avatar-1.jpg"
                  alt="Avatar 1"
                  className="w-14 h-14 rounded-full border-2 border-solid border-gray-100 object-cover"
                />
                <figcaption className="ml-4">
                  <span className="block text-dark_mode text-sm font-semibold">
                    Apocalypse Monkeys
                  </span>
                  <span className="block text-sm text-gray-300">
                    @apo_monkeys
                  </span>
                </figcaption>
              </figure>
              <div className="ml-12">
                <span className="block text-dark_mode text-sm font-semibold">
                  90.19 ETH
                </span>
                <span className="block text-sm text-nft_institutional">
                  111,237 $
                </span>
              </div>
            </div>

            {/* {% endfor %} */}
          </div>
        </div>
        <div
          className="hidden"
          id="seven-days-sellers"
          role="tabpanel"
          aria-labelledby="tab-seven-days-sellers"
        >
          <span>Tab content - Seven days</span>
        </div>
        <div
          className="hidden"
          id="thirty-days-sellers"
          role="tabpanel"
          aria-labelledby="tab-thirty-days-sellers"
        >
          <span>Tab content - Thirty days</span>
        </div>
      </div>
    </section>
    // {# nft__top-collections #}
  );
}
