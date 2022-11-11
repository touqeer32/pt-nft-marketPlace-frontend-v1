// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";
import { ALCHMEY_KEY } from "./../../config";
const config = {
  apiKey: ALCHMEY_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const getNftsForOwner = async (userAddress, pageSize) => {
  // Get all NFTs
  console.log("ALCHMEY_KEY", userAddress, pageSize);
  var nfts = await alchemy.nft.getNftsForOwner(userAddress, {
    pageSize: pageSize,
  });
  // Print NFTs
  console.log("ALCHMEY_KEY ==>", nfts);
  var ownNFTs = {};

  for (let index = 0; index < nfts.ownedNfts.length; index++) {
    // const group = (groups[items.group] || []);
    if (
      !Object.keys(ownNFTs).includes(nfts.ownedNfts[index].contract.address)
    ) {
      ownNFTs[nfts.ownedNfts[index].contract.address] = [];
    }
    ownNFTs[nfts.ownedNfts[index].contract.address].push(nfts.ownedNfts[index]);
  }
  console.log("contract", ownNFTs);
  return ownNFTs;
};
const getNftsForContract = async (contractAddress, pageSize) => {
  // Get all NFTs
  var nfts = await alchemy.nft.getNftsForContract(contractAddress, {
    pageSize: pageSize,
  });
  // Print NFTs
  // console.log(nfts.ownedNfts);
  var ownNFTs = {};
  nfts.ownedNfts.reduce((contract, items) => {
    // const group = (groups[items.group] || []);
    if (!Object.keys(ownNFTs).includes(items.contract.address)) {
      ownNFTs[items.contract.address] = [];
    }
    ownNFTs[items.contract.address].push(items);
  }, {});
  console.log("contract", ownNFTs);
  return ownNFTs;
};

const getNftMetadata = async (contractAddress, tokenId) => {
  // Get all NFTs
  console.log("contractAddress, tokenId", contractAddress, tokenId);
  var nfts = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  console.log("nfts", nfts);
  var owner = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);
  nfts["wallet"] = owner.owners[0];
  console.log("contract", nfts);
  return nfts;
};

const getNftMetadataForExplorer = async (contractAddress, tokenId) => {
  // Get all NFTs
  console.log("contractAddress, tokenId", contractAddress, tokenId);
  var nfts = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  console.log("nfts", nfts);
  var owner = await alchemy.nft.getOwnersForNft(contractAddress, tokenId);
  nfts["wallet"] = owner.owners[0];
  var ownNFTs = {};

  if (!Object.keys(ownNFTs).includes(contractAddress)) {
    ownNFTs[contractAddress] = [];
  }
  ownNFTs[contractAddress].push(nfts);
  console.log("contract", nfts);
  return ownNFTs;
};
const getContractMetadata = async (contractAddress) => {
  // Get all NFTs
  var nfts = await alchemy.nft.getContractMetadata(contractAddress);
  console.log("contract", nfts);
  return nfts;
};

module.exports = {
  getNftsForOwner,
  getNftsForContract,
  getNftMetadata,
  getNftMetadataForExplorer,
  getContractMetadata,
};
