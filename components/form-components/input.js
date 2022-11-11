import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Input(props) {
  return (
    <>
      <div className="mt-10">
        <label
          htmlFor="name"
          className="block mb-2 text-dark_mode text-sm font-semibold"
        >
          {props.displaValue}
        </label>
        <input
          type={props.fieldType}
          name={props.displaValue}
          id={props.displaValue}
          value={props.defaultValues}
          onChange={(e) => props.setValue(e.target.value)}
          className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60"
          placeholder={props.placeholder}
          autoComplete="off"
          min={1}
          required={false}
        />
      </div>
    </>
  );
}
export default Input;
