import {get} from '../../../utils'
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Router from 'next/router';
const NftCard = ({nft,closeMenu}) => {
    const [image,setImage]=useState('')

    useEffect(() => {
        fetchData();
    },[nft?.metadata]);

    const fetchData = async () => {
        const response = await axios.get(nft.metadata, {});
        console.log(response.data.image,'data.image')
        setImage(response.data.image)
        console.log(image,'image')
    }

    function redirect(){
        closeMenu()
        Router.push(`/nft-detail/${nft.collectionId}/${nft.tokenId}/`)
    }
    return (
        <figure onClick={()=>redirect()} className="flex flex-row items-center group relative left-0 hover:left-1 ease-out duration-300">
            <a href="#" className="absolute top-0 left-0 w-full h-full indent-[-9999px]">more</a>
            <img src={image} alt="Avatar 6" className="w-16 h-16 rounded-xl border-2 border-solid border-gray-100 object-cover"/>
                <figcaption className="ml-4">
                    <span className="block text-dark_mode text-sm font-semibold group-hover:text-gray-300">
                        {nft.name}
                    </span>
                    <span className="block mt-1 text-xs text-gray-300">
                        {nft.price} ETH
                    </span>
                </figcaption>
        </figure>
    );
}

export default NftCard;
