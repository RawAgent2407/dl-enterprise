import AboutSection from "./sections/AboutSection";
import CustomSolutionsSection from "./sections/CustomSolutionsSection";
import ImageSlider from "./sections/ImageSlider";
import ProductsSection from "./sections/ProductsSection";
import PromoSection from "./sections/PromoSection";
import StatsSection from "./sections/StatsSection";
import WhyChooseSection from "./sections/WhyChooseSection";

const HomePage = () => {
  return (
    <div>
      <ImageSlider />
      <AboutSection />
      <ProductsSection />
      <WhyChooseSection />
      <StatsSection />
      <CustomSolutionsSection />
      <PromoSection />
    </div>
  );
};

export default HomePage;
