import React, { useCallback, useRef } from "react";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import testimonialImg from "../../assets/website/img/testimonial/au-1.png";

const Testimonial = () => {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const sliderRef = useRef(null);

  let imageArr = [];
  {
    numbers.map((i, index) => {
      const el = (
        <div className="swiper-slide" key={nanoid()}>
          <div className="testimonial-card bg-white">
            <div className="testimonial-content">
              <div className="d-flex gap-2 align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    d="M17.5 0C27.165 0 35 7.83502 35 17.5C35 27.165 27.165 35 17.5 35C7.83502 35 0 27.165 0 17.5C0 7.83502 7.83502 0 17.5 0Z"
                    fill="#F7F5F0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.1352 21.6719C18.4288 20.3063 18.0757 18.823 18.0757 17.222C18.0757 15.5975 18.5054 14.2555 19.3647 13.196C20.2241 12.1365 21.5602 11.6068 23.3731 11.6068V13.8317C22.7374 13.8317 22.2724 13.973 21.9781 14.2555C21.6838 14.538 21.5367 15.0795 21.5367 15.88V16.2332H24.1147V21.6719H19.1352ZM11.8246 21.6719C11.1183 20.3063 10.7651 18.823 10.7651 17.222C10.7651 15.5975 11.1948 14.2555 12.0542 13.196C12.9135 12.1365 14.2497 11.6068 16.0626 11.6068V13.8317C15.4269 13.8317 14.9619 13.973 14.6676 14.2555C14.3733 14.538 14.2261 15.0795 14.2261 15.88V16.2332H16.8042V21.6719H11.8246Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="testimonial-title">Very Solid!!</span>
              </div>
              <p className="testimonial-feedback">
                There are many variations of a passages of Lorem Ipsum
                available, but the as majority have suffered alteration in some
                form.
              </p>
            </div>
            <div className="testimonial-meta d-flex align-items-center justify-content-between">
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <img
                    src={testimonialImg}
                    className="testimonial-author-img"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="testimonial-author-name fw-semibold">
                    Black Marvin
                  </h4>
                  <p className="testimonial-author-title">Nursing Assistant</p>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="95"
                  height="16"
                  viewBox="0 0 95 16"
                  fill="none"
                >
                  <path
                    d="M55.863 5.78722C55.8112 5.62592 55.6753 5.5107 55.5102 5.48436L50.5915 4.77331L48.3781 0.246895C48.3037 0.0954657 48.1516 0 47.9866 0C47.8215 0 47.6695 0.0954657 47.595 0.250187L45.4107 4.78977L40.492 5.53375C40.327 5.56008 40.1911 5.6753 40.1393 5.8366C40.0875 5.99791 40.1329 6.17567 40.2526 6.29089L43.8219 9.80997L42.9967 14.794C42.9676 14.9619 43.0355 15.1297 43.1714 15.2285C43.2459 15.2845 43.3365 15.3141 43.4271 15.3141C43.4983 15.3141 43.5662 15.2976 43.631 15.2614L48.0222 12.8945L52.4264 15.2351C52.4911 15.268 52.559 15.2845 52.627 15.2845C52.8664 15.2845 53.0638 15.0836 53.0638 14.84C53.0638 14.8038 53.0606 14.7709 53.0509 14.738L52.1998 9.78364L55.7465 6.2448C55.8727 6.12629 55.9147 5.94853 55.863 5.78722Z"
                    fill="#FF9E15"
                  />
                  <path
                    d="M74.9191 5.78722C74.8673 5.62592 74.7314 5.5107 74.5664 5.48436L69.6477 4.77331L67.4343 0.246895C67.3599 0.0954657 67.2078 0 67.0427 0C66.8777 0 66.7256 0.0954657 66.6512 0.250187L64.4669 4.78977L59.5482 5.53375C59.3832 5.56008 59.2473 5.6753 59.1955 5.8366C59.1437 5.99791 59.189 6.17567 59.3087 6.29089L62.878 9.80997L62.0529 14.794C62.0237 14.9619 62.0917 15.1297 62.2276 15.2285C62.302 15.2845 62.3926 15.3141 62.4832 15.3141C62.5544 15.3141 62.6224 15.2976 62.6871 15.2614L67.0783 12.8945L71.4825 15.2351C71.5472 15.268 71.6152 15.2845 71.6831 15.2845C71.9226 15.2845 72.12 15.0836 72.12 14.84C72.12 14.8038 72.1168 14.7709 72.1071 14.738L71.256 9.78364L74.8026 6.2448C74.9288 6.12629 74.9709 5.94853 74.9191 5.78722Z"
                    fill="#FF9E15"
                  />
                  <path
                    d="M94.9784 5.78722C94.9267 5.62592 94.7908 5.5107 94.6257 5.48436L89.707 4.77331L87.4936 0.246895C87.4192 0.0954657 87.2671 0 87.1021 0C86.937 0 86.7849 0.0954657 86.7105 0.250187L84.5262 4.78977L79.6075 5.53375C79.4425 5.56008 79.3066 5.6753 79.2548 5.8366C79.203 5.99791 79.2483 6.17567 79.3681 6.29089L82.9374 9.80997L82.1122 14.794C82.0831 14.9619 82.151 15.1297 82.2869 15.2285C82.3613 15.2845 82.452 15.3141 82.5426 15.3141C82.6138 15.3141 82.6817 15.2976 82.7464 15.2614L87.1377 12.8945L91.5418 15.2351C91.6066 15.268 91.6745 15.2845 91.7425 15.2845C91.9819 15.2845 92.1793 15.0836 92.1793 14.84C92.1793 14.8038 92.1761 14.7709 92.1664 14.738L91.3153 9.78364L94.862 6.2448C94.9882 6.12629 95.0302 5.94853 94.9784 5.78722Z"
                    fill="#FF9E15"
                  />
                  <path
                    d="M35.8039 5.78722C35.7521 5.62592 35.6162 5.5107 35.4512 5.48436L30.5325 4.77331L28.3191 0.246895C28.2446 0.0954657 28.0925 0 27.9275 0C27.7625 0 27.6104 0.0954657 27.5359 0.250187L25.3517 4.78977L20.433 5.53375C20.2679 5.56008 20.132 5.6753 20.0802 5.8366C20.0285 5.99791 20.0738 6.17567 20.1935 6.29089L23.7628 9.80997L22.9376 14.794C22.9085 14.9619 22.9764 15.1297 23.1124 15.2285C23.1868 15.2845 23.2774 15.3141 23.368 15.3141C23.4392 15.3141 23.5071 15.2976 23.5719 15.2614L27.9631 12.8945L32.3673 15.2351C32.432 15.268 32.4999 15.2845 32.5679 15.2845C32.8074 15.2845 33.0048 15.0836 33.0048 14.84C33.0048 14.8038 33.0015 14.7709 32.9918 14.738L32.1408 9.78364L35.6874 6.2448C35.8136 6.12629 35.8557 5.94853 35.8039 5.78722Z"
                    fill="#FF9E15"
                  />
                  <path
                    d="M15.7448 5.78722C15.693 5.62592 15.5571 5.5107 15.3921 5.48436L10.4734 4.77331L8.25997 0.246895C8.18555 0.0954657 8.03345 0 7.86842 0C7.70339 0 7.55129 0.0954657 7.47687 0.250187L5.29258 4.78977L0.373883 5.53375C0.208848 5.56008 0.0729369 5.6753 0.0211612 5.8366C-0.0306145 5.99791 0.0146893 6.17567 0.134421 6.29089L3.70371 9.80997L2.87853 14.794C2.84941 14.9619 2.91737 15.1297 3.05328 15.2285C3.12771 15.2845 3.21831 15.3141 3.30892 15.3141C3.38011 15.3141 3.44807 15.2976 3.51279 15.2614L7.90402 12.8945L12.3082 15.2351C12.3729 15.268 12.4409 15.2845 12.5088 15.2845C12.7483 15.2845 12.9457 15.0836 12.9457 14.84C12.9457 14.8038 12.9424 14.7709 12.9327 14.738L12.0817 9.78364L15.6283 6.2448C15.7545 6.12629 15.7966 5.94853 15.7448 5.78722Z"
                    fill="#FF9E15"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
      imageArr.push(el);
    });
  }

  // const handlePrev = useCallback(() => {
  //   if (!sliderRef.current) return;
  //   sliderRef.current.swiper.slidePrev();
  // }, []);

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return;
  //   sliderRef.current.swiper.slideNext();
  // }, []);

  return (
    <section className="bg-offWhite py-110">
      <div className="container">
        <div className="row mb-40 justify-content-center">
          <div className="co-auto">
            <div className="text-center">
              <h2 className="fw-bold section-title">Testimonial</h2>
              <p className="section-desc">Real Stories from Our Community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="swiper testimonialsSlider">
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            loop={true}
            ref={sliderRef}
            autoplay={true}
            // pauseOnMouseEnter={true}
            pagination={{
              clickable: true,
            }}
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

export default Testimonial;
