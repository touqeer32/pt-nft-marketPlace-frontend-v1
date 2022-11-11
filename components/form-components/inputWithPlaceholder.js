import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function InputPlaceholder(probs) {
  return (
    <>
      <div className={probs.divClass}>
        {probs.heading && (
          <label
            htmlFor="custom-url"
            className="block mb-2 text-dark_mode text-sm font-semibold"
          >
            {probs.heading}
          </label>
        )}
        <div className="relative">
          <label className="inline-block text-dark_mode text-sm font-semibold absolute top-4 left-4">
            {probs.icon && (
              <FontAwesomeIcon
                icon={probs.icon}
                className="fa-solid fa-globe pl-[5px] text-dark_mode text-xl mr-2"
                data-popover-target="popover-percentage-fee"
                data-popover-placement="bottom"
                type="button"
              />
            )}{" "}
            {probs.lablePlaceholder && <>{probs.lablePlaceholder}&nbsp;</>}
          </label>
          <input
            type={probs.fieldType}
            name={probs.displaValue}
            id={probs.displaValue}
            value={probs.displaValue}
            onChange={(e) => probs.setValue(e.target.value)}
            className={probs.Inputclass}
            placeholder={probs.inputfieldPlaceholder}
            required={probs.isRequired}
            autoComplete={probs.isAutoComplete}
            readOnly={probs.isReadOnly}
          />
        </div>
      </div>
    </>
  );
}
export default InputPlaceholder;
