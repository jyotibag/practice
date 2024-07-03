import React from "react";
import heroGirl from "../../../assets/website/img/hero/hero-bg-1.png";
import gp1 from "../../../assets/website/img/hero/gp-1.png";
import gp2 from "../../../assets/website/img/hero/gp-2.png";
import gp3 from "../../../assets/website/img/hero/gp-3.png";

// style={{
//   background: `url(${heroGirl}) no-repeat center center/cover`,
// }}

const WbHeroSection = () => {
  return (
    <section className="hero-one">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-6 mt-n5">
            <div>
              <h1
                className="hero-one-title fw-bold"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                Find Your Perfect
                <span className="highlighted-text"> Freelancer </span>
                Quick and Easy
              </h1>
              {/* <div className="pt-5">
                <form>
                  <div className="hero-form-wrapper bg-white d-flex position-relative">
                    <div>
                      <select className="form-select shadow-none">
                        <option value="0">All Categories</option>
                        <option value="1">Animation</option>
                        <option value="2">Web Design</option>
                        <option value="3">Graphics</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        placeholder="Search for any service..."
                      />
                      <button className="hero-form-btn position-absolute">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div> */}
              <div className="mt-60 d-flex flex-column flex-sm-row flex-wrap gap-4 align-items-center">
                <div className="d-flex gap-3 align-items-center">
                  <div className="hero-group-img-wrapper">
                    <img src={gp1} className="hero-group-img" alt="" />
                    <img src={gp2} className="hero-group-img" alt="" />
                    <img src={gp3} className="hero-group-img" alt="" />
                  </div>
                  <div>
                    <h3 className="text-white hero-counter-title fw-bold">
                      39M+
                    </h3>
                    <p className="text-white">Happy Customers</p>
                  </div>
                </div>
                <div className="hero-rating">
                  <h3 className="text-white hero-counter-title fw-bold">4.9</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="66"
                    height="11"
                    viewBox="0 0 66 11"
                    fill="none"
                  >
                    <path
                      d="M11.1141 4.15628C11.0407 3.92385 10.8406 3.75929 10.6048 3.73731L7.38803 3.43649L6.11676 0.370622C6.0229 0.145376 5.80934 0 5.57163 0C5.33392 0 5.12027 0.145376 5.02701 0.370622L3.75574 3.43649L0.538508 3.73731C0.302669 3.75973 0.102963 3.92429 0.0291678 4.15628C-0.0442024 4.3887 0.0235566 4.64364 0.201923 4.80478L2.63351 7.0011L1.91656 10.2539C1.8641 10.493 1.95422 10.7403 2.14687 10.8838C2.25042 10.9613 2.37208 11 2.49417 11C2.59908 11 2.70407 10.9713 2.79785 10.9135L5.57163 9.20504L8.3449 10.9135C8.54835 11.0387 8.80417 11.0272 8.99639 10.8838C9.18904 10.7403 9.27916 10.493 9.22671 10.2539L8.50975 7.0011L10.9413 4.80478C11.1196 4.64364 11.1875 4.38923 11.1141 4.15628Z"
                      fill="white"
                    />
                    <path
                      d="M24.8282 4.15628C24.7548 3.92385 24.5547 3.75929 24.3189 3.73731L21.1021 3.43649L19.8309 0.370622C19.737 0.145376 19.5235 0 19.2857 0C19.048 0 18.8344 0.145376 18.7411 0.370622L17.4699 3.43649L14.2526 3.73731C14.0168 3.75973 13.8171 3.92429 13.7433 4.15628C13.6699 4.3887 13.7377 4.64364 13.916 4.80478L16.3476 7.0011L15.6307 10.2539C15.5782 10.493 15.6683 10.7403 15.861 10.8838C15.9645 10.9613 16.0862 11 16.2083 11C16.3132 11 16.4182 10.9713 16.512 10.9135L19.2857 9.20504L22.059 10.9135C22.2625 11.0387 22.5183 11.0272 22.7105 10.8838C22.9032 10.7403 22.9933 10.493 22.9408 10.2539L22.2239 7.0011L24.6555 4.80478C24.8337 4.64364 24.9016 4.38923 24.8282 4.15628Z"
                      fill="white"
                    />
                    <path
                      d="M38.5428 4.15628C38.4694 3.92385 38.2693 3.75929 38.0335 3.73731L34.8167 3.43649L33.5455 0.370622C33.4516 0.145376 33.2381 0 33.0003 0C32.7626 0 32.549 0.145376 32.4557 0.370622L31.1845 3.43649L27.9672 3.73731C27.7314 3.75973 27.5317 3.92429 27.4579 4.15628C27.3845 4.3887 27.4523 4.64364 27.6306 4.80478L30.0622 7.0011L29.3453 10.2539C29.2928 10.493 29.3829 10.7403 29.5756 10.8838C29.6791 10.9613 29.8008 11 29.9229 11C30.0278 11 30.1328 10.9713 30.2266 10.9135L33.0003 9.20504L35.7736 10.9135C35.9771 11.0387 36.2329 11.0272 36.4251 10.8838C36.6178 10.7403 36.7079 10.493 36.6554 10.2539L35.9385 7.0011L38.3701 4.80478C38.5483 4.64364 38.6162 4.38923 38.5428 4.15628Z"
                      fill="white"
                    />
                    <path
                      d="M52.2567 4.15628C52.1833 3.92385 51.9832 3.75929 51.7473 3.73731L48.5306 3.43649L47.2593 0.370622C47.1655 0.145376 46.9519 0 46.7142 0C46.4765 0 46.2629 0.145376 46.1696 0.370622L44.8983 3.43649L41.6811 3.73731C41.4452 3.75973 41.2455 3.92429 41.1717 4.15628C41.0984 4.3887 41.1661 4.64364 41.3445 4.80478L43.7761 7.0011L43.0591 10.2539C43.0067 10.493 43.0968 10.7403 43.2894 10.8838C43.393 10.9613 43.5147 11 43.6367 11C43.7417 11 43.8467 10.9713 43.9404 10.9135L46.7142 9.20504L49.4875 10.9135C49.6909 11.0387 49.9467 11.0272 50.139 10.8838C50.3316 10.7403 50.4217 10.493 50.3693 10.2539L49.6523 7.0011L52.0839 4.80478C52.2622 4.64364 52.33 4.38923 52.2567 4.15628Z"
                      fill="white"
                    />
                    <path
                      opacity="0.3"
                      d="M65.9708 4.15628C65.8974 3.92385 65.6973 3.75929 65.4614 3.73731L62.2447 3.43649L60.9735 0.370622C60.8796 0.145376 60.666 0 60.4283 0C60.1906 0 59.977 0.145376 59.8837 0.370622L58.6124 3.43649L55.3952 3.73731C55.1594 3.75973 54.9597 3.92429 54.8859 4.15628C54.8125 4.3887 54.8802 4.64364 55.0586 4.80478L57.4902 7.0011L56.7732 10.2539C56.7208 10.493 56.8109 10.7403 57.0036 10.8838C57.1071 10.9613 57.2288 11 57.3509 11C57.4558 11 57.5608 10.9713 57.6545 10.9135L60.4283 9.20504L63.2016 10.9135C63.405 11.0387 63.6609 11.0272 63.8531 10.8838C64.0457 10.7403 64.1359 10.493 64.0834 10.2539L63.3664 7.0011L65.798 4.80478C65.9763 4.64364 66.0442 4.38923 65.9708 4.15628Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-xl-5 mt-5 mt-xl-0">
            <div className="">
              {/* <img
                src="assets/img/hero/big-b.png"
                className="hero-one-img text-end"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WbHeroSection;
