import React, { useState, useEffect } from "react";

function TextArea(props) {
  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <label
            htmlFor="description"
            className="block mb-2 text-dark_mode text-sm font-semibold"
          >
            {props.displaValue}
          </label>
          <span className="text-gray-300 text-xs font-medium">
            {props.fieldValue.length} / 200
          </span>
        </div>
        <textarea
          name={props.displaValue}
          id={props.displaValue}
          rows="4"
          maxLength="200"
          onChange={(e) => props.setValue(e.target.value)}
          className="block resize-none p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60"
          placeholder={props.placeholder}
          // "Provide a detailed description of your item"
        ></textarea>
      </div>
    </>
  );
}
export default TextArea;
