import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import CustomSolutionsSection from "../components/CustomSolutionsSection";
import ImageSlider from "../components/ImageSlider";
import ProductsSection from "../components/ProductsSection";
import StatsSection from "../components/StatsSection";
import WhyChooseSection from "../components/WhyChooseSection";


const HomePage = () => {
  return (
    <div>
      <ImageSlider />
      <AboutSection />
      <ProductsSection />
      <WhyChooseSection />
      <StatsSection />
      <CustomSolutionsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
