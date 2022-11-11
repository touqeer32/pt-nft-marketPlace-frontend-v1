import React from "react";
import StandardLayout from "../../components/layouts/StandardLayout";

export default function VerficationCode() {
    return (
        <section className="nft__verification-code-content flex items-center mt-36 px-36 xl:max-w-full lg:container">
            <div className="basis-5/12 ml-[8.333333%]">
                <hgroup>
                    <h4 className="text-dark_mode font-semibold">
                        Verification Code
                    </h4>
                    <h6 className="mt-4 text-gray-300 text-base">
                        The Verification code sent to:
                        <a href="#" className="underline hover:text-dark_mode">f.laterra@pharmatrace.io</a>
                    </h6>
                </hgroup>
                <form id="verification-code" className="w-[90%] mt-10">
                    <div className="relative">
                        <label htmlFor="value-verification-code" className="hidden">Verification Code*</label>
                        <input name="value_verification_code" id="value-verification-code" className="block mt-2 p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30" placeholder="Verification Code*" autoComplete="off" required/>
                        <button type="submit" className="absolute right-1 bottom-1 rounded-lg text-dark_mode text-sm font-medium px-7 py-3 bg-nft_institutional active:bg-nft_institutional_dark active:scale-[0.94] hover:scale-[0.97] ease-out duration-300">
                            Verify
                        </button>
                    </div>
                </form>
            </div>
            <div className="basis-4/12 ml-[8.333333%]">
                <figure>
                    <img src="/commons/illustration-verification-code.svg" alt="Illustration - Verification Code" className="h-[400px] object-cover"/>
                </figure>
            </div>
        </section>
    )
}
VerficationCode.Layout = StandardLayout;
