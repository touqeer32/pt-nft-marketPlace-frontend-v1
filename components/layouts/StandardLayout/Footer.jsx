import React from 'react';
import Link from 'next/link';
const Footer = () => {
    return (
        <footer className='nft__footer logged mx-auto px-36 mt-16 mb-6 xl:max-w-full lg:container'>
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

export default Footer;
