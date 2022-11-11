import Banner from "../components/banner";
import We from "../components/we";
import TopSellers from "../components/topsellers";
import TopCollection from "../components/topcollections";
import RecentBid from "../components/recentbid";
import HomeLayout from "../components/layouts/HomeLayout";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <We />
        <TopSellers />
        <TopCollection />
        <RecentBid />
      </main>
    </div>
  );
}
Home.Layout=HomeLayout