import React from "react";

export default function PopUpInfo(probs) {
  var invisible =
    "inline-block absolute invisible z-10 w-72 bg-light_mode rounded-lg border border-gray-100 shadow-sm opacity-0 transition-opacity duration-300";
  var visible =
    "inline-block absolute visible z-10 w-72 bg-light_mode rounded-lg border border-gray-100 shadow-sm opacity-100 transition-opacity duration-300";
  return (
    <>
      <div
        data-popover
        id="popover-erc-721"
        role="tooltip"
        className={probs.popup ? visible : invisible}
      >
        <div className="p-6">
          <h6 className="text-dark_mode text-base font-semibold">
            {probs.title} {/* Token – ERC-721 */}
          </h6>
          <p className="mt-2 text-gray-300 text-sm leading-relaxed">
            {probs.description}{" "}
            {/* The ERC-721 introduces a standard for NFT, in other words, this type
            of Token is unique and can have different value than another Token
            from the same Smart Contract, maybe due to its age, rarity or even
            something else like its visual. */}
          </p>
        </div>
        <div data-popper-arrow></div>
      </div>
    </>
  );
}
