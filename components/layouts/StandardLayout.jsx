import Head from "next/head";
import Footer from "./StandardLayout/Footer";


const StandardLayout = ({ children }) => (

    <>
        <Head>
            <title className="meta">PharmaTrace NFT Marketplace</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}

        <Footer />
    </>)
    ;

export default StandardLayout;
