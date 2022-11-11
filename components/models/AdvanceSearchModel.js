import {
  faCertificate,
  faCheck,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { get } from "../../utils";
import CollectionCard from "./components/CollectionCard";
import NftCard from "./components/NftCard";

const AdvanceSearchModel = ({ show, closeMenu }) => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [nfts, setNFTS] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData("");
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    var categoriesApi = await get("get-categories", {});

    if (categoriesApi.data.status == 200) {
      setCategories(categoriesApi.data.row);
    }
  };

  const fetchData = async (search) => {
    const response = await get(`search-all?search=${search}`, {});
    const data = response.data.data;

    // setCollections(data.collections);
    // setProfiles(data.profiles);
    // setNFTS(data.NFTs);
  };
  function searchItems(value) {
    setSearch(value);
    fetchData(value);
  }
  return (
    <div
      id="modal-advance-search"
      tabIndex="-1"
      className={`nft__modal ${
        show ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex !items-start justify-center outline-none`}
    >
      <div className="absolute top-12 left-36 flex items-center">
        <button type="button" className="flex items-center outline-none">
          <FontAwesomeIcon
            onClick={() => closeMenu()}
            icon={faXmark}
            className="fa-solid fa-xmark text-dark_mode text-4xl"
          />
          <span className="ml-4 text-dark_mode text-lg font-semibold">
            Advance search
          </span>
        </button>
      </div>
      <div className="w-full flex justify-center mt-28">
        <div className="basis-7/12">
          <div className="min-h-[280px] h-auto p-6 bg-white rounded-xl">
            <div className="relative">
              <label htmlFor="advance-search-value" className="hidden">
                Search*
              </label>
              <input
                name="advance_search_value"
                onChange={(e) => searchItems(e.target.value)}
                id="advance-search-value"
                className="block py-4 pl-12 pr-4 w-full text-dark_mode text-base font-medium placeholder:text-gray-300 placeholder:font-normal bg-white rounded-lg border-none focus:outline-none"
                placeholder="Search by collection, NFT or creator"
                autoComplete="off"
                autoFocus
                required
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="fa-solid fa-magnifying-glass text-gray-300 text-lg absolute top-[14px] left-4"
              />
            </div>
            <div className="mt-8 px-4">
              <h6 className="text-dark_mode text-sm font-bold">Categories</h6>
              <div className="nft_taglist flex flex-wrap mt-3 gap-4">
                {categories.map((category) => {
                  return (
                    <span className="tag p-2 text-dark_mode text-xs font-medium bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                      {category.name}
                    </span>
                  );
                })}
              </div>
            </div>
            {(collections.length != 0 ||
              nfts.length != 0 ||
              profiles.length != 0) && (
              <div className="flex justify-between flex-row nft__taglist-results mini-scrollbar h-auto mt-10 p-4 ">
                <div>
                  <h6 className="mb-4 text-dark_mode text-sm font-bold">
                    Collections
                    <span className="ml-2 text-gray-300 font-medium">
                      [ {collections.length} ]
                    </span>
                  </h6>
                  <div className="flex flex-col gap-4">
                    {collections.map((collection, key) => {
                      return (
                        <CollectionCard
                          collection={collection}
                          key={key}
                          closeMenu={() => closeMenu()}
                        />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h6 className="mb-4 text-dark_mode text-sm font-bold">
                    NFTs
                    <span className="ml-2 text-gray-300 font-medium">
                      [ {nfts.length} ]
                    </span>
                  </h6>
                  <div className="flex flex-col gap-4">
                    {nfts.map((nft, key) => {
                      return (
                        <NftCard
                          nft={nft}
                          key={key}
                          closeMenu={() => closeMenu()}
                        />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h6 className="mb-4 text-dark_mode text-sm font-bold">
                    Creators
                    <span className="ml-2 text-gray-300 font-medium">
                      [ {profiles.length} ]
                    </span>
                  </h6>
                  <div className="flex flex-col gap-4">
                    {profiles.map((profile) => {
                      return (
                        <figure className="flex flex-row items-center group relative left-0 hover:left-1 ease-out duration-300">
                          <a
                            href="#"
                            className="absolute top-0 left-0 w-full h-full indent-[-9999px]"
                          >
                            more
                          </a>
                          <img
                            src={profile.image}
                            alt="Avatar 4"
                            className="w-14 h-14 rounded-full border-2 border-solid border-gray-100 object-cover"
                          />
                          <figcaption className="ml-4">
                            <span className="absolute top-[2px] left-[32px] align-middle ml-2">
                              <FontAwesomeIcon
                                icon={faCertificate}
                                className="fa-solid fa-certificate text-nft_institutional text-xl"
                              />
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="fa-solid fa-check text-light_mode text-sm absolute top-[1px] left-[3px]"
                              />
                            </span>
                            <span className="block text-dark_mode text-sm font-semibold group-hover:text-gray-300">
                              {profile.name}
                            </span>
                            <span className="block text-xs text-gray-300">
                              yung_doomari
                            </span>
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearchModel;
