import React from "react";
import WbLogoSvg from "./WbLogoSvg";

const WbSubsFooter = () => {
  return (
    <div className="footer-newsletter pb-60">
      <div className="row justify-content-between row-gap-4">
        <div className="col-lg-6 col-xl-4">
          <div>
            <WbLogoSvg className="d-block mb-4" />
            <p className="text-white">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout the
              point of using lorem varius sit amet ipsum.
            </p>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="d-flex flex-column justify-content-end">
            <h3 className="text-white mb-3">Subscribe to Our Newsletter</h3>
            <p className="footer-newsletter-desc mb-30">
              We'll keep you updated with the best new jobs.
            </p>
            <form>
              <div className="relative footer-newsletter-form d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Enter your email address"
                />
                <button className="footer-newsletter-btn">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WbSubsFooter;
