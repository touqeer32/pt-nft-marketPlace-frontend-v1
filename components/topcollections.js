import React from "react";

export default function TopCollection() {
  return (
    // {# nft__top-collections #}
    <section className="nft__top-collections px-36 mt-36 xl:max-w-full lg:container">
      <div className="flex items-center justify-between">
        <h5 className="text-dark_mode font-medium">Top collections</h5>
        <a href="#" className="underline text-sm hover:no-underline">
          View all
        </a>
      </div>
      <div className="flex flex-nowrap gap-4 mt-10">
        {/* {% for collection in collections %} */}
        <div className="basis-3/12 ">
          <div className="nft__card_collection py-4 px-4 border border-solid border-gray-100 rounded-xl hover:bg-gray-100">
            <div className="grid grid-rows-4 grid-flow-col gap-x-4">
              <figure className="row-span-4 col-span-2">
                <img
                  src="/collections/doodle-1.jpg"
                  alt="Doodle 1"
                  className="w-full h-[280px] rounded-lg object-cover"
                />
              </figure>
              <figure className="row-span-2 self-start">
                <img
                  src="/collections/doodle-2.jpg"
                  alt="Doodle 2"
                  className="w-full h-[133px] rounded-lg object-cover"
                />
              </figure>
              <figure className="row-span-2 self-end">
                <img
                  src="/collections/doodle-3.jpg"
                  alt="Doodle 3"
                  className="w-full h-[133px] rounded-lg object-cover"
                />
              </figure>
            </div>
            <div className="mt-4">
              <span className="block text-dark_mode font-semibold">Doodle</span>
              <span className="block text-sm text-gray-300">
                Floor price: 19.02 ETH
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="block text-dark_mode text-sm font-semibold">
                512.57 ETH
              </span>
              <span className="block text-xs text-error font-medium">
                -29.07%
              </span>
            </div>
          </div>
        </div>
        {/* {% endfor %} */}
      </div>
    </section>
    // {# nft__recent-bids #}
  );
}
