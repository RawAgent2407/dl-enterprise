import AboutSection from "../components/AboutSection";
import CategorySection from "../components/CategorySection";
import ContactSection from "../components/ContactSection";
import CustomSolutionsSection from "../components/CustomSolutionsSection";
import ImageSlider from "../components/ImageSlider";
import StatsSection from "../components/StatsSection";
import WhyChooseSection from "../components/WhyChooseSection";
import { getCategories } from "@/lib/queries/category";


export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div>
      <ImageSlider />
      <AboutSection />
      <CategorySection categories={categories} />
      <WhyChooseSection />
      <StatsSection />
      <CustomSolutionsSection />
      <ContactSection />
    </div>
  );
};