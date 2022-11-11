import React from "react";
import { useActiveMenu } from "react-active-menu";
import HomeLayout from "../../components/layouts/HomeLayout";

export default function Terms() {
  const { registerContainer, registerSection, registerTrigger } = useActiveMenu(
    {
      smooth: true,
    }
  );
  return (
    <>
      {/* {# nft__terms-of-service-content #} */}
      <section className="nft__terms-of-service-content mt-36 px-36 xl:max-w-full lg:container">
        <div className="ml-[25%] basis-9/12 pl-4">
          <hgroup>
            <h6 className="text-nft_institutional text-lg font-medium">
              Last update on September 30, 2022
            </h6>
            <h2 className="mt-10 text-dark_mode font-semibold">
              Terms of Service
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
                    Termination
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-2"
                    ref={registerTrigger("paragraph-2")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Links to Other Web Sites
                  </a>
                </li>
                <li>
                  <a
                    href="#paragraph-3"
                    ref={registerTrigger("paragraph-3")}
                    className="block mt-3 text-gray-300 text-sm hover:text-dark_mode"
                  >
                    Changes
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="basis-8/12" ref={registerContainer}>
            <h6 className="text-dark_mode text-lg font-medium leading-loose">
              Please read these Terms of Service ("Terms", "Terms of Service")
              carefully before using the https://www.pharmatrace.io website (the
              "Service") operated by Pharmatrace ("us", "we", or "our").
            </h6>
            <p className="mt-16 text-dark_mode leading-loose">
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users and others who access or use the Service.
            </p>
            <p className="mt-4 text-dark_mode leading-loose">
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms then you may not
              access the Service.
            </p>
            <div
              id="paragraph-1"
              ref={registerSection("paragraph-1")}
              className="mt-16"
            >
              <h5 className="mb-4 text-dark_mode font-semibold">Termination</h5>
              <p className="text-dark_mode leading-loose">
                We may terminate or suspend access to our Service immediately,
                without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. All
                provisions of the Terms which by their nature should survive
                termination shall survive termination, including, without
                limitation, ownership provisions, warranty disclaimers,
                indemnity and limitations of liability.
              </p>
            </div>
            <div
              id="paragraph-2"
              ref={registerSection("paragraph-2")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">
                Links to Other Web Sites
              </h4>
              <p className="text-dark_mode leading-loose">
                Our Service may contain links to third-party web sites or
                services that are not owned or controlled by PharmaTrace.
                PharmaTrace has no control over, and assumes no responsibility
                for, the content, privacy policies, or practices of any third
                party web sites or services. You further acknowledge and agree
                that PharmaTrace shall not be responsible or liable, directly or
                indirectly, for any damage or loss caused or alleged to be
                caused by or in connection with use of or reliance on any such
                content, goods or services available on or through any such web
                sites or services.
              </p>
            </div>
            <div
              id="paragraph-3"
              ref={registerSection("paragraph-3")}
              className="mt-10"
            >
              <h4 className="mb-4 text-dark_mode font-semibold">Changes</h4>
              <p className="text-dark_mode leading-loose">
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material we
                will try to provide at least 30 days’ notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
Terms.Layout=HomeLayout
