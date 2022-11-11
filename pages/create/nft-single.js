import React, { useState, useEffect } from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { toast } from "react-toastify";
import NFTPreviewCard from "../../components/create-nft/NFTPreviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Select from "../../components/form-components/Select";
import Input from "../../components/form-components/input";
import TextArea from "../../components/form-components/textArea";
import { SyncOutlined } from "@ant-design/icons";
import Router from "next/router";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import * as CoinGecko from "coingecko-api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PTMinter } from "../../lib";
import { get, put, post } from "../../utils";
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();
import {
  PTNFT_MARKETPLACE,
  PTNFT_NFT,
  PTNFT_MARKETPLACE_ABI,
  PTNFT_NFT_ABI,
  INFURA_IPFS_PROJECJECT_ID,
  INFURA_IPFS_PROJECJECT_SECRET,
  INFURA_URL,
  INFURA_GATEWAY_URL,
} from "/config";

//3. Make calls  this function is used to get live price of ethere to show customer price in dollar
// var func = async () => {
//   let data = await CoinGeckoClient.ping();
//   console.log("data ==>", data);
//   let response = await CoinGeckoClient.coins.fetch("ethereum", {});
//   console.log("bitcoin ==>", response.data.market_data.current_price.usd);
// };
// func();
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
  // console.log("CreateSingleNft", props);
  // const [ipfs, setIpfs] = useState(null);

  const [collectionImageIpfs, setCollectionImageIpfs] = useState(null);
  const [tokenId, setTokenId] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [nftImage, setNFTImage] = useState(null);

  const [wallet, setWallet] = useState(null);
  // const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategoy] = useState("");

  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("1");
  const [collectionNames, setCollectionsName] = useState([]);
  const [collectionIndex, setCollectionsIndex] = useState(-1);
  const [categoryIndex, setCategoryIndex] = useState(-1);

  const [collectionName, setCollectionName] = useState("select collection");
  const [collectionImage, setCollectionImage] = useState("");
  const [selectedCollectionImage, setSelectedCollectionImage] = useState("");

  const [collectionDescription, setCollectionDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [checked, setChecked] = useState(true);

  const validationSchema = Yup.object().shape({
    // image: Yup.string().required("NFG image is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  useEffect(() => {
    if (collectionIndex != -1) {
      setCollectionImage(collectionNames[collectionIndex].image);
    }
  }, [collectionIndex]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var collectionApi = await get("get-all-collection", {});

      if (collectionApi.data.status == 200) {
        setCollectionsName(collectionApi.data.row);
        setCollectionsIndex(0);
        setCollectionName(collectionApi.data.row[0].name);
      } else {
        setCollectionsName([
          {
            name: "select collection",
          },
        ]);
      }
    };
    // console.log("categories.length", categories.length);
    if (collectionNames.length == 0) {
      fetchData();
    }
  });
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var categoriesApi = await get("get-categories", {});

      if (categoriesApi.data.status == 200) {
        setCategories(categoriesApi.data.row);
        setCategoryIndex(0);
        setCategoy(categoriesApi.data.row[0].name);
      } else {
        setCategories({});
      }

      // console.log("categories ==>", categoriesApi);
    };
    // console.log("categories.length", categories.length);
    if (categories.length == 0) {
      fetchData();
    }
  });

  async function onChange(e) {
    const file = e.target.files[0];
    setNFTImage(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      setSelectedImage(e.target.result);
    };
    if (tokenId == "") {
      var response = await get("get-tokenid", {});
      if (response.status == 400) {
        toast.error("Issue to get Token ID");
        return;
      }
      setTokenId(response.data.tokenId);
    }
  }

  function checkboxHandler() {
    setChecked(!checked);
  }

  async function onSubmit() {
    // // createSale("url");
    if (!props.walletConnected || props.userAddress == "") {
      toast.error("Please Connect to your wallet First");
      return;
    }
    if (!props.isOnGoerli) {
      toast.error("Please Change your network to Goerli");
      return;
    }
    if (!nftImage) return;
    var ipfs;
    try {
      setLoading(true);

      const added = await client.add(nftImage);
      ipfs = `${INFURA_GATEWAY_URL}${added.path}`;
      // setIpfs(url);
    } catch (error) {
      toast.error("Error in IPFS Node");
      return;
    }
    if (!name || !description || !ipfs || collectionIndex == -1) return;
    var response;
    if (tokenId != "") {
      response = await put("update-tokenid");
      if (response.status == 400) {
        toast.error("Issue to get Token ID");
        return;
      }
    } else {
      toast.error("Issue to get Token ID");
    }
    var data;

    data = JSON.stringify({
      tokenId,
      name,
      description,
      image: ipfs,
      sensitiveConetent: checked,
    });
    var address = props.userAddress;
    try {
      const added = await client.add(data);
      const url = `${INFURA_GATEWAY_URL}${added.path}`;
      let collectionAddress = collectionNames[collectionIndex].address;
      response = await post("create-nft", {
        tokenId: tokenId,
        name: name,
        description: description,
        category: category,
        supply: supply,
        wallet: address,
        metadata: url,
        collectionId: collectionAddress,
      });
      toast.success("Successfully Created NFT");
      Router.push("/");

      // createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    let ptNFT = new ethers.Contract(PTNFT_NFT, PTNFT_NFT_ABI, signer);
    const ptMinter = new PTMinter({ ptNFT, signer });

    const voucher = await ptMinter.createVoucher(
      1,
      "ipfs://QmQFcbsk1Vjt1n361MceM5iNeMTuFzuVUZ1hKFWD7ZCpuC",
      1,
      1
    );

    // let transaction = await contract.tokenFunc(url, PTNFT_MARKETPLACE);
    // let tx = await transaction.wait();
    // let event = tx.events[0];
    // let value = event.args[2];
    // let tokenId = value.toNumber();
    // const prices = ethers.utils.parseUnits(price, "ether");

    // contract = new ethers.Contract(
    //   PTNFT_MARKETPLACE,
    //   PTNFT_MARKETPLACE_ABI,
    //   signer
    // );
    // let listingPrice = await contract.getListingFee();
    // listingPrice = listingPrice.toString();

    // transaction = await contract.createMarketItem(PT_NFT, tokenId, prices, {
    //   value: listingPrice,
    // });
    // await transaction.wait();

    // router.push("/");
  }

  return (
    // {# nft__create-choose-type-single #}
    <section className="nft__create-choose-type-single relative mt-36 px-36 xl:max-w-full lg:container">
      <div className="flex">
        <div className="ml-[25%] basis-9/12">
          <hgroup>
            <h4 className="text-dark_mode font-semibold">Create Single</h4>
            <h6 className="w-[50%] mt-10 text-dark_mode text-lg font-semibold">
              Single NFT edition on Ethereum.
            </h6>
          </hgroup>
          <div className="flex flex-row gap-4 mt-10">
            <div className="basis-6/12">
              <form
                id="create-choose-type-single"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <span className="block mb-2 text-dark_mode text-sm font-semibold">
                    Image, Video or Audio file*
                  </span>
                  <div className="flex justify-center items-center w-full">
                    <label
                      htmlFor="nft-image-file"
                      className="flex flex-col justify-center items-center w-full h-64 rounded-lg border border-gray-300 border-dashed bg-gray-100/50 hover:bg-gray-100 cursor-pointer "
                    >
                      <span className="flex flex-col justify-center items-center pt-5 pb-6">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          className="fa-solid fa-cloud-arrow-up text-nft_institutional text-6xl"
                        />
                        <span className="block mt-3 text-dark_mode text-base font-semibold">
                          Select a file to upload
                        </span>
                        <span className="block text-gray-300 text-sm">
                          max size: 100 MB
                        </span>
                      </span>
                      <input
                        type="file"
                        onChange={onChange}
                        name="nft_image_file"
                        id="nft-image-file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span className="block w-3/4 mt-3 text-gray-300 text-sm leading-relaxed">
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3,
                    WAV, OGG, GLB, GLTF.
                    <br />
                  </span>
                </div>
                <Input
                  defaultValues={name}
                  setValue={setName}
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

                {categories.length > 0 && (
                  <Select
                    defaultValuesSelector={"name"}
                    displaValue={category}
                    setValue={setCategoy}
                    defaultValues={categories}
                    displaylabel={"Category*"}
                    setIndex={setCategoryIndex}
                    defaultMessage={"select collection"}
                  />
                )}
                <Input
                  defaultValues={supply}
                  setValue={setSupply}
                  fieldType={"number"}
                  displaValue={"Supply*"}
                  placeholder={"Enter the number of items that can be minted"}
                />

                {collectionNames.length > 0 && (
                  <Select
                    defaultValuesSelector={"name"}
                    displaValue={collectionName}
                    setValue={setCollectionName}
                    defaultValues={collectionNames}
                    displaylabel={"Collection*"}
                    setIndex={setCollectionsIndex}
                    defaultMessage={"select collection"}
                  />
                )}
                <div className="mt-8 flex items-center justify-between">
                  <span className="block mb-2 text-dark_mode text-sm font-semibold">
                    Properties
                    <span className="block text-gray-300 leading-relaxed font-normal">
                      Textual traits that show up as rectangles.
                    </span>
                  </span>
                  <button
                    type="button"
                    className="py-3 px-6 rounded-full bg-nft_institutional hover:bg-nft_institutional_dark text-dark_mode text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
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
                      name="explicit_content"
                      id="explicit-content"
                      className="sr-only peer"
                      checked={checked}
                      onChange={checkboxHandler}
                    />
                    <span className="w-11 h-6 bg-gray-300/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nft_institutional"></span>
                  </label>
                </div>
                <div className="mt-8">
                  <span className="block mb-2 text-dark_mode text-sm font-semibold">
                    Freeze metadata
                    <i className="fa-solid fa-circle-info ml-2 text-dark_mode text-base"></i>
                  </span>
                  <span className="block p-4 w-full text-gray-300 text-sm font-normal bg-gray-100/30 rounded-lg">
                    To freeze your metadata, you must create your item first
                  </span>
                </div>
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
                  Create NFT
                </button>
              </form>
            </div>
            <div className="basis-4/12 ml-[8.333333%]">
              <NFTPreviewCard
                  item={{
                    preview:selectedImage,
                    name:name,
                    description:description,
                    tokenId:tokenId,
                  }}
                  likes={""}
                  salePrice={""}
                  maxBidPrice={""}
                  collectionName={collectionName}
                  collectionImage={collectionImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
CreateSingleNft.Layout = HomeLayout;
