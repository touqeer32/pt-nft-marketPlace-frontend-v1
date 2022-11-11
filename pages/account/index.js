import React from "react";
import Account from "../../components/account";
import HomeLayout from "../../components/layouts/HomeLayout";


export default function Profile(probs) {
  return (
    <div>
      {/* <Header />   */}
      <Account
        profilePicColor={probs.profilePicColor}
        isColour={probs.isColour}
        userAddress={probs.userAddress}
        injectedProvider={probs.injectedProvider}
        walletConnected={probs.walletConnected}
        isOnGoerli={probs.isOnGoerli}
      />
      {/* <Footer /> */}
    </div>
  );
}
Profile.Layout = HomeLayout;
