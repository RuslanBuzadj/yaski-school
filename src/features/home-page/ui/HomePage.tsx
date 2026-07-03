import { GallerySection } from "./GallerySection";
import { HeroSection } from "./HeroSection";
import { NewsSection } from "./NewsSection";
import { StaffSection } from "./StaffSection";


export function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <GallerySection />
      <StaffSection />
    </>
  );
}
