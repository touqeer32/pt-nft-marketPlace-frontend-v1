import { create } from "ipfs-http-client";
import { get, put, post } from "../utils";
import { PTMinter } from "../lib";

import { ethers } from "ethers";
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
import { ConsoleSqlOutlined } from "@ant-design/icons";


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
})

export async function storeNFT(item,address) {

  return new Promise(async (resolve, reject) => {
    console.log(item.image,item.name,item.description)
    if (!item.image || !item.name || !item.description) return reject("");

    var response = await get("get-tokenid", {});
    console.log('get-tokenid ')
    if (response.status == 400) {
      reject("Issue to get Token ID in NFT ");
    }
    var tokenId = response.data.tokenId;

    var ipfs;

    try {
      const added = await client.add(item.image);
      ipfs = `${INFURA_GATEWAY_URL}${added.path}`;
      console.log('ipfs')

    } catch (error) {
      return reject("Error in IPFS Node ");
    }

    if (!item.name || !item.description || !ipfs ) return;

    var response;
    if (tokenId != "") {
      response = await put("update-tokenid");
      console.log('update-tokenid')
      if (response.status == 400) {
        return reject("Issue to get Token ID in NFT");
      }
    } else {
      return reject("Issue to get Token ID in NFT");
    }

    var data = JSON.stringify({
      tokenId: tokenId,
      name: item.name,
      description: item.description,
      image: ipfs,
      sensitiveConetent: item.checked,
    });

    try {
      const added = await client.add(data);
      console.log('added')
      const url = `${INFURA_GATEWAY_URL}${added.path}`;

      response = await post("auction-nft", {
        tokenId: tokenId,
        name: item.name,
        description: item.description,
        category: item.category,
        supply: item.supply,
        wallet: address,
        currency:item.currency,
        price: item.minimum_bid,
        autionDate:  item.expiration_date,
        metadata: url,
        collectionId: item.collectionAddress,
      });
      resolve(response);

    } catch (error) {
      reject("Error uploading file: ", error);
    }
  })
}


export async function createSale(item,injectedProvider,currency) {
  return new Promise(async (resolve,reject)=>{

    const { chainId } = await injectedProvider.getNetwork();
    if (chainId == "5") {
      try {
        let price = ethers.utils.parseEther(item.price);
        const signer = await injectedProvider.getSigner();
        var address = await signer.getAddress();
        let ptNFT = new ethers.Contract(PTNFT_NFT, PTNFT_NFT_ABI, signer);
        const ptMinter = new PTMinter({ ptNFT, signer });
        console.log(item,'item')
        const voucher = await ptMinter.createVoucher(
          item.tokenId, //tokenId
          item.metadata, //uri
          currency,
          price.toString(), //minPrice
          true //isFixedPrice
        );
        // console.log("voucher", voucher);
        var response = await post("listing-nft", {
          collectionId: item.collectionId,
          wallet: address.toString(),
          tokenId: item.tokenId,
          signature: voucher.signature,
          price: item.price,
          currency: item.currency,
          isFixedPrice: true, //isFixedPrice
          autionDate: item.autionDate,
        });
        if (response.status != 200) {
          reject("Issue in Listing Please Try Again");
        } else {
          resolve("Your NFT is Successfully Listed");
        }
        
      } catch (error) {
        console.log(error,'error')
        reject(error);
      }
    }
  })
}