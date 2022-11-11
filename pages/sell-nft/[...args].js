import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SellNFTDetails from "../../components/sell-nft-details";
// import ItemDetail from "./../../components/item-details";
import HomeLayout from "../../components/layouts/HomeLayout";
import { get } from "../../utils";
import { getNftMetadata } from "./../../utils/alchmey/getUserNFT";
import { GET_LISTED_ITEMS } from "../../config/graphQLQueries";
import { useQuery, useApolloClient } from "@apollo/client";

export default function SellNFT(probs) {
  const router = useRouter();
  const { args } = router.query;
  const [nftDetails, setNftDetails] = useState("");
  const [nftMetadata, setNftMetadata] = useState("");
  const [collection, setCollection] = useState({});
  const [isOnChain, setIsOnChainNFT] = useState(false);
  const [graphQL, setGraphQL] = useState({});
  useEffect(() => {
    // declare the data fetching function
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
    if (collection && Object.keys(collection).length === 0 && args) {
      fetchData();
    }
  });

  useEffect(() => {
    if (nftDetails) {
      console.log("nftDetails.wallet", nftDetails.wallet, probs.userAddress);
      if (nftDetails.wallet.toUpperCase() != probs.userAddress.toUpperCase()) {
        router.push(`/explore`);
      }
    }
  }, [probs, nftDetails]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var nftDetailsApi = await get("get-nft-details", {
        collectionId: args[0],
        tokenId: args[1],
        wallet: probs.userAddress,
      });
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
    if (
      probs.userAddress != "" &&
      Object.keys(nftDetails).length === 0 &&
      args
    ) {
      fetchData();
    }
  }, [probs]);
  return (
    <div>
      {nftDetails && nftMetadata && collection && (
        <>
          <SellNFTDetails
            collectionAddress={args[0]}
            tokenId={nftMetadata.tokenId}
            uri={nftDetails.metadata}
            injectedProvider={probs.injectedProvider}
            image={nftMetadata.image}
            name={nftMetadata.name}
            description={nftMetadata.description}
            collectionName={collection.name}
            collectionImage={collection.image}
            isOnChain={isOnChain}
          />
        </>
      )}
    </div>
  );
}
SellNFT.Layout = HomeLayout;
