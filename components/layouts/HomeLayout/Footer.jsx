import React from "react";
import FooterSubscribe from "../../search/footer-subscribe";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="nft__footer mx-auto px-36 mt-36 mb-6 xl:max-w-full lg:container">
      <div className="flex flex-row justify-between">
        <div className="basis-4/12">
          <h5 className="text-dark_mode font-medium">
            Subscribe to our exclusive list and be the first to know about
            upcoming on new NFTs, Auctions and more!
          </h5>
          <form id="footer-newsletter" className="mt-10">
            <div className="relative">
              <input
                type="search"
                className="block py-4 px-6 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:ring-gray-300/60 focus:border-gray-300/60"
                placeholder="Enter your email to get started"
                required
              />
              <button
                type="submit"
                className="absolute right-1 bottom-1 rounded-lg text-dark_mode text-sm font-medium px-7 py-3 bg-nft_institutional hover:bg-nft_institutional_dark focus:outline-none focus:ring-blue-300"
              >
                Join
              </button>
            </div>
          </form>
        </div>
        <div className="basis-5/12">
          <div className="flex flex-row justify-between">
            <nav>
              <h6 className="mb-6 text-dark_mode text-sm font-bold">
                Marketplace
              </h6>
              <a
                href="#"
                className="block first:mt-0 text-dark_mode text-sm hover:underline"
              >
                Explore
              </a>
              <a
                href="#"
                className="block mt-2 text-dark_mode text-sm hover:underline"
              >
                Stats
              </a>
              <a
                href="#"
                className="block mt-2 text-dark_mode text-sm hover:underline"
              >
                How to works?
              </a>
            </nav>
            <nav>
              <h6 className="mb-6 text-dark_mode text-sm font-bold">Company</h6>
              <a
                href="#"
                className="block first:mt-0 text-dark_mode text-sm hover:underline"
              >
                About Us
              </a>
              <a
                href="#"
                className="block mt-2 text-dark_mode text-sm hover:underline"
              >
                FAQ
              </a>
            </nav>
            <nav>
              <h6 className="mb-6 text-dark_mode text-sm font-bold">
                My Account
              </h6>
              <a
                href="#"
                className="block first:mt-0 text-dark_mode text-sm hover:underline"
              >
                Profile
              </a>
              <a
                href="#"
                className="block mt-2 text-dark_mode text-sm hover:underline"
              >
                Activities
              </a>
              <a
                href="#"
                className="block mt-2 text-dark_mode text-sm hover:underline"
              >
                Created
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-14">
        <div className="basis-10/12">
          <hr />
          <div className="flex items-center justify-between mt-10 px-8">
            <nav className="nft__copy">
              <span className="text-gray-300 text-xs">
                © NFT PharmaTrace is Proudly Owned by
                <a
                  href="https://www.pharmatrace.io"
                  target="_blank"
                  className="underline hover:text-dark_mode"
                >
                  PharmaTrace
                </a>
              </span>
              <Link
                href="/legal-page/terms-of-service"
                className="ml-4 underline text-gray-300 text-xs hover:text-dark_mode"
              >
                <span className="ml-4 underline text-gray-300 text-xs hover:text-dark_mode">
                  {" "}
                  Term of Service
                </span>
              </Link>
              <Link
                href="/legal-page/privacy-policy"
                className="ml-4 underline text-gray-300 text-xs hover:text-dark_mode"
              >
                <span className="ml-4 underline text-gray-300 text-xs hover:text-dark_mode">
                  {" "}
                  Privacy Policy
                </span>
              </Link>
              <Link
                href="/legal-page/cookie-policy"
                className="ml-4 underline text-gray-300 text-xs hover:text-dark_mode"
              >
                <span className="ml-4 underline text-gray-300 text-xs hover:text-dark_mode">
                  {" "}
                  Cookie Policy
                </span>
              </Link>
            </nav>
            <nav className="nft__social">
              <a
                href="https://www.linkedin.com/company/pharmatrace"
                target="_blank"
                className="first:ml-0 text-gray-300 text-xl hover:text-dark_mode"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://twitter.com/pharmatrace"
                target="_blank"
                className="ml-4 text-gray-300 text-xl hover:text-dark_mode"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/pharmatrace"
                target="_blank"
                className="ml-4 text-gray-300 text-xl hover:text-dark_mode"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://github.com/pharmatrace"
                target="_blank"
                className="ml-4 text-gray-300 text-xl hover:text-dark_mode"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.xing.com/pages/pharmatrace"
                target="_blank"
                className="ml-4 text-gray-300 text-xl hover:text-dark_mode"
              >
                <i className="fa-brands fa-xing"></i>
              </a>
              <a
                href="https://t.me/pharmatrace"
                target="_blank"
                className="ml-4 text-gray-300 text-xl hover:text-dark_mode"
              >
                <i className="fa-brands fa-telegram"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
