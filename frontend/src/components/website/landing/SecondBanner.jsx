import React from "react";
import banner2Img from "../../../assets/website/img/cta/cta-bg.png";

const SecondBanner = () => {
  return (
    <section className="pt-110 bg-offWhite">
      <div className="container">
        <div
          className="cta-wrapper position-relative"
          style={{
            backgroundImage: `url(${banner2Img})`,
          }}
        >
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                <h2 className="section-title-light fw-bold mb-4">
                  Find the talent needed to get your business growing.
                </h2>
                <p className="text-white mb-5">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour.
                </p>
                <a href="contact.html" className="cta-btn-link">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M9 9L13 5M13 5L9 1M13 5L1 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <img
                  src="assets/img/cta/men-women.png"
                  className="cta-people position-absolute d-none d-lg-block"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondBanner;
