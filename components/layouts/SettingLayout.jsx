import Head from "next/head";
import Footer from "./StandardLayout/Footer";
import Link from "next/link";

function isActive(name) {
    if (typeof window === undefined) {
        return window.location.href.includes(name)
    }
    return false
}

const ActivityLayout = ({ children }) => (
    <>
        <Head>
            <title className="meta">PharmaTrace NFT Marketplace</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="nft__activity-my-activity mt-36 px-36 xl:max-w-full lg:container">
            <div className="ml-[25%] basis-9/12 pl-4">
                <hgroup>
                    <h4 className="text-dark_mode font-semibold">Wallets sync</h4>
                </hgroup>
            </div>
            <div className="flex flex-row gap-4 mt-10">
                <div className="basis-3/12">
                    <nav className="sticky top-36 flex flex-col">
                        <span className="block text-gray-300">Account settings</span>
                        <Link href="/account/profile">
                            <a className={`block first-of-type:mt-10 text-base font-semibold hover:text-gray-300 ${isActive('profile') ? 'text-nft_institutional' : 'text-dark_mode'} [.active]:pointer-events-none`} aria-current="page">
                                Edit profile
                            </a>
                        </Link>
                        <Link href="/account/settings/wallet" >
                            <a className={`block mt-2 text-dark_mode text-base font-semibold hover:text-gray-300 ${isActive('wallet') ? 'text-nft_institutional' : 'text-dark_mode'} `}>
                                Wallets sync
                            </a>
                        </Link>
                    </nav>
                </div>
                {children}
            </div>
        </section>
        <Footer />
    </>)
    ;

export default ActivityLayout;