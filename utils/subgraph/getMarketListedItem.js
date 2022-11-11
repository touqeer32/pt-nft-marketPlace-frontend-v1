import { getContractMetadata, getNftMetadata } from "./../alchmey/getUserNFT";
const getListedContractAddress = async (nfts) => {
  // Get all NFTs
  var ownNFTs = {};

  for (let index = 0; index < nfts.itemListedEntities.length; index++) {
    // const group = (groups[items.group] || []);
    if (
      !Object.keys(ownNFTs).includes(nfts.itemListedEntities[index].collection)
    ) {
      ownNFTs[nfts.itemListedEntities[index].collection] = [];
    }
    var collection = await getContractMetadata(
      nfts.itemListedEntities[index].collection
    );
    collection["tokenId"] = nfts.itemListedEntities[index].tokenId;
    ownNFTs[nfts.itemListedEntities[index].collection].push(collection);
  }
  console.log("contract", ownNFTs);
  return ownNFTs;
};

const getListedMetaData = async (nfts, collectionAddress) => {
  // Get all NFTs
  var ownNFTs = {};

  for (let index = 0; index < nfts.itemListedEntities.length; index++) {
    // const group = (groups[items.group] || []);
    if (!Object.keys(ownNFTs).includes(collectionAddress)) {
      ownNFTs[collectionAddress] = [];
    }
    if (nfts.itemListedEntities[index].collection == collectionAddress) {
      var collectionMetadata = {};
      var collection = await getContractMetadata(collectionAddress);
      console.log(
        " nfts.itemListedEntities[index]",
        nfts.itemListedEntities[index]
      );
      collectionMetadata["contract"] = collection;
      collectionMetadata["tokenId"] = nfts.itemListedEntities[index].tokenId;
      collectionMetadata["rawMetadata"] = "";

      ownNFTs[collectionAddress].push(collectionMetadata);
    }
  }
  console.log("contract", ownNFTs);
  return ownNFTs;
};
module.exports = {
  getListedContractAddress,
  getListedMetaData,
};
