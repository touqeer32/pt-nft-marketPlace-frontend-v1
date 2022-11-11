import React, { useState, useEffect } from 'react'
import StandardLayout from "../../components/layouts/StandardLayout";
import { faAngleDown, faCircle, faCloudArrowUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropertiesModel from '../../components/create-nft/PropertiesModel';
import { get, put, post } from "../../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from "yup";
import { toast } from "react-toastify";
import Select from '../../components/form-components/Select';
import Router from "next/router";
import { useForm } from "react-hook-form";
import NFTPreviewCard from "../../components/create-nft/NFTPreviewCard";
import FileInputCard from '../../components/form-components/FileInputCard';
import { storeNFT,createSale } from '../../data/nft';

export default function TypeAuction(props) {
    const [show, setShow] = useState();
    const [loading, setLoading] = useState(false);
    const currencies=[{
        name: "PHT",
        value: "0xfDA036A53E7616a5cC9Ad44c7774892A9c3eFc4F",
      },
      {
        name: "ETH",
        value: "0xfDA036A53E7616a5cC9Ad44c7774892A9c3eFc4F",
      }]
    const [nftData, setNFTData]
    
     = useState({
        preview: '',
        image: '',
        category: '',
        categoryIndex:-1,
        collectionIndex:-1,
        supply: '',
        name: '',
        description: '',
        collectionAddress:'',
        expiration_date:'',
        checked:false,
        currency:"ETH",
        minimum_bid:'',
        properties:[{key:'',value:''}]
    });
    
    const [btnMsg, setBtnMsg] = useState('Create');
    const [collectionNames, setCollectionsName] = useState([]);
    const [collectionIndex, setCollectionsIndex] = useState(-1);
    const [collectionName, setCollectionName] = useState("select collection");
    const [collectionImage, setCollectionImage] = useState("");

    const [categories, setCategories] = useState([]);
    const validationSchema = Yup.object().shape({});
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);

    useEffect(() => {
        fetchData()
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
                setValueByIndex('categoryIndex',0)
                setValueByIndex('category',categoriesApi.data.row[0].name)
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

    function setValueByIndex(key, value) {
        var tempArray = nftData;
        tempArray[key] = value
        setNFTData({...tempArray})
        console.log(nftData,'nftData')
    }

    function checkboxHandler() {
        
        setValueByIndex('checked',!nftData.checked)
    }

    async function onSubmit() {
            setValueByIndex("currency",'0xfDA036A53E7616a5cC9Ad44c7774892A9c3eFc4F')
        if(collectionIndex == -1){
            return toast.error("collection is not selected");
        }else{
            setValueByIndex("collectionAddress",collectionNames[collectionIndex].address)
        }
        if (!props.walletConnected || props.userAddress == "") {
            return toast.error("Please Connect to your wallet First");;
        }
        if (!props.isOnGoerli) {
            return toast.error("Please Change your network to Goerli");
        }
        try{
            setLoading(true)
            setBtnMsg('Creating')
            const nft=await storeNFT(nftData,props.userAddress);
            
            setValueByIndex('tokenId',nft.tokenId)
            setBtnMsg('Auction')

            const data=await createSale(nft,props.injectedProvider,nftData.currency) 

    
            setLoading(false)
    
            toast.success(data)

            Router.push("/");
        }catch(e){
            console.log(e)
            setLoading(false)
            return toast.error(e);
        }
    }

    return (
        <div>
            <section class="nft__create-choose-type-create-auction mt-36 px-36 xl:max-w-full lg:container">
                <div class="ml-[25%] basis-9/12 pl-4">
                    <hgroup>
                        <h4 class="text-dark_mode font-semibold">
                            Create and Auction
                        </h4>
                        <h6 class="w-[50%] mt-10 text-dark_mode text-lg font-semibold">
                            Create NFT edition on Ethereum and auction
                            at the same time.
                        </h6>
                    </hgroup>
                </div>
                <div class="flex flex-row gap-4 mt-10 ml-[25%] pl-4">
                    <div class="basis-6/12">
                        <form onSubmit={handleSubmit(onSubmit)} id="create-choose-type-create-auction">
                            <FileInputCard
                                notByIndex={true}
                                setPreview={(value)=>setValueByIndex('preview',value)}
                                setValue={(value)=>setValueByIndex('image',value)}
                            />
                            <div class="mt-10">
                                <label for="name" class="block mb-2 text-dark_mode text-sm font-semibold">Name*</label>
                                <input name="name" onChange={(e)=>setValueByIndex('name',e.target.value)} id="name" class="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30" placeholder="Enter item name" autocomplete="off" required/>
                            </div>
                            <div class="mt-8">
                                <div class="flex items-center justify-between">
                                    <label for="description" class="block mb-2 text-dark_mode text-sm font-semibold">Description</label>
                                    <span class="text-gray-300 text-xs font-medium">{nftData.description.length} / 200</span>
                                </div>
                                <textarea onChange={(e)=>setValueByIndex('description',e.target.value)} name="description" id="description" rows="4" class="block resize-none p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30" placeholder="Provide a detailed description of your item"></textarea>
                            </div>
                            {categories.length > 0 && (
                                <Select
                                        defaultValuesSelector={"name"}
                                        label="Category*"
                                        displaValue={nftData.category}
                                        setValue={(value)=>setValueByIndex('category',value)}
                                        defaultValues={categories}
                                        Displaylabel={"Category*"}
                                        setIndex={(value)=>setValueByIndex('categoryIndex',value)}
                                        defaultMessage={"select collection"}
                                />
                            )}
                            <div class="mt-8">
                                <label for="supply" class="block mb-2 text-dark_mode text-sm font-semibold">Supply*</label>
                                <input type="number" name="supply" id="supply" class="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30" placeholder="Enter the number of items that can be minted" autocomplete="off" min="0" required/>
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
                            <Select
                                defaultValuesSelector={"currency"}
                                label="Currency*"
                                displaValue={nftData.currency}
                                setValue={(value)=>setValueByIndex('currency',value)}
                                defaultValues={currencies}
                                Displaylabel={"Currency*"}
                                setIndex={(index)=>console.log(index)}
                                defaultMessage={"Select Currency"}
                            />
                            <div class="mt-8">
                                <label for="minimum-bid" class="block mb-2 text-dark_mode text-sm font-semibold">Minimum bid*</label>
                                {/* min="0.15" step="0.1" */}
                                <input type="number" onChange={(e)=>setValueByIndex('minimum_bid',e.target.value)} name="minimum_bid" id="minimum-bid" class="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30" placeholder="Enter the minimum bid" autocomplete="off"  required/>
                            </div>
                            <div class="mt-8">
                                <label for="expiration-date" class="block mb-2 text-dark_mode text-sm font-semibold">Expiration Date*</label>
                                <div class="relative">
                                    <input name="expiration_date" type="date" onChange={(e)=>setValueByIndex('expiration_date',e.target.value)} id="expiration-date" class="datetime-picker block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30" placeholder="Enter the expiration date" autocomplete="off" required/>
                                    <i class="fa-regular fa-calendar-days text-gray-300 text-xl absolute top-[15px] right-3 pointer-events-none"></i>
                                </div>
                            </div>
                            <div class="mt-8 flex items-center justify-between">
                                <span class="block mb-2 text-dark_mode text-sm font-semibold">
                                    Properties
                                    <span class="block mt-1 text-gray-300 leading-relaxed font-normal">
                                        Textual traits that show up as rectangles.
                                    </span>
                                </span>
                                <button type="button" onClick={()=>setShow(true)} class="py-3 px-6 rounded-full bg-nft_institutional text-dark_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nft_institutional active:bg-nft_institutional_dark active:scale-[0.94] hover:scale-[0.97] ease-out duration-300">
                                    Add
                                </button>
                            </div>
                            <div class="mt-8 flex items-center justify-between">
                                <span class="block mb-2 text-dark_mode text-sm font-semibold">
                                    Explicit & Sensitive Content
                                    <span class="block mt-1 text-gray-300 leading-relaxed font-normal">
                                        Set this item as explicit and sensitive content.
                                    </span>
                                </span>
                                <label for="explicit-content" class="inline-flex relative items-center mr-2 cursor-pointer">
                                    <input type="checkbox" checked={nftData?.checked} onChange={checkboxHandler} name="explicit_content" id="explicit-content" class="sr-only peer"/>
                                    <span class="w-11 h-6 bg-gray-300/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nft_institutional"></span>
                                </label>
                            </div>
                            <div class="mt-8">
                                <span class="block mb-2 text-dark_mode text-sm font-semibold">
                                    Freeze metadata
                                    <i class="fa-solid fa-circle-info ml-2 text-dark_mode text-base cursor-pointer hover:scale-110 ease-out duration-300" data-popover-target="popover-freeze-metadata" data-popover-placement="bottom" type="button">
                                    </i>
                                </span>
                                <span class="block p-4 w-full text-gray-300 text-sm font-normal bg-gray-100/30 rounded-lg">
                                    To freeze your metadata, you must create your item first
                                </span>
                            </div>
                            <button type="submit" class="block py-3 px-8 mt-14 rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300">
                                {loading && (
                                    <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="animate-spin mr-4 text-2xl"
                                    />
                                )}{" "}
                                {btnMsg} NFT
                            </button>
                        </form>
                    </div>
                    <div class="basis-4/12 ml-[8.333333%]">
                        <NFTPreviewCard
                            item={nftData}
                            likes={""}
                            salePrice={""}
                            maxBidPrice={""}
                            collectionName={collectionName}
                            collectionImage={collectionImage}
                        />
                    </div>
                </div>
            </section>
            {
                show && (
                    <PropertiesModel 
                        onClose={() => setShow(false)} 
                        defaultProperties={nftData.properties}
                        storeProperties={(value)=>setValueByIndex('properties',value)}
                    />
                )
            }
        </div>
    )
}
TypeAuction.Layout = StandardLayout
