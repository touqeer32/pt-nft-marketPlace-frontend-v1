import React from "react";

export default function PopoverPercentageFee() {
  return (
    <div
      data-popover
      id="popover-percentage-fee"
      role="tooltip"
      className="inline-block absolute invisible z-10 w-72 bg-light_mode rounded-lg border border-gray-100 shadow-sm opacity-0 transition-opacity duration-300"
    >
      <div className="p-6">
        <h6 className="text-dark_mode text-base font-semibold">
          Types of fees
        </h6>
        <p className="mt-2 text-gray-300 text-sm leading-relaxed">
          When orders are created, we include those fees into the order. That
          means a fee for PharmaTrace, and another 2.5% royalty for the
          collection creator.
        </p>
      </div>
      <div data-popper-arrow></div>
    </div>
  );
}
