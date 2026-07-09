import { aboutSections } from "@/entities/school";
import { AboutSectionPage } from "@/features/about-page";

export default function AboutPage() {
  return <AboutSectionPage section={aboutSections[0]} />;
}
