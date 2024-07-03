import React from "react";
import firstbannerimg from "../../../assets/website/img/cta/cta-img.png";

const FirstBanner = () => {
  return (
    <section className="cta-area">
      <div className="container">
        <div className="bg-darkGreen cta-area-bg">
          <div className="row align-items-center">
            <div className="col-12 col-xl-7">
              <div
                className="cta-content"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                <p className="cta-subtitle fw-bold mb-2">Explore New Life</p>
                <h2 className="section-title-light fw-bold mb-4">
                  Don’t just find. Be found put your CV in front of great
                  employers
                </h2>
                <p className="section-desc-light mb-40">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words.
                </p>
                <a href="buyer-dashboard.html" className="cta-btn-link">
                  Job Post Now
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
              <div className="cta-counter mt-5">
                <div className="cta-counter-item">
                  <h3 className="cta-counter-title fw-bold">
                    <span className="counter">950</span>
                    <span>M+</span>
                  </h3>
                  <p className="cta-counter-desc fw-bold">Total Freelancers</p>
                </div>
                <div className="cta-counter-item">
                  <h3 className="cta-counter-title fw-bold">
                    <span className="counter">32</span>
                    <span>M+</span>
                  </h3>
                  <p className="cta-counter-desc fw-bold">Total Freelancers</p>
                </div>
                <div className="cta-counter-item">
                  <h3 className="cta-counter-title fw-bold">
                    <span className="counter">120</span>
                    <span>M+</span>
                  </h3>
                  <p className="cta-counter-desc fw-bold">Total Freelancers</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-5 mt-5 mt-xl-0">
              <div className="cta-img">
                <img src={firstbannerimg} className="img-fluid w-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstBanner;
