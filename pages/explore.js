import ExploreDetails from "../components/explore";
import HomeLayout from "../components/layouts/HomeLayout";

export default function Explore(probs) {
  return (
    <div>
      <ExploreDetails
        profilePicColor={probs.profilePicColor}
        isColour={probs.isColour}
        userAddress={probs.userAddress}
        walletConnected={probs.walletConnected}
        injectedProvider={probs.injectedProvider}
        isOnGoerli={probs.isOnGoerli}
      />
    </div>
  );
}
Explore.Layout = HomeLayout;
