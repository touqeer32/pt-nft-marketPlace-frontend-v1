import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Banner() {
  const [show, setShow] = useState(null);
  const router = useRouter();
  return (
    // {# nft__page #}
    <section className="nft__hero min-h-[600px] px-36 xl:max-w-full lg:container">
      <div className="flex flex-row gap-4 items-center h-full relative top-[-40px]">
        <div className="basis-5/12">
          <h1 className="text-dark_mode font-bold">
            Discover
            <br />
            <span className="text-pt_institutional underline decoration-4">
              Digital Art
            </span>{" "}
            and
            <br />
            Collect NFTs
          </h1>
          <div className="flex flex-row items-center mt-16">
            <a
              href="/explore"
              type="button"
              className="py-4 px-6 rounded-full bg-nft_institutional text-light_mode text-sm font-medium"
            >
              Explore the World
            </a>
            <div className="flex -space-x-4 ml-8">
              {/* {% for alt, src in site.data.avatars %} */}
              <img
                src="/avatars/avatar-1.jpg"
                alt="{{ alt }}"
                className="w-12 h-12 rounded-full border-2 border-solid border-gray-100 shadow-lg object-cover"
              />
              {/* {% endfor %} */}
            </div>
            <div className="ml-4">
              <span className="block text-sm font-bold">10+</span>
              <span className="block text-sm text-gray-300">
                The best NFT artists
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center mt-10">
            <hgroup>
              <h4 className="text-dark_mode font-bold">190K+</h4>
              <h6 className="text-gray-300 text-sm ml-1">NFTS Minted</h6>
            </hgroup>
            <hgroup className="ml-10">
              <h4 className="text-dark_mode font-bold">22M+</h4>
              <h6 className="text-gray-300 text-sm ml-1">Trading Volume</h6>
            </hgroup>
          </div>
        </div>
        <div className="basis-7/12">
          <div className="nft__hero-figures relative w-full h-[700px]">
            <figure className="-1 z-10 relative">
              <img
                src="homepage/hero/top-dashed-line.svg"
                alt="Top dashed line"
                className="max-h-[16rem] object-cover absolute top-[80px] left-0"
              />
            </figure>
            <figure className="z-30 relative">
              <img
                src="homepage/hero/hero-card-1.png"
                alt="Hero card 1"
                className="max-h-[30rem] object-cover absolute top-[140px] left-[160px]"
              />
            </figure>
            <figure className="z-20 relative">
              <img
                src="homepage/hero/hero-card-2.png"
                alt="Hero card 2"
                className="max-h-[24rem] object-cover absolute top-[110px] left-[360px]"
              />
            </figure>
            <figure className="z-10 relative">
              <img
                src="homepage/hero/bottom-dashed-line.svg"
                alt="Bottom dashed line"
                className="max-h-[21rem] object-cover absolute top-[300px] left-[50px]"
              />
            </figure>
            <figure className="z-20 relative">
              <img
                src="homepage/hero/hero-category-art.svg"
                alt="Icon category Art"
                className="h-24 object-cover absolute top-[70px] left-[70px]"
              />
            </figure>
            <figure className="z-20 relative">
              <img
                src="homepage/hero/hero-category-sport.svg"
                alt="Icon category Sport"
                className="h-24 object-cover absolute top-[110px] left-[660px]"
              />
            </figure>
            <figure className="z-20 relative">
              <img
                src="homepage/hero/hero-category-utility.svg"
                alt="Icon category Utility"
                className="h-24 object-cover absolute top-[315px] left-[80px]"
              />
            </figure>
            <figure className="z-20 relative">
              <img
                src="homepage/hero/hero-category-photo.svg"
                alt="Icon category Photo"
                className="h-24 object-cover absolute top-[520px] left-[20px]"
              />
            </figure>
            <figure className="z-20 relative">
              <img
                src="homepage/hero/hero-category-music.svg"
                alt="Icon category Music"
                className="h-24 object-cover absolute top-[530px] left-[600px]"
              />
            </figure>
          </div>
        </div>
      </div>
      <div className="nft__bar-corporate-trademarks w-full flex items-center justify-center absolute left-0 bottom-8">
        <img
          src="trademarks/trademark-metamask.svg"
          alt="Trademark Metamask"
          className="w-[10rem]"
        />
        <img
          src="trademarks/trademark-coinbase.svg"
          alt="Trademark Coinbase"
          className="w-[10rem] ml-20"
        />
        <img
          src="trademarks/trademark-walletconnect.svg"
          alt="Trademark WalletConnect"
          className="w-[10rem] ml-20"
        />
        <img
          src="trademarks/trademark-fortmatic.svg"
          alt="Trademark Fortmatic"
          className="w-[10rem] ml-20"
        />
      </div>
    </section>
  );
}
