import React from "react";
import { useActiveMenu } from "react-active-menu";
import HomeLayout from "../../components/layouts/HomeLayout";

export default function Policy() {
  const { registerContainer, registerSection, registerTrigger } = useActiveMenu(
    {
      smooth: true,
    }
  );
  return (
    <div>
      <section className="nft__cookie-policy-content mt-36 px-36 xl:max-w-full lg:container">
        <div className="ml-[25%] basis-9/12 pl-4">
          <hgroup>
            <h6 className="text-nft_institutional text-lg font-medium">
              Last update on September 30, 2022
            </h6>
            <h2 className="mt-10 text-dark_mode font-semibold">
              Cookie Policy
            </h2>
          </hgroup>
        </div>
        <div className="flex flex-row gap-4 mt-10">
          <div className="basis-3/12">
            <nav className="nft__active-menu-link w-[90%] mt-2 sticky top-36">
              <ul>
                <li>
                  <a
                    href="#paragraph-1"
                    ref={registerTrigger("paragraph-1")}
                    className="block text-gray-300 text-sm hover:text-dark_mode"
                  >
                    What Cookies Are
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-2"
                    ref={registerTrigger("paragraph-2")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    How NFT PharmaTrace Uses Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-3"
                    ref={registerTrigger("paragraph-3")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Essential Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-4"
                    ref={registerTrigger("paragraph-4")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Third-party Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-5"
                    ref={registerTrigger("paragraph-5")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    What Your Choices Regarding Cookies Are
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-6"
                    ref={registerTrigger("paragraph-6")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Where You Can Find More Information About Cookies
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="basis-8/12" ref={registerContainer}>
            <h6 className="text-dark_mode text-lg font-medium leading-loose">
              NFT PharmaTrace ("us", "we", or "our") uses cookies on
              nft.pharmatrace.io (the "Service"). By using the Service, you
              consent to the use of cookies. Our Cookies Policy explains what
              cookies are, how we use cookies, how third-parties we may partner
              with may use cookies on the Service, your choices regarding
              cookies and further information about cookies.
            </h6>
            <div
              id="paragraph-1"
              ref={registerSection("paragraph-1")}
              className="mt-16"
            >
              <h5 className="mb-4 text-dark_mode font-semibold">
                What Cookies Are
              </h5>
              <p className="text-dark_mode leading-loose">
                Cookies are small pieces of text sent by your web browser by a
                website you visit. A cookie file is stored in your web browser
                and allows the Service or a third-party to recognize you and
                make your next visit easier and the Service more useful to you.
                Cookies can be "persistent" or "session" cookies.
              </p>
            </div>
            <div
              id="paragraph-2"
              ref={registerSection("paragraph-2")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                How NFT PharmaTrace Uses Cookies
              </h4>
              <p className="text-dark_mode leading-loose">
                When you use and access the Service, we may place a number of
                cookies files in your web browser. We use cookies for the
                following purposes: to enable certain functions of the Service,
                to provide analytics, to store your preferences, to enable
                advertisements delivery, including behavioral advertising. We
                use both session and persistent cookies on the Service and we
                use different types of cookies to run the Service.
              </p>
            </div>
            <div
              id="paragraph-3"
              ref={registerSection("paragraph-3")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Essential Cookies
              </h4>
              <p className="text-dark_mode leading-loose">
                We may use essential cookies to authenticate users and prevent
                fraudulent use of user accounts. Furthermore we use essential
                cookies for saving your cookie preference settings.
              </p>
            </div>
            <div
              id="paragraph-4"
              ref={registerSection("paragraph-4")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Third-party Cookies
              </h4>
              <p className="text-dark_mode leading-loose">
                In addition to our own cookies, we may also use various
                third-parties cookies to report usage statistics of the Service,
                deliver advertisements on and through the Service, and so on.
              </p>
            </div>
            <div
              id="paragraph-5"
              ref={registerSection("paragraph-5")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                What Your Choices Regarding Cookies Are
              </h4>
              <p className="text-dark_mode leading-loose">
                If you’d like to delete cookies or instruct your web browser to
                delete or refuse cookies, please visit the help pages of your
                web browser. Please note, however, that if you delete cookies or
                refuse to accept them, you might not be able to use all of the
                features we offer, you may not be able to store your
                preferences, and some of our pages might not display properly.
                You can change the cookie settings for this site in Privacy
                Overview.
              </p>
            </div>
            <div
              id="paragraph-6"
              ref={registerSection("paragraph-6")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Where You Can Find More Information About Cookies
              </h4>
              <p className="text-dark_mode leading-loose">
                You can learn more about cookies and the following third-party
                websites:
                <br />
                AllAboutCookies:{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  className="font-semibold underline hover:no-underline"
                  target="_blank"
                >
                  https://www.allaboutcookies.org
                </a>
                <br />
                Network Advertising Initiative:{" "}
                <a
                  href="https://www.networkadvertising.org"
                  className="font-semibold underline hover:no-underline"
                  target="_blank"
                >
                  https://www.networkadvertising.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
Policy.Layout=HomeLayout
