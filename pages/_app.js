import "../styles/globals.css";
import Header from "../components/header";
import Head from "next/head";
import { providers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";

import { useCallback, useEffect, useRef, useState } from "react";
import { web3ModalSetup } from "../helpers";
import { generateGrad } from "./../utils/generate-profile-color";
import { post, get } from "./../utils/";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
});
const Noop = ({ children }) => <>{children}</>;
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [injectedProvider, setInjectedProvider] = useState();
  const web3ModalRef = useRef();
  let isCalled = useRef();
  isCalled.current = false;
  // const web3ModalRef.current = web3ModalSetup();
  const [isOnGoerli, setIsOnGoerli] = useState(false);
  const [showConnectButton, setShowConnectButton] = useState(true);

  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [profilePicColor, setProfilePicColor] = useState("");
  const [profileImage, setProfileImage] = useState("");
  
  const [isColour, setIsColor] = useState(true);

  const connectWallet = async () => {
    try {
      loadWeb3Modal();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      var response = await get("get-user-details", {
        address: userAddress,
      });

      if (response.status == 200 && response.data.length == 0) {
        var colorCode = generateGrad();
        setProfilePicColor(colorCode);
        response = await post("user-profile", {
          name: "",
          email: "",
          about: "",
          isColour: true,
          colorCode: colorCode,
          banner: "",
          wallet: userAddress,
        });
      } else if (response.status == 200 && response.data.length != 0) {
        if (response?.data?.row) {
          if (response?.data?.row[0]?.isColour) {
            setIsColor(response?.data?.row[0]?.isColour);
            setProfilePicColor(response.data.row[0].colorCode);
            setProfileImage(response.data.row[0].image);
          }
        }
      }
    };

    if (!showConnectButton && userAddress != "") {
      fetchData();
    }
  }, [userAddress, showConnectButton]);

  useEffect(() => {
    // console.log("walletConnected", walletConnected);
    if (!walletConnected && !isCalled.current) {
      try {
        web3ModalRef.current = web3ModalSetup();
        connectWallet();
        isCalled.current = true;
        return;
      } catch (error) {}
    }
  }, [walletConnected]);

  /////
  const logoutOfWeb3Modal = async () => {
    // var res = await web3ModalRef.current.clearCachedProvider();
    await web3ModalRef.current.clearCachedProvider();
    window.localStorage.clear();
    // await web3ModalRef.current.clearCachedProvider();

    if (
      injectedProvider &&
      injectedProvider.provider
      // /&&
      // typeof injectedProvider.provider.disconnect == "function"
    ) {
      // await injectedProvider.provider.disconnect();
      await web3ModalRef.current.clearCachedProvider();
    }
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1);
  };

  const loadWeb3Modal = useCallback(async () => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      // console.log("injectedProvider", injectedProvider);
      const signer = web3Provider.getSigner();
      const addr = await signer.getAddress();
      setUserAddress(addr.toString());
      setWalletConnected(true);
      setShowConnectButton(false);
      setInjectedProvider(new providers.Web3Provider(provider));

      const { chainId } = await web3Provider.getNetwork();
      checkNetworkIsRinkby(chainId);

      provider.on("chainChanged", (chainId) => {
        checkNetworkIsRinkby(chainId);
        return null;
        // setInjectedProvider(new providers.Web3Provider(provider));
      });

      provider.on("accountsChanged", async () => {
        const web3Provider = new providers.Web3Provider(provider);
        try {
          const signer = web3Provider.getSigner();
          const addr = await signer.getAddress();
          setUserAddress(addr.toString());
          router.reload();
        } catch (error) {
          // setProfilePicColor("white");
          setShowConnectButton(true);
          setUserAddress("");
          isCalled.current = false;
          // setWalletConnected(false);
          // setWalletConnected(false);
        }
        setInjectedProvider(new providers.Web3Provider(provider));
        return null;
      });

      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        // console.log("disconnect");
        console.log(code, reason);
        logoutOfWeb3Modal();
      });
      return null;
    } catch (error) {
      console.log("User Reject Request");
    }
    // eslint-disable-next-line
  }, [setInjectedProvider]);
  // useEffect(() => {
  //   if (web3ModalRef.current.cachedProvider) {
  //     loadWeb3Modal();
  //   }
  // }, [loadWeb3Modal]);
  function checkNetworkIsRinkby(chainId) {
    if (chainId != 5) {
      console.log("error");
      // window.alert("Change Network To Goerli Network");
      toast.error("Change Network To Goerli Network");
      setIsOnGoerli(false);
      // throw new Error("Change Network to Goerli Network");
    } else {
      setIsOnGoerli(true);
    }
    return null;
  }

  const Layout = Component.Layout || Noop;
  return (
    <>
      <Header
        walletConnected={walletConnected}
        userAddress={userAddress}
        profilePicColor={profilePicColor}
        profileImage={profileImage}
        connectWallet={connectWallet}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        showConnectButton={showConnectButton}
        isLoggedIn={true}
      />
      <ApolloProvider client={client}>
        <Layout {...pageProps}>
          <Component
            {...pageProps}
            profilePicColor={profilePicColor}
            profileImage={profileImage}
            isColour={isColour}
            userAddress={userAddress}
            walletConnected={walletConnected}
            injectedProvider={injectedProvider}
            isOnGoerli={isOnGoerli}
          />
        </Layout>
      </ApolloProvider>

      <ToastContainer />
    </>
  );
}

export default MyApp;
