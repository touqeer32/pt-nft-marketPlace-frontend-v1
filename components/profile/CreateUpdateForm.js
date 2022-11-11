import React, { useEffect, useState } from "react";
import { post } from "../../utils";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import FileInput from "../form-components/FileInput";

export default function createUpdateForm(props) {
  const [profileImage, setProfileImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...props.defaultValues,
    },
  });

  async function onSubmit(inputs) {
    if (props?.userAddress) {
      const formdData = new FormData();
      const keys = Object.keys(inputs);
      keys.forEach((value) => {
        formdData.append(value, inputs[value]);
      });
      formdData.append("image", profileImage);
      formdData.append("isColour", true);
      formdData.append("wallet", props?.userAddress);
      try {
        const response = await post("create-update-profile", formdData);
        toast.success("Profile Successfully Updated");
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <div className="flex flex-row">
      <div className="basis-7/12 pr-8">
        <form onSubmit={handleSubmit(onSubmit)} id="edit-profile">
          <div>
            <label
              htmlFor="display-name"
              className="block mb-2 text-dark_mode text-sm font-semibold"
            >
              Display Name*
            </label>
            <input
              type="text"
              name="display_name"
              {...register("name", { required: true })}
              id="display-name"
              className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              placeholder="Enter your display name"
              autoComplete="off"
              required
            />
          </div>
          <div className="mt-8">
            <label
              htmlFor="email-address"
              className="block mb-2 text-dark_mode text-sm font-semibold"
            >
              Email address
              <i
                type="button"
                data-popover-target="popover-email-address"
                data-popover-placement="bottom"
                className="fa-solid fa-circle-info ml-2 text-dark_mode text-base cursor-pointer hover:scale-110 ease-out duration-300"
              ></i>
            </label>
            <input
              type="text"
              name="email_address"
              id="email-address"
              {...register("email", { required: true })}
              className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              placeholder="Enter your email address"
              autoComplete="off"
              required
            />
          </div>
          <div className="mt-8">
            <label
              htmlFor="custom-url"
              className="block mb-2 text-dark_mode text-sm font-semibold"
            >
              Custom URL*
            </label>
            <div className="relative">
              <span className="inline-block text-dark_mode text-sm font-semibold absolute top-4 left-4">
                nft.pharmatrace.io/account/
              </span>
              <input
                type="text"
                name="custom_url"
                {...register("customURL")}
                id="custom-url"
                className="block py-4 pl-[215px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="Enter your custom URL"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bio"
                className="block mb-2 text-dark_mode text-sm font-semibold"
              >
                Bio
              </label>
              <span className="text-gray-300 text-xs font-medium">0 / 200</span>
            </div>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              {...register("about")}
              className="block resize-none p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              placeholder="Tell the world you story!"
            ></textarea>
          </div>
          <h6 className="w-[80%] mt-20 text-dark_mode text-lg font-semibold">
            Add links to your social media profiles.
          </h6>
          <div className="mt-10">
            <div className="relative">
              <label
                htmlFor="website-url"
                className="flex items-center text-dark_mode text-sm font-semibold absolute top-4 left-4"
              >
                <i className="fa-solid fa-globe text-dark_mode text-xl mr-2"></i>
                https://
              </label>
              <input
                type="text"
                name="website_url"
                {...register("websiteURL")}
                id="website-url"
                className="block py-4 pl-[100px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="Website URL"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <label
                htmlFor="facebook-url"
                className="flex items-center text-dark_mode text-sm font-semibold absolute top-4 left-4"
              >
                <i className="fa-brands fa-facebook text-dark_mode text-xl mr-2"></i>
                facebook.com/
              </label>
              <input
                type="text"
                name="facebook_url"
                id="facebook-url"
                {...register("facebookURL")}
                className="block py-4 pl-[151px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="Facebook Username"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <label
                htmlFor="twitter-url"
                className="flex items-center text-dark_mode text-sm font-semibold absolute top-4 left-4"
              >
                <i className="fa-brands fa-twitter text-dark_mode text-xl mr-2"></i>
                twitter.com/
              </label>
              <input
                type="text"
                name="twitter_url"
                id="twitter-url"
                {...register("twitterURL")}
                className="block py-4 pl-[132px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="Twitter Username"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <label
                htmlFor="instagram-url"
                className="flex items-center text-dark_mode text-sm font-semibold absolute top-4 left-4"
              >
                <i className="fa-brands fa-instagram text-dark_mode text-xl mr-2"></i>
                instagram.com/
              </label>
              <input
                type="text"
                name="instagram_url"
                id="instagram-url"
                {...register("instagramURL")}
                className="block py-4 pl-[154px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="Instagram Username"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <label
                htmlFor="tiktok-url"
                className="flex items-center text-dark_mode text-sm font-semibold absolute top-4 left-4"
              >
                <i className="fa-brands fa-tiktok text-dark_mode text-xl mr-2"></i>
                tiktok.com/
              </label>
              <input
                type="text"
                name="tiktok_url"
                id="tiktok-url"
                {...register("tiktokURL")}
                className="block py-4 pl-[124px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="TikTok Username"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <label
                htmlFor="youtube-url"
                className="flex items-center text-dark_mode text-sm font-semibold absolute top-4 left-4"
              >
                <i className="fa-brands fa-youtube text-dark_mode text-xl"></i>
              </label>
              <input
                type="text"
                name="youtube_url"
                id="youtube-url"
                {...register("youtubeURL")}
                className="block py-4 pl-[47px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                placeholder="Channel URL or video"
                autoComplete="off"
              />
            </div>
          </div>
          <button
            type="submit"
            className="block py-3 px-8 mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
          >
            Update profile
          </button>
          <h6 className="w-[80%] mt-20 text-dark_mode text-lg font-semibold">
            <span className="relative align-middle mr-3">
              <i className="fa-solid fa-certificate text-nft_institutional text-4xl"></i>
              <i className="fa-solid fa-check text-light_mode text-xl absolute top-[-6px] left-[8px]"></i>
            </span>
            Verify your profile
          </h6>
          <span className="block w-3/4 mt-3 text-gray-300 text-sm leading-relaxed">
            Show the NFT PharmaTrace community that your profile is authentic.
          </span>
          <div className="mt-6 status-not-verified">
            <span className="block text-gray-300 text-sm">Status:</span>
            <span className="inline-block mt-2 py-1 px-3 rounded-lg border border-solid border-error/50 text-error text-xs bg-error/20">
              Not verified
            </span>
          </div>
          <div className="mt-6 status-verified hidden">
            <span className="block text-gray-300 text-sm">
              Status: via Instagram on 24-10-2022 10:25:40
            </span>
            <span className="inline-block mt-2 py-1 px-3 rounded-lg border border-solid border-success/50 text-success text-xs bg-success/20">
              Verified
            </span>
          </div>
          <div className="flex mt-10">
            <button
              type="button"
              className="min-h-[44px] py-2 px-5 mr-4 flex items-center justify-center rounded-full border border-solid border-gray-200 bg-light_mode text-dark_mode text-sm font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 active:scale-[0.94] ease-out duration-300"
            >
              <i className="fa-brands fa-twitter mr-3 text-lg"></i>
              Verify via Twitter
            </button>
            <button
              type="button"
              className="min-h-[44px] py-2 px-5 mr-4 flex items-center justify-center rounded-full border border-solid border-gray-200 bg-light_mode text-dark_mode text-sm font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 active:scale-[0.94] ease-out duration-300"
            >
              <i className="fa-brands fa-instagram mr-3 text-xl"></i>
              Verify via Instagram
            </button>
          </div>
        </form>
      </div>
      <div className="basis-4/12 ml-[8.333333%]">
        <div className="sticky top-36">
          <div>
            <span className="block mb-4 text-dark_mode text-sm font-semibold">
              Profile Image
            </span>
            <FileInput
              previewUrl={props.defaultValues?.image}
              setValue={setProfileImage}
            />
            <span className="block w-3/4 mt-3 text-gray-300 text-sm leading-relaxed">
              Recommended size: 500x500px
              <br />
              Type: JPG, PNG, or GIF
              <br />
              Max size: 8MB
            </span>
          </div>
          <div className="mt-14">
            <span className="block mb-4 text-dark_mode text-sm font-semibold">
              Banner Image
            </span>

            <span className="block w-3/4 mt-3 text-gray-300 text-sm leading-relaxed">
              Recommended size: 1500x1500px
              <br />
              Type: JPG, PNG, or GIF
              <br />
              Max size: 8MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
