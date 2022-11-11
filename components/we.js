import React from "react";

export default function We() {
  return (
    // {# nft__who-we-are #}
    <section className="nft__who-we-are px-36 xl:max-w-full lg:container">
      <div className="flex flex-row gap-4">
        <div className="basis-7/12 mt-28">
          <span className="text-nft_institutional text-lg">Who we are</span>
          <h4 className="mt-10 text-dark_mode font-semibold">
            The world’s first and largest digital marketplace for crypto
            collectables and non-fungible tokens (NFTs).
          </h4>
        </div>
        <div className="basis-5/12">
          <figure>
            <img
              src="homepage/dotted-line.svg"
              alt="Illustration - Dotted line"
              className="w-4/5 ml-20"
            />
          </figure>
        </div>
      </div>
      <div className="nft__scroll-left-text absolute -right-[250px]">
        <span className="text-gray-100 text-big font-bold leading-none">
          This is our mission
        </span>
      </div>
      <figure className="flex justify-end mt-44">
        <img
          src="commons/fingerprint-blot.svg"
          alt="Illustration - Fingerprint blot - Who we are"
          className="w-44"
        />
      </figure>
      <div className="flex flex-row items-center gap-4 mt-10">
        <div className="basis-6/12">
          <figure className="ml-14">
            <img
              src="homepage/illustration-mission.svg"
              alt="Illustration mission"
              className="w-full"
            />
          </figure>
        </div>
        <div className="basis-6/12">
          <div className="flex flex-col ml-10">
            <div className="group py-4 px-6 rounded-xl bg-light_mode hover:bg-pt_institutional/20">
              <h6 className="text-dark_mode text-lg font-semibold group-hover:text-pt_institutional">
                Authentic
              </h6>
              <p className="mt-2 text-gray-300 text-md leading-relaxed group-hover:text-dark_mode">
                Every digital creation on MakersPlace is digitally signed by the
                creator and permanently recorded and verified through the
                blockchain.
              </p>
            </div>
            <div className="group py-4 px-6 mt-4 ml-12 rounded-xl bg-light_mode hover:bg-pt_institutional/20">
              <h6 className="text-dark_mode text-lg font-semibold group-hover:text-pt_institutional">
                Unique
              </h6>
              <p className="mt-2 text-gray-300 text-md leading-relaxed group-hover:text-dark_mode">
                Every digital creation is issued as a unique digital edition,
                using blockchain technology a creator can ensure that only a
                limited number of authentic editions can be owned, ensuring and
                uniqueness.
              </p>
            </div>
            <div className="group py-4 px-6 mt-4 rounded-xl bg-light_mode hover:bg-pt_institutional/20">
              <h6 className="text-dark_mode text-lg font-semibold group-hover:text-pt_institutional">
                Ownable
              </h6>
              <p className="mt-2 text-gray-300 text-md leading-relaxed group-hover:text-dark_mode">
                Purchasing a unique digital creation means you’re given full
                ownership over the creation, which is then transferred and
                stored in your digital wallet for safe-keeping.
              </p>
            </div>
          </div>
        </div>
      </div>
      <figure className="relative min-h-[400px]">
        <img
          src="homepage/dotted-line-fingerprint.svg"
          alt="Illustration - Dotted line with fingerprint blot"
          className="w-9/12 absolute top-[-250px] left-[-220px]"
        />
      </figure>
    </section>
    // {/* {# nft__top-sellers #} */}
  );
}
