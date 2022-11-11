import React from "react";
import { useActiveMenu } from "react-active-menu";
import HomeLayout from "../../components/layouts/HomeLayout";

// import ActiveMenuLink from "active-menu-link";

export default function Privacy(props) {
  //   let options = {
  //     default: "paragraph-1",
  //     showHash: false,
  //   };

  //   new ActiveMenuLink(".nft__active-menu-link", options);
  const { registerContainer, registerSection, registerTrigger } = useActiveMenu(
    {
      smooth: true,
    }
  );

  return (
    <>
      <section className="nft__privacy-policy-content mt-36 px-36 xl:max-w-full lg:container">
        <div className="ml-[25%] basis-9/12 pl-4">
          <hgroup>
            <h6 className="text-nft_institutional text-lg font-medium">
              Last update on September 30, 2022
            </h6>
            <h2 className="mt-10 text-dark_mode font-semibold">
              Privacy Policy
            </h2>
          </hgroup>
        </div>
        <div className="flex flex-row gap-4 mt-10">
          <div className="basis-3/12">
            <nav className="nft__active-menu-link w-[90%] mt-2 sticky top-36 triggers">
              <ul>
                <li>
                  <a
                    href="#paragraph-1"
                    ref={registerTrigger("paragraph-1")}
                    className="block text-gray-300 text-sm hover:text-dark_mode"
                  >
                    <span>Your Privacy</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-2"
                    ref={registerTrigger("paragraph-2")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Definitions
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-3"
                    ref={registerTrigger("paragraph-3")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Information Collection and Use
                  </a>
                  <ul className="ml-3">
                    <li>
                      <a
                        href="#sub-paragraph-3.1"
                        ref={registerTrigger("paragraph-3.1")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        1. Types of Data Collected
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sub-paragraph-3.2"
                        ref={registerTrigger("paragraph-3.2")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        2. Use of Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sub-paragraph-3.3"
                        ref={registerTrigger("paragraph-3.3")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        3. Retention of Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sub-paragraph-3.4"
                        ref={registerTrigger("paragraph-3.4")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        4. Transfer of Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sub-paragraph-3.5"
                        ref={registerTrigger("paragraph-3.5")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        5. Disclosure of Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sub-paragraph-3.6"
                        ref={registerTrigger("paragraph-3.6")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        6. Legal Basis for Processing Personal Data Under
                        General Data Protection Regulation (GDPR)
                      </a>
                    </li>
                    <li>
                      <a
                        href="#sub-paragraph-3.7"
                        ref={registerTrigger("paragraph-3.7")}
                        className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                      >
                        7. Legal Basis for Processing Personal Data Under
                        General Data Protection Regulation (GDPR)
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#paragraph-4"
                    ref={registerTrigger("paragraph-4")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Service Providers
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-5"
                    ref={registerTrigger("paragraph-5")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-6"
                    ref={registerTrigger("paragraph-6")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Links to Other Sites
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-7"
                    ref={registerTrigger("paragraph-7")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Children’s Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-8"
                    ref={registerTrigger("paragraph-8")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Changes to This Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="basis-8/12" ref={registerContainer}>
            <h6 className="text-dark_mode text-lg font-medium leading-loose">
              It governs the privacy terms of our website, located at
              pharmatrace.io ("We", "Website" or "Service") and the tools we
              provide the user ("you").
            </h6>
            <div
              id="paragraph-1"
              className="mt-16"
              ref={registerSection("paragraph-1")}
            >
              <h5 className="mb-4 text-dark_mode font-semibold">
                Your Privacy
              </h5>
              <p className="text-dark_mode leading-loose">
                Our Website follows all legal requirements to protect your
                privacy. Our Privacy Policy is a legal statement that explains
                how we may collect information from you, how we may share your
                information, and how you can limit our sharing of your
                information. You can see the terms in our Privacy Policy that
                are in bold and capitalized. These terms have meanings as
                described in the Definitions section below.
              </p>
            </div>
            <section
              id="paragraph-2"
              className="mt-10"
              ref={registerSection("paragraph-2")}
            >
              <h4 className="mb-4 text-dark_mode font-semibold">Definitions</h4>
              <p className="text-dark_mode leading-loose">
                <span className="font-semibold">PERSONAL DATA:</span>
                Personal Data means data about a living individual who can be
                identified from those data (or from those and other information
                either in our possession or likely to come into our possession).
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">COOKIES:</span>
                Cookies are small pieces of data stored on a User’s device.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">DATA CONTROLLER:</span>
                Data Controller means a natural or legal person who (either
                alone or jointly or in common with other persons) determines the
                purposes for which and the manner in which any personal data
                are, or are to be, processed. For the purpose of this Privacy
                Policy, we are a Data Controller of your data.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">
                  DATA PROCESSORS (or SERVICE PROVIDERS):
                </span>
                Data Processor (or Service Provider) means any natural or legal
                person who processes the data on behalf of the Data Controller.
                We may use the services of various Service Providers in order to
                process your data more effectively.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">DATA SUBJECT:</span>
                Data Subject is any living individual who is the subject of
                Personal Data.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">USER:</span>
                The User is the individual using our Service. The User
                corresponds to the Data Subject, who is the subject of Personal
                Data.
              </p>
            </section>
            <section
              id="paragraph-3"
              ref={registerSection("paragraph-3")}
              className="mt-10"
            >
              <group>
                <h4 className="mb-4 text-dark_mode font-semibold">
                  Information Collection and Use
                </h4>
                <h6 className="mt-10 text-dark_mode text-lg font-medium leading-loose">
                  We collect several different types of information for various
                  purposes to provide and improve our Service to you.
                </h6>
              </group>
            </section>
            <section
              id="sub-paragraph-3.2"
              ref={registerSection("paragraph-3.2")}
            >
              <h6
                id="sub-paragraph-3.1"
                ref={registerSection("paragraph-3.1")}
                className="mt-10 mb-4 text-dark_mode font-semibold"
              >
                1. Types of Data Collected
              </h6>
              <p className="text-dark_mode leading-loose">
                <span className="font-semibold">PERSONAL DATA:</span>
                While using our Service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you ("Personal Data"). Personally
                identifiable information may include, but is not limited to:
                Email address, Name, Address, State, Province, ZIP/Postal code,
                City, Cookies and Usage Data. We may use your Personal Data to
                contact you with newsletters, marketing or promotional materials
                and other information that may be of interest to you. You may
                opt out of receiving any, or all, of these communications from
                us by following the unsubscribe link or instructions provided in
                any email we send.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">USAGE DATA:</span>
                We may also collect information how the Service is accessed and
                used ("Usage Data"). This Usage Data may include information
                such as your computer’s Internet Protocol address (e.g. IP
                address), browser type, browser version, the pages of our
                Service that you visit, the time and date of your visit, the
                time spent on those pages, unique device identifiers and other
                diagnostic data.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">
                  TRACKING AND COOKIES DATA:
                </span>
                We use cookies and similar tracking technologies to track the
                activity on our Service and hold certain information. Cookies
                are files with small amount of data which may include an
                anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your device. Tracking technologies
                also used are beacons, tags, and scripts to collect and track
                information and to improve and analyze our Service. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of our Service.
                Examples of Cookies we use: session cookies (we use these
                cookies to operate our Service) and preference cookies (we use
                these cookies to remember your preferences and various
                settings).
              </p>
            </section>
            <section
              id="sub-paragraph-3.2"
              ref={registerSection("paragraph-3.2")}
            >
              <group>
                <h6 className="mt-10 mb-4 text-dark_mode font-semibold">
                  2. Use of Data
                </h6>
                <h6 className="mt-4 text-dark_mode text-lg font-medium leading-loose">
                  We use the collected data for various purposes:
                </h6>
              </group>
              <p className="mt-4 text-dark_mode leading-loose">
                To provide and maintain our Service.
                <br />
                To notify you about changes to our Service.
                <br />
                To allow you to participate in interactive features of our
                Service when you choose to do so.
                <br />
                To provide customer support.
                <br />
                To gather analysis or valuable information so that we can
                improve our Service.
                <br />
                To monitor the usage of our Service.
                <br />
                To detect, prevent and address technical issues.
                <br />
                To provide you with news, special offers and general information
                about other goods, services and events which we offer that are
                similar to those that you have already purchased or enquired
                about unless you have opted not to receive such information.
              </p>
            </section>
            <section
              id="sub-paragraph-3.3"
              ref={registerSection("paragraph-3.3")}
            >
              <h6 className="mt-10 mb-4 text-dark_mode font-semibold">
                3. Retention of Data
              </h6>
              <p className="mt-4 text-dark_mode leading-loose">
                We will retain your Personal Data only for as long as is
                necessary for the purposes set out in this Privacy Policy. We
                will retain and use your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                We will also retain Usage Data for internal analysis purposes.
                Usage Data is generally retained for a shorter period of time,
                except when this data is used to strengthen the security or to
                improve the functionality of our Service, or we are legally
                obligated to retain this data for longer time periods.
              </p>
            </section>
            <div id="sub-paragraph-3.4" ref={registerSection("paragraph-3.4")}>
              <h6 className="mt-10 mb-4 text-dark_mode font-semibold">
                4. Transfer of Data
              </h6>
              <p className="mt-4 text-dark_mode leading-loose">
                Your information, including Personal Data, may be transferred to
                — and maintained on — computers located outside of your state,
                province, country or other governmental jurisdiction where the
                data protection laws may differ than those from your
                jurisdiction.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                We will take all steps reasonably necessary to ensure that your
                data is treated securely and in accordance with this Privacy
                Policy and no transfer of your Personal Data will take place to
                an organization or a country unless there are adequate controls
                in place including the security of your data and other personal
                information.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                Your consent to this Privacy Policy followed by your submission
                of such information represents your agreement to that transfer.
              </p>
            </div>
            <div id="sub-paragraph-3.5" ref={registerSection("paragraph-3.5")}>
              <h6 className="mt-10 mb-4 text-dark_mode font-semibold">
                5. Disclosure of Data
              </h6>
              <p className="mt-4 text-dark_mode leading-loose">
                Business Transaction. If we are involved in a merger,
                acquisition or asset sale, your Personal Data may be
                transferred. We will provide notice before your Personal Data is
                transferred and becomes subject to a different Privacy Policy.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                Disclosure for Law Enforcement. Under certain circumstances, we
                may be required to disclose your Personal Data if required to do
                so by law or in response to valid requests by public authorities
                (e.g. a court or a government agency).
              </p>
            </div>
            <div id="sub-paragraph-3.6" ref={registerSection("paragraph-3.6")}>
              <h6 className="mt-10 mb-4 text-dark_mode font-semibold">
                6. Legal Basis for Processing Personal Data Under General Data
                Protection Regulation (GDPR)
              </h6>
              <p className="mt-4 text-dark_mode leading-loose">
                If you are from the European Economic Area (EEA), PharmaTrace’s
                legal basis for collecting and using the personal information
                described in this Privacy Policy depends on the Personal Data we
                collect and the specific context in which we collect it.
                PharmaTrace may process your Personal Data because:
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                We need to perform a contract with you.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                The processing is in our legitimate interests and it’s not
                overridden by your rights.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                To comply with the law.
              </p>
            </div>
            <div id="sub-paragraph-3.7" ref={registerSection("paragraph-3.7")}>
              <h6 className="mt-10 mb-4 text-dark_mode font-semibold">
                7. Legal Basis for Processing Personal Data Under General Data
                Protection Regulation (GDPR)
              </h6>
              <p className="mt-4 text-dark_mode leading-loose">
                If you are a resident of the European Economic Area (EEA), you
                have certain data protection rights. PharmaTrace aims to take
                reasonable steps to allow you to correct, amend, delete, or
                limit the use of your Personal Data.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                If you wish to be informed what Personal Data we hold about you
                and if you want it to be removed from our systems, please
                contact us.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                In certain circumstances, you have the following data protection
                rights:
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">
                  The right to access, update
                </span>{" "}
                or delete the information we have on you.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">
                  The right of rectification.
                </span>{" "}
                You have the right to have your information rectified if that
                information is inaccurate or incomplete.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">The right to object.</span> You
                have the right to object to our processing of your Personal
                Data.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">The right of restriction.</span>{" "}
                You have the right to request that we restrict the processing of
                your personal information.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">
                  The right to data portability.
                </span>{" "}
                You have the right to be provided with a copy of your Personal
                Data in a structured, machine-readable and commonly used format.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <span className="font-semibold">
                  The right to withdraw consent.
                </span>{" "}
                You also have the right to withdraw your consent at any time
                where PharmaTrace relied on your consent to process your
                personal information.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                Please note that we may ask you to verify your identity before
                responding to such requests.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                You have the right to complain to a Data Protection Authority
                about our collection and use of your Personal Data. For more
                information, please contact your local data protection authority
                in the European Economic Area (EEA).
              </p>
            </div>
            <div
              id="paragraph-4"
              ref={registerSection("paragraph-4")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Service Providers
              </h4>
              <p className="mt-4 text-dark_mode leading-loose">
                We may employ third-party companies and individuals to
                facilitate our Service ("Service Providers"), to provide the
                Service on our behalf, to perform Service-related services or to
                assist us in analyzing how our Service is used.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                These third parties have access to your Personal Data only to
                perform these tasks on our behalf and are obligated not to
                disclose or use it for any other purpose.
              </p>
            </div>
            <div
              id="paragraph-5"
              ref={registerSection("paragraph-5")}
              className="mt-10"
            >
              <group>
                <h4 className="mb-4 text-dark_mode font-semibold">Analytics</h4>
                <h6 className="mt-10 text-dark_mode text-lg font-medium leading-loose">
                  We may use third-party Service Providers to monitor and
                  analyze the use of our Service.
                </h6>
              </group>
              <h6 className="mt-10 text-dark_mode font-semibold leading-loose">
                Google Analytics
              </h6>
              <p className="mt-4 text-dark_mode leading-loose">
                Google Analytics ("Google") is a web analytics service offered
                by Google Inc. that tracks and reports website traffic. Google
                uses the data collected to track and monitor the use of our
                Service. This data is shared with other Google services. Google
                may use the collected data to contextualize and personalize the
                ads of its own advertising network. You can opt-out of having
                made your activity on the Service available to Google Analytics
                by installing the Google Analytics opt-out browser add-on. The
                add-on prevents the Google Analytics JavaScript (ga.js,
                analytics.js, and dc.js) from sharing information with Google
                Analytics about visits activity. For more information on the
                privacy practices of Google, please visit the Google Privacy &
                Terms web page:
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                <a
                  href="https://www.google.com/intl/en/policies/privacy"
                  className="font-semibold underline hover:no-underline"
                  target="_blank"
                >
                  https://www.google.com/intl/en/policies/privacy
                </a>
              </p>
            </div>
            <div
              id="paragraph-6"
              ref={registerSection("paragraph-6")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Links to Other Sites
              </h4>
              <p className="mt-4 text-dark_mode leading-loose">
                Our Service may contain links to other sites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party’s site. We strongly advise you to
                review the Privacy Policy of every site you visit.We have no
                control over and assume no responsibility for the content,
                privacy policies or practices of any third party sites or
                services.
              </p>
            </div>
            <div
              id="paragraph-7"
              ref={registerSection("paragraph-7")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Children’s Privacy
              </h4>
              <p className="mt-4 text-dark_mode leading-loose">
                Our Service does not address anyone under the age of 18
                ("Children").
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                We do not knowingly collect personally identifiable information
                from anyone under the age of 18. If you are a parent or guardian
                and you are aware that your Children has provided us with
                Personal Data, please contact us. If we become aware that we
                have collected Personal Data from children without verification
                of parental consent, we take steps to remove that information
                from our servers.
              </p>
            </div>
            <div
              id="paragraph-8"
              ref={registerSection("paragraph-8")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Changes to This Privacy Policy
              </h4>
              <p className="mt-4 text-dark_mode leading-loose">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </p>
              <p className="mt-4 text-dark_mode leading-loose">
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
Privacy.Layout=HomeLayout
