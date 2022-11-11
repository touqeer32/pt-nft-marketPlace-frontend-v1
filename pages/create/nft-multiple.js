import {
  faAngleDown,
  faCircle,
  faCloudArrowUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import StandardLayout from "../../components/layouts/StandardLayout";
import PropertiesModel from "../../components/create-nft/PropertiesModel";
import Collapse from "../../components/ui/Collapse";
import { get, put, post } from "../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Select from "../../components/form-components/Select";
import Router from "next/router";
import { useForm } from "react-hook-form";
import NFTPreviewCard from "../../components/create-nft/NFTPreviewCard";
import FileInputCard from "../../components/form-components/FileInputCard";
import { create } from "ipfs-http-client";

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

const projectIdAndSecret = `${INFURA_IPFS_PROJECJECT_ID}:${INFURA_IPFS_PROJECJECT_SECRET}`;

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

const NFTNumberOptions = [
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
];

export default function TypeMultiple(props) {
  const [show, setShow] = useState();
  const [numberOfNfts, setNumberOfNFTs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([{ key: "", value: "" }]);
  const [checked, setChecked] = useState(true);
  const [nftData, setNFTData] = useState([
    {
      preview: "",
      image: "",
      category: "",
      supply: "",
      name: "",
      description: "",
    },
  ]);

  const [collectionNames, setCollectionsName] = useState([]);
  const [collectionIndex, setCollectionsIndex] = useState(-1);
  const [collectionName, setCollectionName] = useState("select collection");
  const [collectionImage, setCollectionImage] = useState("");

  const [categories, setCategories] = useState([]);
  const [category, setCategoy] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(-1);

  const validationSchema = Yup.object().shape({});
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
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
  }

  useEffect(() => {
    const fetchData = async () => {
      var categoriesApi = await get("get-categories", {});

      if (categoriesApi.data.status == 200) {
        setCategories(categoriesApi.data.row);
        setCategoryIndex(0);
        setCategoy(categoriesApi.data.row[0].name);
      } else {
        setCategories({});
      }
    };
    if (categories.length == 0) {
      fetchData();
    }
  });

  useEffect(() => {
    if (collectionIndex != -1) {
      console.log("collectionIndex", collectionNames[collectionIndex].image);

      setCollectionImage(collectionNames[collectionIndex].image);
    }
  }, [collectionIndex]);

  function setValueByIndex(index, key, value) {
    var tempArray = nftData;
    tempArray[index][key] = value;
    setNFTData([...tempArray]);
  }

  function checkboxHandler() {
    console.log("click");
    setChecked(!checked);
  }

  function setFormData(value) {
    var array = [];
    Array(parseInt(value))
      .fill(1)
      .forEach((i) => {
        array.push({
          preview: "",
          image: "",
          category: "",
          supply: "",
          tokenId: "",
          name: "",
          description: "",
        });
      });
    setNumberOfNFTs(value);
    setNFTData(array);
  }

  async function storeNFT(item, index) {
    if (!item.image || !item.name || !item.description || collectionIndex == -1)
      return;
    setLoading(true);

    var response = await get("get-tokenid", {});
    console.log("get-tokenid ");
    if (response.status == 400) {
      return toast.error("Issue to get Token ID in NFT " + (index + 1));
    }
    setValueByIndex(index, "tokenId", response.data.tokenId);

    var ipfs;
    try {
      setLoading(true);

      const added = await client.add(item.image);
      ipfs = `${INFURA_GATEWAY_URL}${added.path}`;
      console.log("ipfs");
    } catch (error) {
      setLoading(false);
      return toast.error("Error in IPFS Node " + (index + 1));
    }

    if (!item.name || !item.description || !ipfs || collectionIndex == -1)
      return;

    var response;
    if (item.tokenId != "") {
      response = await put("update-tokenid");
      console.log("update-tokenid");
      if (response.status == 400) {
        setLoading(false);
        return toast.error("Issue to get Token ID in NFT " + (index + 1));
      }
    } else {
      setLoading(false);
      return toast.error("Issue to get Token ID in NFT " + (index + 1));
    }

    var data = JSON.stringify({
      tokenId: item.tokenId,
      name: item.name,
      description: item.description,
      image: ipfs,
      sensitiveConetent: checked,
    });

    var address = props.userAddress;

    try {
      const added = await client.add(data);
      console.log("added");
      const url = `${INFURA_GATEWAY_URL}${added.path}`;
      let collectionAddress = collectionNames[collectionIndex].address;

      response = await post("create-nft", {
        tokenId: item.tokenId,
        name: item.name,
        description: item.description,
        category: item.category,
        supply: item.supply,
        wallet: address,
        metadata: url,
        collectionId: collectionAddress,
      });
      console.log("response", response);
      toast.success("Successfully Created NFT " + (index + 1));
      setLoading(false);
    } catch (error) {
      toast.error("Error uploading file: ", error);
    }
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async function onSubmit() {
    if (!props.walletConnected || props.userAddress == "") {
      return toast.error("Please Connect to your wallet First");
    }
    if (!props.isOnGoerli) {
      return toast.error("Please Change your network to Goerli");
    }
    await asyncForEach(nftData, async (item, index) => {
      setLoading(true);
      await storeNFT(item, index);
      setLoading(false);
      console.log(index);
    });

    Router.push("/");
  }

  return (
    <div>
      <section className="nft__create-choose-type-multiple mt-36 px-36 xl:max-w-full lg:container">
        <div className="ml-[25%] basis-9/12 pl-4">
          <hgroup>
            <h4 className="text-dark_mode font-semibold">Create Multiple</h4>
            <h6 className="w-[50%] mt-10 text-dark_mode text-lg font-semibold">
              Multiple NFT batches edition on Ethereum.
            </h6>
          </hgroup>
        </div>
        <div className="flex flex-row gap-4 mt-10 ml-[25%] pl-4">
          <div className="basis-6/12">
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="create-choose-type-multiple"
            >
              <div className="mb-16">
                <Select
                  defaultValuesSelector="value"
                  displaValue={numberOfNfts}
                  setIndex={(e) => console.log(e)}
                  setValue={setFormData}
                  defaultValues={NFTNumberOptions}
                  label={"Number NFTs*"}
                  defaultMessage="Select the number of NFTs you want to create"
                />
              </div>
              <div
                id="accordion-create-choose-type-multiple"
                className="nft__accordion"
                data-accordion="collapse"
                data-active-classes="bg-white text-nft_institutional"
                data-inactive-classes="text-dark_mode"
              >
                {nftData.map((item, index) => {
                  return (
                    <Collapse title={"NFT " + (index + 1)} key={index}>
                      <div>
                        <FileInputCard
                          index={index}
                          setValue={setValueByIndex}
                          setPreview={setValueByIndex}
                          supportedFiles="JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF"
                        />
                        <div className="mt-10">
                          <label
                            for="name-1"
                            className="block mb-2 text-dark_mode text-sm font-semibold"
                          >
                            Name*
                          </label>
                          <input
                            onChange={(event) =>
                              setValueByIndex(index, "name", event.target.value)
                            }
                            name="name_1"
                            id="name-1"
                            className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                            placeholder="Enter item name"
                            autoComplete="off"
                            required
                          />
                        </div>
                        <div className="mt-8">
                          <div className="flex items-center justify-between">
                            <label
                              for="description-1"
                              className="block mb-2 text-dark_mode text-sm font-semibold"
                            >
                              Description
                            </label>
                            <span className="text-gray-300 text-xs font-medium">
                              0 / 200
                            </span>
                          </div>
                          <textarea
                            onChange={(event) =>
                              setValueByIndex(
                                index,
                                "description",
                                event.target.value
                              )
                            }
                            name="description_1"
                            id="description-1"
                            rows="4"
                            className="block resize-none p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                            placeholder="Provide a detailed description of your item"
                          ></textarea>
                        </div>
                        {categories.length > 0 && (
                          <Select
                            label="Category*"
                            defaultValuesSelector={"name"}
                            displaValue={nftData[index].category}
                            setValue={(value) =>
                              setValueByIndex(index, "category", value)
                            }
                            defaultValues={categories}
                            Displaylabel={"Category*"}
                            setIndex={setCategoryIndex}
                            defaultMessage={"select collection"}
                          />
                        )}
                        <div className="mt-8">
                          <label
                            for="supply-1"
                            className="block mb-2 text-dark_mode text-sm font-semibold"
                          >
                            Supply*
                          </label>
                          <input
                            onChange={(event) =>
                              setValueByIndex(
                                index,
                                "supply",
                                event.target.value
                              )
                            }
                            type="number"
                            name="supply_1"
                            id="supply-1"
                            className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                            placeholder="Enter the number of items that can be minted"
                            autoComplete="off"
                            min="0"
                            required
                          />
                        </div>
                      </div>
                    </Collapse>
                  );
                })}
              </div>
              {collectionNames.length > 0 && (
                <Select
                  label="Collections*"
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
                  onClick={() => setShow(true)}
                  type="button"
                  data-modal-toggle="modal-properties"
                  className="py-3 px-6 rounded-full bg-nft_institutional text-dark_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nft_institutional active:bg-nft_institutional_dark active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
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
                  for="explicit-content"
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
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="fa-solid fa-circle-info ml-2 text-white text-dark_mode text-base cursor-pointer hover:scale-110 ease-out duration-300"
                    data-popover-target="popover-freeze-metadata"
                    data-popover-placement="bottom"
                    type="button"
                  />
                </span>
                <span className="block p-4 w-full text-gray-300 text-sm font-normal bg-gray-100/30 rounded-lg">
                  To freeze your metadata, you must create your item first
                </span>
              </div>
              <button
                type="submit"
                className="block py-3 px-8 mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
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
            {nftData.map((item, key) => {
              return (
                <NFTPreviewCard
                  key={key}
                  item={item}
                  likes={""}
                  salePrice={""}
                  maxBidPrice={""}
                  collectionName={collectionName}
                  collectionImage={collectionImage}
                />
              );
            })}
          </div>
        </div>
      </section>
      {show && (
        <PropertiesModel
          onClose={() => setShow(false)}
          defaultProperties={properties}
          storeProperties={(value) => setProperties(value)}
        />
      )}
    </div>
  );
}
TypeMultiple.Layout = StandardLayout;
