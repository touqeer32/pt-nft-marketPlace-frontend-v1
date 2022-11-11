import Link from "next/link";
import { faBars, faWallet, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import PopUpMenu from "./menu/PopUpMenu";
import ProfileMenu from "./menu/ProfileMenu";
import AdvanceSearchModel from "./models/AdvanceSearchModel";
import useClickOutside from "../helpers/hooks/useClickOutside";

export default function Header(props) {
  const router = useRouter();
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [popupProfile, setPopUpProfile] = useState(false);
  let domNode =useClickOutside(()=>{
    setPopUpProfile(false)
  })
  const renderButton = () => {
    if (props.showConnectButton) {
      return (
        <button
          type="button"
          onClick={props.connectWallet}
          className="py-2 px-6 mr-4 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium"
        >
          <FontAwesomeIcon
            icon={faWallet}
            className="fa-solid fa-wallet mr-4 text-lg"
          />
          Connect Wallet
        </button>
      );
    } else {
      return (
        <>
          {router.pathname != "/create" && (
            <Link href="/create">
              <button
                type="button"
                className="py-2 px-6 mr-4 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium"
              >
                Create NFT
              </button>
            </Link>
          )}
        </>
      );
    }
  };

  return (
    <div className="bg-header">
      {/* <ToastContainer /> */}
      <header className="nft__header mx-auto z-10 py-4 px-20 xl:max-w-full lg:container bg-transparent fixed top-0 left-0">
        <div className="flex justify-between">
          <figure className="w-[15rem]">
            <Link href="/">
              <img
                src="https://uploads-ssl.webflow.com/633d8ab48e232033d3a07503/633d8b2d56251044a5e9718e_trademark-pharmatrace-nft.svg"
                alt="Trademark PharmaTrace NFT"
                className="object-cover"
              />
            </Link>
          </figure>
          <nav className="nft__primary-nav flex">
            {renderButton()}
            {props.profilePicColor && props.walletConnected && (
              <button
                type="button"
                style={{
                  backgroundColor:
                    router.pathname === "/" ? "#FFFFFF" : "rgb(243 244 246)",
                }}
                className="py-2 px-6 mr-4 rounded-full text-dark_mode text-sm font-medium"
              >
                <FontAwesomeIcon icon={faBell} />{" "}
              </button>
            )}
            <button
              type="button"
              style={{
                backgroundColor:
                  router.pathname === "/" ? "#FFFFFF" : "rgb(243 244 246)",
              }}
              onClick={()=>setAdvanceSearch(!advanceSearch)}
              className="py-2 px-6 mr-4 rounded-full text-dark_mode text-sm font-medium"
            >
              ⌘/J
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  router.pathname === "/" ? "#FFFFFF" : "rgb(243 244 246)",
              }}
              onClick={() => setPopUpMenu(true)}
              className="py-2 px-6 mr-4 rounded-full text-dark_mode text-sm font-medium"
            >
              <FontAwesomeIcon icon={faBars} />{" "}
            </button>
            <div ref={domNode}>
              {props.profilePicColor && props.walletConnected && (
                <figure
                  onClick={() => setPopUpProfile(!popupProfile)}
                  className="w-14 h-14 rounded-full cursor-pointer border-2 border-solid border-gray-100 object-cover"
                  style={{ background: props.profilePicColor }}
                ></figure>
              )}
              {props.profileImage && (
                <button
                  onClick={() => setPopUpProfile(!popupProfile)}
                  data-popover-target="popover-account-profile"
                  data-popover-placement="bottom"
                  data-popover-trigger="click"
                >
                  <figure>
                    <img
                      src={props.profileImage}
                      alt="Avatar 10"
                      className="w-14 h-14 rounded-full border-2 border-solid border-gray-100 object-cover"
                    />
                  </figure>
                </button>
              )}
              <ProfileMenu
                show={popupProfile}
                closeMenu={() => setPopUpProfile(false)}
              />
            </div>
          </nav>
        </div>
      </header>
      <AdvanceSearchModel show={advanceSearch} closeMenu={()=>setAdvanceSearch(false)}/>
      <PopUpMenu show={popUpMenu} closeMenu={() => setPopUpMenu(false)} />
      
    </div>
  );
}
