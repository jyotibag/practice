import React from "react";
import seller from "../../../assets/website/img/top-seller/1.png";

const TopSellers = () => {
  return (
    <section className="top-sellers-area bg-offWhite py-110">
      <div className="container">
        <div className="row justify-content-between align-items-end mb-40">
          <div className="col-auto">
            <h2 className="fw-bold section-title">Top Sellers</h2>
            <p className="section-desc">
              Get some Inspirations from 86K+ skills
            </p>
          </div>
          <div className="col-auto mt-30 mt-md-0">
            <div className="d-flex justify-content-end">
              <a href="#" className="w-btn-link">
                View More
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
        </div>
        <div className="row row-gap-4 justify-content-center row-cols-md-2 row-cols-lg-3 row-cols-xl-5">
          <article
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="linear"
          >
            <div className="bg-white top-seller-card position-relative">
              <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                <p className="job-type-badge-tertiary">Top Seller</p>
                <p className="job-type-badge-secondary">$90/hr</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="seller-profile-img mb-4">
                  <img src={seller} alt="" />
                </div>

                <h3 className="top-seller-name fw-bold">Sufankho Jhon</h3>
                <p className="top-seller-title">UiUx Designer</p>
                <div className="top-seller-rating mb-4">
                  <p className="d-flex align-items-center top-seller-rating">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1141 4.65628C11.0407 4.42385 10.8406 4.25929 10.6048 4.23731L7.38803 3.93649L6.11676 0.870622C6.0229 0.645376 5.80934 0.5 5.57163 0.5C5.33392 0.5 5.12027 0.645376 5.02701 0.870622L3.75574 3.93649L0.538508 4.23731C0.302669 4.25973 0.102963 4.42429 0.0291678 4.65628C-0.0442024 4.8887 0.0235566 5.14364 0.201923 5.30478L2.63351 7.5011L1.91656 10.7539C1.8641 10.993 1.95422 11.2403 2.14687 11.3838C2.25042 11.4613 2.37208 11.5 2.49417 11.5C2.59908 11.5 2.70407 11.4713 2.79785 11.4135L5.57163 9.70504L8.3449 11.4135C8.54835 11.5387 8.80417 11.5272 8.99639 11.3838C9.18904 11.2403 9.27916 10.993 9.22671 10.7539L8.50975 7.5011L10.9413 5.30478C11.1196 5.14364 11.1875 4.88923 11.1141 4.65628Z"
                        fill="currentColor"
                      />
                    </svg>
                    4.9 <span className="top-seller-review">(399 Reviews)</span>
                  </p>
                </div>
                <a href="freelancer-details.html" className="w-btn-primary-lg">
                  View Profile
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
          </article>
          <article>
            <div
              className="bg-white top-seller-card position-relative"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="linear"
            >
              <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                <p className="job-type-badge-tertiary">Top Seller</p>
                <p className="job-type-badge-secondary">$90/hr</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="seller-profile-img mb-4">
                  <img src={seller} alt="" />
                </div>

                <h3 className="top-seller-name fw-bold">Sufankho Jhon</h3>
                <p className="top-seller-title">UiUx Designer</p>
                <div className="top-seller-rating mb-4">
                  <p className="d-flex align-items-center top-seller-rating">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1141 4.65628C11.0407 4.42385 10.8406 4.25929 10.6048 4.23731L7.38803 3.93649L6.11676 0.870622C6.0229 0.645376 5.80934 0.5 5.57163 0.5C5.33392 0.5 5.12027 0.645376 5.02701 0.870622L3.75574 3.93649L0.538508 4.23731C0.302669 4.25973 0.102963 4.42429 0.0291678 4.65628C-0.0442024 4.8887 0.0235566 5.14364 0.201923 5.30478L2.63351 7.5011L1.91656 10.7539C1.8641 10.993 1.95422 11.2403 2.14687 11.3838C2.25042 11.4613 2.37208 11.5 2.49417 11.5C2.59908 11.5 2.70407 11.4713 2.79785 11.4135L5.57163 9.70504L8.3449 11.4135C8.54835 11.5387 8.80417 11.5272 8.99639 11.3838C9.18904 11.2403 9.27916 10.993 9.22671 10.7539L8.50975 7.5011L10.9413 5.30478C11.1196 5.14364 11.1875 4.88923 11.1141 4.65628Z"
                        fill="currentColor"
                      />
                    </svg>
                    4.9 <span className="top-seller-review">(399 Reviews)</span>
                  </p>
                </div>
                <a href="freelancer-details.html" className="w-btn-primary-lg">
                  View Profile
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
          </article>
          <article>
            <div
              className="bg-white top-seller-card position-relative"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="linear"
            >
              <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                <p className="job-type-badge-tertiary">Top Seller</p>
                <p className="job-type-badge-secondary">$90/hr</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="seller-profile-img mb-4">
                  <img src={seller} alt="" />
                </div>

                <h3 className="top-seller-name fw-bold">Naymr Jhon</h3>
                <p className="top-seller-title">UiUx Designer</p>
                <div className="top-seller-rating mb-4">
                  <p className="d-flex align-items-center top-seller-rating">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1141 4.65628C11.0407 4.42385 10.8406 4.25929 10.6048 4.23731L7.38803 3.93649L6.11676 0.870622C6.0229 0.645376 5.80934 0.5 5.57163 0.5C5.33392 0.5 5.12027 0.645376 5.02701 0.870622L3.75574 3.93649L0.538508 4.23731C0.302669 4.25973 0.102963 4.42429 0.0291678 4.65628C-0.0442024 4.8887 0.0235566 5.14364 0.201923 5.30478L2.63351 7.5011L1.91656 10.7539C1.8641 10.993 1.95422 11.2403 2.14687 11.3838C2.25042 11.4613 2.37208 11.5 2.49417 11.5C2.59908 11.5 2.70407 11.4713 2.79785 11.4135L5.57163 9.70504L8.3449 11.4135C8.54835 11.5387 8.80417 11.5272 8.99639 11.3838C9.18904 11.2403 9.27916 10.993 9.22671 10.7539L8.50975 7.5011L10.9413 5.30478C11.1196 5.14364 11.1875 4.88923 11.1141 4.65628Z"
                        fill="currentColor"
                      />
                    </svg>
                    4.9 <span className="top-seller-review">(399 Reviews)</span>
                  </p>
                </div>
                <a href="freelancer-details.html" className="w-btn-primary-lg">
                  View Profile
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
          </article>
          <article>
            <div
              className="bg-white top-seller-card position-relative"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="linear"
            >
              <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                <p className="job-type-badge-tertiary">Top Seller</p>
                <p className="job-type-badge-secondary">$90/hr</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="seller-profile-img mb-4">
                  <img src={seller} alt="" />
                </div>

                <h3 className="top-seller-name fw-bold">Madge Jordan</h3>
                <p className="top-seller-title">UiUx Designer</p>
                <div className="top-seller-rating mb-4">
                  <p className="d-flex align-items-center top-seller-rating">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1141 4.65628C11.0407 4.42385 10.8406 4.25929 10.6048 4.23731L7.38803 3.93649L6.11676 0.870622C6.0229 0.645376 5.80934 0.5 5.57163 0.5C5.33392 0.5 5.12027 0.645376 5.02701 0.870622L3.75574 3.93649L0.538508 4.23731C0.302669 4.25973 0.102963 4.42429 0.0291678 4.65628C-0.0442024 4.8887 0.0235566 5.14364 0.201923 5.30478L2.63351 7.5011L1.91656 10.7539C1.8641 10.993 1.95422 11.2403 2.14687 11.3838C2.25042 11.4613 2.37208 11.5 2.49417 11.5C2.59908 11.5 2.70407 11.4713 2.79785 11.4135L5.57163 9.70504L8.3449 11.4135C8.54835 11.5387 8.80417 11.5272 8.99639 11.3838C9.18904 11.2403 9.27916 10.993 9.22671 10.7539L8.50975 7.5011L10.9413 5.30478C11.1196 5.14364 11.1875 4.88923 11.1141 4.65628Z"
                        fill="currentColor"
                      />
                    </svg>
                    4.9 <span className="top-seller-review">(399 Reviews)</span>
                  </p>
                </div>
                <a href="freelancer-details.html" className="w-btn-primary-lg">
                  View Profile
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
          </article>
          <article
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="linear"
          >
            <div className="bg-white top-seller-card position-relative">
              <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                <p className="job-type-badge-tertiary">Top Seller</p>
                <p className="job-type-badge-secondary">$90/hr</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="seller-profile-img mb-4">
                  <img src={seller} alt="" />
                </div>

                <h3 className="top-seller-name fw-bold">Sufankho Jhon</h3>
                <p className="top-seller-title">UiUx Designer</p>
                <div className="top-seller-rating mb-4">
                  <p className="d-flex align-items-center top-seller-rating">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1141 4.65628C11.0407 4.42385 10.8406 4.25929 10.6048 4.23731L7.38803 3.93649L6.11676 0.870622C6.0229 0.645376 5.80934 0.5 5.57163 0.5C5.33392 0.5 5.12027 0.645376 5.02701 0.870622L3.75574 3.93649L0.538508 4.23731C0.302669 4.25973 0.102963 4.42429 0.0291678 4.65628C-0.0442024 4.8887 0.0235566 5.14364 0.201923 5.30478L2.63351 7.5011L1.91656 10.7539C1.8641 10.993 1.95422 11.2403 2.14687 11.3838C2.25042 11.4613 2.37208 11.5 2.49417 11.5C2.59908 11.5 2.70407 11.4713 2.79785 11.4135L5.57163 9.70504L8.3449 11.4135C8.54835 11.5387 8.80417 11.5272 8.99639 11.3838C9.18904 11.2403 9.27916 10.993 9.22671 10.7539L8.50975 7.5011L10.9413 5.30478C11.1196 5.14364 11.1875 4.88923 11.1141 4.65628Z"
                        fill="currentColor"
                      />
                    </svg>
                    4.9 <span className="top-seller-review">(399 Reviews)</span>
                  </p>
                </div>
                <a href="freelancer-details.html" className="w-btn-primary-lg">
                  View Profile
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
          </article>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
