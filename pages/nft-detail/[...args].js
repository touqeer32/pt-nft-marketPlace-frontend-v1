import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import HomeLayout from "../../components/layouts/HomeLayout";
import ItemDetail from "../../components/item-details";
import { get } from "../../utils";
import { getNftMetadata } from "./../../utils/alchmey/getUserNFT";
import { GET_LISTED_ITEMS } from "../../config/graphQLQueries";
import { useQuery, useApolloClient } from "@apollo/client";

export default function NftDetail(probs) {
  const router = useRouter();
  const { args } = router.query;
  const [nftDetails, setNftDetails] = useState("");
  const [nftMetadata, setNftMetadata] = useState("");
  const [collection, setCollection] = useState({});
  const [isGetCall, setIsGetCall] = useState(false);
  const [isOnChain, setIsOnChainNFT] = useState(false);

  const [isGrapgDataLoaded, setIsGrapgDataLoaded] = useState(false);

  const client = useApolloClient();

  async function runQuery() {
    console.log("nftDetails===", nftDetails);
    const useQueryData = await client.query({
      query: GET_LISTED_ITEMS,
      variables: { collectionAddress: args[0], tokenId: args[1] },
    });
    console.log("newData", useQueryData);
    console.log(useQueryData.loading);
    if (
      useQueryData.data.itemListedEntities &&
      useQueryData.data.itemListedEntities.length > 0
    ) {
      setIsGrapgDataLoaded(true);
      var tempNFTDetails = {
        name: nftDetails.name,
        description: nftDetails.description,
        wallet: nftDetails.wallet,
        signature: "",
        price: useQueryData.data.itemListedEntities[0].minPrice,
        isListed: useQueryData.data.itemListedEntities[0].status,
        currency: useQueryData.data.itemListedEntities[0].currency,
        uri: "",
        isFixedPrice: useQueryData.data.itemListedEntities[0].isFixedPrice,
        tokenId: nftDetails.tokenId,
      };
      setNftDetails(tempNFTDetails);
    }
  }

  useEffect(() => {
    if (args && nftDetails && !isGrapgDataLoaded && isOnChain) {
      runQuery();
    }
  }, [args, nftDetails]);

  useEffect(() => {
    // declare the data fetching function
    try {
      const fetchData = async () => {
        var collectionApi = await get("get-collection-by-address", {
          address: args[0],
        });
        if (collectionApi.data.status == 200) {
          setCollection(collectionApi.data.collections);
        } else {
          // toast.error("Server Issue Please Check Later");
          // Router.push("/account/profile");
        }
      };
      console.log("collection", collection);
      if (collection && Object.keys(collection).length === 0 && args) {
        fetchData();
      }
    } catch (error) {
      console.log("error", error);
    }
  });
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setIsGetCall(true);
      var nftDetailsApi = await get("get-nft-details", {
        collectionId: args[0],
        tokenId: args[1],
      });
      console.log("nftDetailsApi", nftDetailsApi);
      if (nftDetailsApi.data.status == 200) {
        if (nftDetailsApi.data.nftDetails) {
          setNftDetails(nftDetailsApi.data.nftDetails);
          const { data } = await axios.get(
            nftDetailsApi.data.nftDetails.metadata
          );
          setNftMetadata(data);
          setIsOnChainNFT(false);
        } else {
          var ownNFTs = await getNftMetadata(args[0], args[1]);
          console.log("onchain", ownNFTs);
          var tempNFTDetails = {
            name: ownNFTs.title,
            description: ownNFTs.description,
            wallet: ownNFTs.wallet,
            signature: "",
            price: "",
            isListed: false,
            currency: "",
            uri: "",
            isFixedPrice: false,
            tokenId: ownNFTs.tokenId,
          };
          var tempCollection = collection;
          tempCollection["name"] = ownNFTs.contract.name;
          tempCollection["address"] = ownNFTs.contract.address;
          tempCollection["image"] = collection.image;

          setCollection(tempCollection);
          setIsOnChainNFT(true);
          setNftDetails(tempNFTDetails);
          if (
            ownNFTs.rawMetadata.metadata &&
            ownNFTs.rawMetadata.metadata.length == 0
          ) {
            console.log("datadatadata", data);

            const { data } = await axios.get(ownNFTs.tokenUri.raw);
            setNftMetadata(data);
          } else {
            setNftMetadata(ownNFTs.rawMetadata);
          }
        }
      } else {
        toast.error("Server Issue Please Check Later");
        Router.push("/account/profile");
      }
    };

    if (Object.keys(nftDetails).length == 0 && args && !isGetCall) {
      fetchData();
    }
  }, [probs]);
  return (
    <div>
      {nftDetails && nftMetadata && collection && (
        <ItemDetail
          nftName={nftDetails.name}
          tokenId={nftDetails.tokenId}
          wallet={nftDetails.wallet}
          signature={nftDetails.signature}
          price={nftDetails.price}
          isListed={nftDetails.isListed}
          currency={nftDetails.currency}
          uri={nftDetails.metadata}
          isFixedPrice={nftDetails.isFixedPrice}
          likes={1}
          view={10}
          nftDetails={nftDetails.description}
          nftImage={nftMetadata.image}
          profilePicColor={probs.profilePicColor}
          isColour={probs.isColour}
          collectionName={collection.name}
          collectionImage={collection.image}
          collectionAddress={collection.address}
          injectedProvider={probs.injectedProvider}
          isOnChain={isOnChain}
          isOwner={
            nftDetails.wallet.toLowerCase() == probs.userAddress.toLowerCase()
          }
          userAddress={probs.userAddress.toLowerCase()}
        />
      )}
    </div>
  );
}
NftDetail.Layout = HomeLayout;
