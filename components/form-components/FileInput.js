import React, { useState } from "react";

export default function FileInput(props) {
  const [previewUrl, setPreviewUrl] = useState("");

  function fileChanged(e) {
    const file = e.target.files[0];
    props.setValue(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setPreviewUrl(e.target.result);
    };
  }

  return (
    <label
      htmlFor="banner-image-file"
      className="w-32 h-32 rounded-lg cursor-pointer"
    >
      {previewUrl || props.previewUrl ? (
        <img
          src={previewUrl ? previewUrl : props.previewUrl}
          className="block w-32 bg-no-repeat bg-cover rounded-lg border-4 border-solid border-gray-100 hover:scale-95 ease-out duration-300"
        />
      ) : (
        <span className="block w-32 h-32 bg-no-repeat bg-cover rounded-lg border-4 border-solid border-gray-100 hover:scale-95 ease-out duration-300"></span>
      )}

      <input
        type="file"
        name="banner_image_file"
        id="banner-image-file"
        onChange={($event) => fileChanged($event)}
        className="hidden"
      />
    </label>
  );
}
