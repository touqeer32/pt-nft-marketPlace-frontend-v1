import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import HomeLayout from "../../components/layouts/HomeLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faGlobe,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import InputPlaceholder from "../../components/form-components/inputWithPlaceholder";
import Input from "../../components/form-components/input";
import TextArea from "../../components/form-components/textArea";
import PopUpInfo from "../../components/info/popUpInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Router from "next/router";
import { create } from "ipfs-http-client";
import { get, put, post } from "../../utils";
import {
  PTNFT_MARKETPLACE,
  INFURA_IPFS_PROJECJECT_ID,
  INFURA_IPFS_PROJECJECT_SECRET,
  INFURA_URL,
  INFURA_GATEWAY_URL,
} from "../../config";

const projectIdAndSecret = `${INFURA_IPFS_PROJECJECT_ID}:${INFURA_IPFS_PROJECJECT_SECRET}`;
// console.log("projectIdAndSecret==>", projectIdAndSecret);
const client = create({
  host: INFURA_URL,
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

export default function CreateSingleNft(props) {
  const [ercPopup, setErcPopup] = useState(false);
  const [collectionImage, setCollectionImage] = useState();
  const [collectionImageView, setCollectionImageView] = useState(
    "https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/634eb5fb71476fd2a7c2081d_gradient-image.png"
  );
  const [collectionbannerImage, setCollectionBannerImage] = useState();
  const [collectionBannerImageView, setCollectionBannerImageView] = useState(
    "https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/634eb5fb71476fd2a7c2081d_gradient-image.png"
  );
  const [collectionName, setCollectionName] = useState("");
  const [description, setDescription] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [websiteUrl, setWebsitUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [facebookUrl, setfacebookUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  async function onSetCollectionImage(e) {
    const file = e.target.files[0];
    setCollectionImage(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      setCollectionImageView(e.target.result);
    };
  }
  async function onSetCollectionBannerImage(e) {
    const file = e.target.files[0];
    setCollectionBannerImage(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      setCollectionBannerImageView(e.target.result);
    };
  }
  async function onSubmit() {
    // // // createSale("url");
    if (!props.walletConnected || props.userAddress == "") {
      toast.error("Please Connect to your wallet First");
      return;
    }
    if (!props.isOnGoerli) {
      toast.error("Please Change your network to Goerli");
      return;
    }
    var collectionImageIPfsUrl;

    if (!collectionImage) {
      collectionImageIPfsUrl = collectionImageView;
    } else {
      try {
        setLoading(true);
        const added = await client.add(collectionImage);
        collectionImageIPfsUrl = `${INFURA_GATEWAY_URL}${added.path}`;
        // setIpfs(url);
      } catch (error) {
        toast.error("Error in IPFS Node");
        return;
      }
    }
    var collectionBannerImageIPfsUrl;
    if (!collectionbannerImage) {
      collectionBannerImageIPfsUrl = collectionBannerImageView;
    } else {
      try {
        setLoading(true);
        const added = await client.add(collectionbannerImage);
        collectionBannerImageIPfsUrl = `${INFURA_GATEWAY_URL}${added.path}`;
        // setIpfs(url);
      } catch (error) {
        toast.error("Error in IPFS Node");
        return;
      }
    }

    try {
      var response = await post("create-collection", {
        address: PTNFT_MARKETPLACE,
        name: collectionName,
        description: description,
        image: collectionImageIPfsUrl,
        banner: collectionBannerImageIPfsUrl,
        customURL: customUrl,
        websiteURL: websiteUrl,
        facebookURL: facebookUrl,
        twitterURL: twitterUrl,
        instagramURL: instagramUrl,
        tiktokURL: tiktokUrl,
        youtubeURL: youtubeUrl,
      });
      toast.success("Successfully Collection");
      await new Promise((r) => setTimeout(r, 2000));

      Router.push("/");
      // createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <section className="nft__create-collection mt-36 px-36 xl:max-w-full lg:container">
      <div className="ml-[25%] basis-9/12 pl-4">
        <hgroup>
          <h4 className="text-dark_mode font-semibold">Create Collection</h4>
          <h6 className="w-[50%] mt-10 text-dark_mode text-lg font-semibold">
            Collection Type ERC-721&nbsp;
            <FontAwesomeIcon
              icon={faCircleInfo}
              onMouseEnter={() => {
                setErcPopup(true);
              }}
              onMouseLeave={() => setErcPopup(false)}
              className="fa-solid fa-circle-info ml-2 text-dark_mode text-base cursor-pointer hover:scale-110 ease-out duration-300"
              data-popover-target="popover-erc-721"
              data-popover-placement="bottom"
              type="button"
            />
          </h6>
          <PopUpInfo
            popup={ercPopup}
            title={"Token – ERC-721"}
            description={
              "The ERC-721 introduces a standard for NFT, in other words, this type of Token is unique and can have different value than another Token from the same Smart Contract, maybe due to its age, rarity or even something else like its visual."
            }
          />
        </hgroup>
      </div>
      <div className="flex flex-row gap-4 mt-10 ml-[25%] pl-4">
        <div className="basis-6/12">
          <form id="create-collection" onSubmit={handleSubmit(onSubmit)}>
            <Input
              defaultValues={collectionName}
              setValue={setCollectionName}
              fieldType={"text"}
              displaValue={"Name*"}
              placeholder={"Enter item name"}
            />
            <TextArea
              setValue={setDescription}
              displaValue={"Description*"}
              fieldValue={description}
              placeholder={"Provide a detailed description of your item"}
            />
            <InputPlaceholder
              divClass={"mt-8"}
              heading={"Custom URL*"}
              icon={""}
              lablePlaceholder={"nft.pharmatrace.io/collection /"}
              fieldType={"url"}
              displaValue={collectionName}
              setValue={setCustomUrl}
              Inputclass={
                "block py-4 pl-[225px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"Enter your custom URL"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={true}
            />

            <div className="mt-8 flex items-center justify-between">
              <span className="block mb-2 text-dark_mode text-sm font-semibold">
                Explicit & Sensitive Content
                <span className="block text-gray-300 leading-relaxed font-normal">
                  Set this item as explicit and sensitive content.
                </span>
              </span>
              <label
                htmlFor="explicit-content"
                className="inline-flex relative items-center mr-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="explicit-content"
                  className="sr-only peer"
                />
                <span className="w-11 h-6 bg-gray-300/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nft_institutional"></span>
              </label>
            </div>
            <h6 className="w-[80%] mt-20 text-dark_mode text-lg font-semibold">
              Add links to your social media profiles.
            </h6>
            <InputPlaceholder
              divClass={"mt-10"}
              heading={""}
              icon={faGlobe}
              lablePlaceholder={"https: //"}
              fieldType={"url"}
              displaValue={websiteUrl}
              setValue={setWebsitUrl}
              Inputclass={
                "block py-4 pl-[105px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"Website URL"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={false}
            />
            <InputPlaceholder
              divClass={"mt-4"}
              heading={""}
              icon={faFacebook}
              lablePlaceholder={"facebook.com /"}
              fieldType={"url"}
              displaValue={facebookUrl}
              setValue={setfacebookUrl}
              Inputclass={
                "block py-4 pl-[160px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"Facebook Username"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={false}
            />

            <InputPlaceholder
              divClass={"mt-4"}
              heading={""}
              icon={faTwitter}
              lablePlaceholder={"twitter.com /"}
              fieldType={"url"}
              displaValue={twitterUrl}
              setValue={setTwitterUrl}
              Inputclass={
                "block py-4 pl-[140px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"Twitter Username"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={false}
            />
            <InputPlaceholder
              divClass={"mt-4"}
              heading={""}
              icon={faInstagram}
              lablePlaceholder={"instagram.com /"}
              fieldType={"url"}
              displaValue={instagramUrl}
              setValue={setInstagramUrl}
              Inputclass={
                "block py-4 pl-[160px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"Instagram Username"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={false}
            />

            <InputPlaceholder
              divClass={"mt-4"}
              heading={""}
              icon={faTiktok}
              lablePlaceholder={"tiktok.com /"}
              fieldType={"url"}
              displaValue={tiktokUrl}
              setValue={setTiktokUrl}
              Inputclass={
                "block py-4 pl-[130px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"TikTok Username"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={false}
            />

            <InputPlaceholder
              divClass={"mt-4"}
              heading={""}
              icon={faYoutube}
              lablePlaceholder={""}
              fieldType={"url"}
              displaValue={youtubeUrl}
              setValue={setYoutubeUrl}
              Inputclass={
                "block py-4 pl-[47px] pr-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
              }
              inputfieldPlaceholder={"Channel URL or video"}
              isRequired={false}
              isAutoComplete={"off"}
              isReadOnly={false}
            />
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 mt-14 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium"
            >
              {loading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin mr-4 text-2xl"
                />
              )}{" "}
              Create collection
            </button>
          </form>
        </div>
        <div className="basis-4/12 ml-[8.333333%]">
          <div className="sticky top-36">
            <div>
              <span className="block mb-4 text-dark_mode text-sm font-semibold">
                Collection Image
              </span>
              <label
                htmlFor="collection-image-file"
                className="w-32 h-32 rounded-full cursor-pointer"
              >
                <span
                  style={{
                    backgroundImage: `url(${collectionImageView})`,
                  }}
                  className="block w-32 h-32 bg-no-repeat bg-cover rounded-full border-4 border-solid border-gray-100 hover:scale-95 ease-out duration-300"
                ></span>
                <input
                  type="file"
                  onChange={onSetCollectionImage}
                  name="collection_image_file"
                  id="collection-image-file"
                  className="hidden"
                />
              </label>
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
              <label
                htmlFor="banner-image-file"
                className="w-32 h-32 rounded-lg cursor-pointer"
              >
                <span
                  style={{
                    backgroundImage: `url(${collectionBannerImageView})`,
                  }}
                  className="block w-32 h-32 bg-no-repeat bg-cover rounded-lg border-4 border-solid border-gray-100 hover:scale-95 ease-out duration-300"
                ></span>
                <input
                  type="file"
                  onChange={onSetCollectionBannerImage}
                  name="banner_image_file"
                  id="banner-image-file"
                  className="hidden"
                />
              </label>
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
    </section>
  );
}
CreateSingleNft.Layout = HomeLayout;
