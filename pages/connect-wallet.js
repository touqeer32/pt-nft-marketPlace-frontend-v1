import React from "react";
import Wallet from "../components/wallet";
import HomeLayout from "../components/layouts/HomeLayout";

export default function connect(){
    return(
        <div>
            <Wallet />
        </div>
    )
}
connect.Layout=HomeLayout
