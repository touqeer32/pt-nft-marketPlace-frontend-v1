import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
export default function TransactionMessage(probs) {
  var invisible =
    "inline-block absolute invisible z-10 w-72 bg-light_mode rounded-lg border border-gray-100 shadow-sm opacity-0 transition-opacity duration-300";
  var visible =
    "inline-block absolute visible z-10 w-72 bg-light_mode rounded-lg border border-gray-100 shadow-sm opacity-100 transition-opacity duration-300";
  return (
    <>
      <h6 className="mt-1 text-black-300 text-sm">
        {probs.check == "check" && (
          <FontAwesomeIcon
            icon={faCheckSquare}
            style={{ color: "green" }}
            className="fa-solid fa-xmark text-lg"
          />
        )}
        {probs.check == "xmark" && (
          <>
            {" "}
            <FontAwesomeIcon
              icon={faXmarkSquare}
              style={{ color: "red" }}
              className="fa-solid fa-xmark text-lg"
            />
            &nbsp;
          </>
        )}
        &nbsp; {probs.message}
      </h6>
    </>
  );
}
