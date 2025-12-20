/** @format */

import AboutTimeline from "../components/AboutTimeline";
import CustomSolutionsSection from "../components/CustomSolutionsSection";
import ImageSlider from "../components/ImageSlider";
import StatsSection from "../components/StatsSection";

/* eslint-disable @next/next/no-img-element */
const AboutUsPage = () => {
  return (
    <>
      <ImageSlider />
      <AboutTimeline />
      <StatsSection />
      <CustomSolutionsSection />
    </>
  );
};

export default AboutUsPage;
