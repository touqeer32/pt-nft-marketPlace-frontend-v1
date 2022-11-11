import React from "react";
import { useRouter } from "next/router";

export default function StartOwnCollection() {
    const router = useRouter();
  return (
    <div>
    <div className="bg-background rounded">
      <div className=" p-32 lg:grid grid-cols-2 gap-4">
        <div>
          <div>
            <p className="text-4xl font-medium">Start your own collection today and sell your NFTs</p>
            <br />
            <p className="font-medium text-gray-600 text-xl">Mint Free | Earn $MINT | Instant</p>
          </div>
          <br />
          <br />
          <br />
          <button onClick={()=>router.push("/create")} className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-lime-400 sm:w-auto active:bg-lime-100 hover:bg-blue-400 focus:outline-none focus:ring">
                Create NFT
          </button>
        </div>

        <div>
          <div className="lg:grid grid-cols-2 gap-4">
            <div className="lg:grid grid-cols-2 gap-4">

                
                
                <div className="bg-white px-2 py-2 rounded">
                    <img src="./coinbase.png" width={200} />
                </div>         
                <p className="mt-14 font-medium">Set up your wallet</p>   
                </div>




                <div className="lg:grid grid-cols-2 gap-4">
                <div className="bg-white px-2 py-2 rounded">
                    <img src="./coinbase.png" width={200} />
                </div>         
                <p className="mt-14 font-medium w-full">Create your collection</p>     
                </div>


                
    
                <div className="lg:grid grid-cols-2 gap-4">
                <div className="bg-white px-2 py-2 rounded">
                    <img src="./coinbase.png" width={200} />
                </div>         
                <p className="mt-14 font-medium">Add your NFTs</p>     
                </div>
    
                

                <div className="lg:grid grid-cols-2 gap-4">
                <div className="bg-white px-2 py-2 rounded">
                    <img src="./coinbase.png" width={200} />
                </div>         
                <p className="mt-14 font-medium">List them for sale</p>   
                </div>
                
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
