import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import product1 from "../../../assets/website/img/job/product-1.jpg";
import "react-multi-carousel/lib/styles.css";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const FeaturedProducts = () => {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const sliderRef = useRef(null);

  let imageArr = [];
  {
    numbers.map((i, index) => {
      const el = (
        <Link key={nanoid()} to={`#`} className="text-decoration-none">
          <article className="swiper-slide">
            {/* <div className="p-2 featuredcat" key={nanoid()}> */}
            <div className="job-post bg-offWhite position-relative">
              <div className="job-type-badge position-absolute d-flex flex-column gap-2">
                <p className="job-type-badge-primary">Hourly {index + 1}</p>
                <p className="job-type-badge-secondary">Urgent</p>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="job-post-icon">
                  <img src={product1} alt="" />
                </div>
                <p className="job-post-subtitle fw-bold">₹46,990</p>
                {/* <p className="job-post-subtitle fw-normal">$10 - $15</p> */}
                <h3 className="job-post-title fw-semibold">
                  <span href="#" className="text-decoration-none">
                    Canon R100 Mirrorless Camera...
                  </span>
                </h3>
                {/* <a href="job-details.html" className="w-btn-primary-xl">
                View Details
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
              </a> */}
              </div>
            </div>

            {/* </div> */}
          </article>
        </Link>
      );
      imageArr.push(el);
    });
  }

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section className="py-110">
      <div className="container">
        <div className="row mb-40 justify-content-between align-items-end">
          <div className="col-md-auto">
            <h2 className="fw-bold section-title">Featured Products</h2>
            <p className="section-desc">
              Get some Inspirations from 86K+ skills
            </p>
          </div>
          <div className="col-md-auto position-relative mt-30 mt-md-0">
            <div className="carousel-button-group">
              <div className="d-flex gap-3">
                <button
                  onClick={handlePrev}
                  className="recentJobPrev swiper-prev"
                >
                  <IoChevronBack />
                </button>
                <button
                  onClick={handleNext}
                  className="recentJobNext swiper-next"
                >
                  <IoChevronForward />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper recentJob #swiper-container">
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            loop={true}
            autoplay={true}
            ref={sliderRef}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {imageArr.map((img) => {
              return <SwiperSlide key={nanoid()}>{img}</SwiperSlide>;
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
