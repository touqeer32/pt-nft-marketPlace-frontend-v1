import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Select({
  label,
  displaylabel,
  displaValue,
  defaultValues,
  setIndex,
  setValue,
  defaultMessage,
  defaultValuesSelector,
  ...rest
}) {
  return (
    <>
      <div className="nft__select-box mt-8 block w-full relative my-0 mx-auto">
        <label className="block mb-2 text-dark_mode text-sm font-semibold">
          {label}
          <i className="fa-solid fa-circle-info ml-2 text-dark_mode text-base"></i>
        </label>
        <div className="nft__select-box--current" tabIndex="1">
          {/* {% htmlFor category in selectCategories %} */}
          <div className="nft__select-box--value flex">
            {/* <input className="nft__select-box--input" type="radio" name="category" id="category-{{ loop.index }}" value="{{ category | lower }}" {% if loop.first %} checked="checked" {% endif %} /> */}
            <input
              className="nft__select-box--input"
              type="radio"
              name={displaylabel}
              key={1}
              // id={category.name}
              // value={category.name}
              checked="checked"
              readOnly
              {...rest}
            />

            <p className="nft__select-box--input-text p-4 w-full text-dark_mode text-sm font-medium bg-gray-300/20 rounded-lg border border-solid border-transparent focus:border-gray-300/60">
              {displaValue}
            </p>
          </div>
          <FontAwesomeIcon
            icon={faAngleDown}
            className="nft__select-box--icon fa-solid fa-angle-down absolute top-[50%] right-[15px] text-gray-300"
          />
        </div>
        <ul className="nft__select-box--list absolute z-10 w-full p-0 list-none mt-2 bg-light_mode rounded-lg border border-solid border-gray-100/60">
          {/* {% htmlFor category in selectCategories %} */}
          {defaultValues.length > 0 &&
            defaultValues.map((defaultValues, index) => (
              <li
                key={defaultValues.name}
                className="rounded-lg bg-light_mode hover:bg-gray-100/40"
              >
                <option
                  onClick={(e) => {
                    // console.log("e.target.value", e.target);
                    if (e.target.value != defaultMessage) {
                      setIndex(index);
                      setValue(e.target.value);
                    }
                  }}
                  name="test"
                  key={defaultValues.name}
                  value={defaultValues[defaultValuesSelector]}
                  className="nft__select-box--option p-4 text-dark_mode text-sm font-medium"
                  htmlFor={index}
                  aria-hidden="true"
                >
                  {defaultValues.name}
                </option>
              </li>
            ))}

          {/* {% endfor %} */}
        </ul>
      </div>
    </>
  );
}
export default Select;
