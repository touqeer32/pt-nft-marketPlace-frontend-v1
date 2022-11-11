import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function FileInputv2({
  setValue,
  setPreview,
  supportedFiles,
  index,
  notByIndex
}) {
  function fileChanged(e) {
    const file = e.target.files[0];
    if(notByIndex){
      setValue(file);
    }else{
      setValue(index, "image", file);
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      if(notByIndex){
        setPreview(e.target.result);
      }else{
        setPreview(index, "preview", e.target.result);
      }
    };
  }

  return (
    <div>
      <span className="block mb-2 text-dark_mode text-sm font-semibold">
        Image, Video or Audio file*
      </span>
      <label
        for={"nft-image-file-" + index}
        className="flex flex-col justify-center items-center w-full h-64 rounded-lg border border-gray-300 border-dashed bg-gray-100/50 hover:bg-gray-100 cursor-pointer"
      >
        <span className="flex flex-col justify-center items-center pt-5 pb-6">
          <FontAwesomeIcon
            icon={faCloudUpload}
            className="fa-solid fa-cloud-arrow-up text-nft_institutional text-6xl"
          />
          <span className="block mt-3 text-dark_mode text-base font-semibold">
            Select a file to upload
          </span>
          <span className="block text-gray-300 text-sm">max size: 100 MB</span>
        </span>
        <input
          type="file"
          onChange={($event) => fileChanged($event)}
          name="nft_image_file_1"
          id={"nft-image-file-" + index}
          className="hidden"
        />
      </label>
      <span className="block w-3/4 mt-3 text-gray-300 text-sm leading-relaxed">
        File types supported: {supportedFiles}.<br />
      </span>
    </div>
  );
}
