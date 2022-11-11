import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Card from "./card-signle-nft";
import {
  PTNFT_MARKETPLACE,
  PTNFT_NFT,
  PTNFT_MARKETPLACE_ABI,
  PTNFT_NFT_ABI,
} from "/config";

export default function RecentBid() {
  const [ipfs, setIpfs] = useState({});
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionImage, setCollectionImage] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [wallet, setWallet] = useState("");
  const [nfts, setNfts] = useState([]);

  const router = useRouter();
  const _id = router.query._id;

  // useEffect(() => {
  //   fetchUsersNft();
  // }, [nfts]);

  // useEffect(() => {
  //   if (_id) {
  //     fetchNFt();
  //   }
  // }, [_id]);

  const fetchNFt = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user-nft/${_id}`
      );
      setIpfs(data.ipfs);
      setName(data.name);
      setCategory(data.category);
      setDescription(data.description);
      setSupply(data.supply);
      setCollectionName(data.collectionName);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersNft = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/users-nft");
      setNfts(data);
    } catch (err) {
      console.log(err);
    }
  };

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.alchemyapi.io/v2/NA_wfmmYfyCu2smKCCu7KM4EJ4VcDH57"
    );
    const tokenContract = new ethers.Contract(
      PTNFT_NFT,
      PTNFT_NFT_ABI,
      provider
    );
    const marketContract = new ethers.Contract(
      PTNFT_MARKETPLACE,
      PTNFT_MARKETPLACE_ABI,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      PTNFT_MARKETPLACE,
      PTNFT_MARKETPLACE_ABI,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      PTNFT_NFT,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    open();
    loadNFTs();
  }

  return (
    <section className="nft__top-collections px-36 mt-36 xl:max-w-full lg:container">
      <div className="flex items-center justify-between">
        <h5 className="text-dark_mode font-medium">Recent Bids</h5>
        <a href="#" className="underline text-sm hover:no-underline">
          View all
        </a>
      </div>
      <div className="flex flex-nowrap gap-4 mt-10">
        <div className="basis-3/12 ">
          {/* Start of coloume */}
          <Card />
          {/* End of coloume */}
        </div>
      </div>
    </section>
  );
}
