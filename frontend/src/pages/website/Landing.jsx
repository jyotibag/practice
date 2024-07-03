import React from "react";
import { Link } from "react-router-dom";
import { WbHeroSection, FeaturedProducts, TopSellers } from "../../components";
import FirstBanner from "../../components/website/landing/FirstBanner";
import RecentPosts from "../../components/website/landing/RecentPosts";
import SecondBanner from "../../components/website/landing/SecondBanner";
import Testimonial from "../../components/website/Testimonial";

const Landing = () => {
  return (
    <>
      <WbHeroSection />
      <FeaturedProducts />
      <FirstBanner />
      <RecentPosts />
      <TopSellers />
      <SecondBanner />
      <Testimonial />
    </>
  );
};

export default Landing;
