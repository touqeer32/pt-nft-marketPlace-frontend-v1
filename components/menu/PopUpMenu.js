import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
  faXing,
} from "@fortawesome/free-brands-svg-icons";

export default function PopUpMenu({ show, closeMenu }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (typeof window !== undefined) {
      const theme = localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : "light";
      setTheme(theme);
    }
  }, []);
  const toggleTheme = (value) => {
    console.log(value, "value");
    setTheme(value);
    if (value == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", value);
  };
  return (
    <div id="modal-menu" tabIndex="-1" aria-hidden="true" className={`${show?'':'hidden'} nft__modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center outline-none`}>
        <div className="absolute top-12 left-36 flex items-center">
        <button type="button" className="flex items-center outline-none" data-modal-toggle="modal-menu">
            <FontAwesomeIcon onClick={()=>closeMenu()} icon={faXmark} className="text-dark_mode text-4xl"/>
            <span className="ml-4 text-dark_mode text-lg font-semibold">Menu</span>
        </button>
        <button
          id="theme-toggle"
          type="button"
          className="ml-10 flex items-center"
          data-toggle-dark="light"
        >
          {theme == "dark" ? (
            <span
              id="theme-toggle-light-icon"
              className={`flex items-center`}
              onClick={() => toggleTheme("light")}
            >
              <span className="flex items-center justify-center w-[35px] h-[35px] bg-light_mode rounded-lg">
                <FontAwesomeIcon icon={faSun} />
              </span>
              <span className="ml-3 font-medium">Use light-mode</span>
            </span>
          ) : (
            <span
              id="theme-toggle-dark-icon"
              className="flex items-center"
              onClick={() => toggleTheme("dark")}
            >
              <span className="flex items-center justify-center w-[35px] h-[35px] bg-dark_mode rounded-lg">
                <i className="fa-solid fa-moon text-light_mode text-xl"></i>
                <FontAwesomeIcon
                  icon={faMoon}
                  className="text-light_mode text-xl"
                />
              </span>
              <span className="ml-3 font-medium">Use dark-mode</span>
            </span>
          )}
        </button>
      </div>
      <div className="w-full flex justify-end mt-20">
        <div className="basis-6/12">
          <nav className="nft__primary-nav space-y-8">
            <a
              href="#"
              className="block text-dark_mode text-8xl font-bold relative left-0 hover:left-2 hover:text-gray-300 ease-out duration-300"
            >
              Explore
            </a>
            <a
              href="#"
              className="block text-dark_mode text-8xl font-bold relative left-0 hover:left-2 hover:text-gray-300 ease-out duration-300"
            >
              Statistics
            </a>
            <a
              href="#"
              className="block text-dark_mode text-8xl font-bold relative left-0 hover:left-2 hover:text-gray-300 ease-out duration-300"
            >
              How it works?
            </a>
            <div className="space-y-4">
              <a
                href="#"
                className="block text-dark_mode text-2xl font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-dark_mode text-2xl font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-dark_mode text-2xl font-semibold relative left-0 hover:left-1 hover:text-gray-300 ease-out duration-300"
              >
                Term of Service
              </a>
            </div>
          </nav>
          <nav className="nft__social mt-36">
            <a
              href="https://www.linkedin.com/company/pharmatrace"
              target="_blank"
              className="first:ml-0 text-dark_mode text-3xl relative bottom-0 hover:bottom-1 hover:text-gray-300 ease-out duration-300"
            >
              <FontAwesomeIcon icon={faLinkedin} className="fa-brands" />
            </a>
            <a
              href="https://twitter.com/pharmatrace"
              target="_blank"
              className="ml-4 text-dark_mode text-3xl hover:text-gray-300 relative bottom-0 hover:bottom-1 hover:text-gray-300 ease-out duration-300"
            >
              <FontAwesomeIcon icon={faTwitter} className="fa-brands" />
            </a>
            <a
              href="https://www.instagram.com/pharmatrace"
              target="_blank"
              className="ml-4 text-dark_mode text-3xl hover:text-gray-300 relative bottom-0 hover:bottom-1 hover:text-gray-300 ease-out duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} className="fa-brands" />
            </a>
            <a
              href="https://github.com/pharmatrace"
              target="_blank"
              className="ml-4 text-dark_mode text-3xl hover:text-gray-300 relative bottom-0 hover:bottom-1 hover:text-gray-300 ease-out duration-300"
            >
              <FontAwesomeIcon icon={faGithub} className="fa-brands" />
            </a>
            <a
              href="https://www.xing.com/pages/pharmatrace"
              target="_blank"
              className="ml-4 text-dark_mode text-3xl hover:text-gray-300 relative bottom-0 hover:bottom-1 hover:text-gray-300 ease-out duration-300"
            >
              <FontAwesomeIcon icon={faXing} className="fa-brands" />
            </a>
            <a
              href="https://t.me/pharmatrace"
              target="_blank"
              className="ml-4 text-dark_mode text-3xl hover:text-gray-300 relative bottom-0 hover:bottom-1 hover:text-gray-300 ease-out duration-300"
            >
              <FontAwesomeIcon icon={faTelegram} className="fa-brands" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
