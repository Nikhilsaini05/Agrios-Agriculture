import Footer from "../../Components/Common/footer";
import Navbar from "../../Components/Common/navbar";
import HeroSection from "./HeroSection";
import AboutFarmSection from "./AboutFarmSection";
import ProductsSection from "./ProductSection";
import DistributorSection from "./DistributorSection";
import TetsimonialSection from "./TetsimonialSection";
import HealthyLifeSection from "./HealthyLifeSection";
import ProjectsSection from "./ProjectsSection";
import FooterEnd from "../../Components/Common/footerEnd";
import BlogSection from "./BlogSection";
import JsPractice from "./jspractice";
import ShowFavrateCard from "./First";


export default function HomeMain() {
    return <>
        <HeroSection />
        <AboutFarmSection />
        <ProductsSection />
        <DistributorSection />
        <HealthyLifeSection />
        <TetsimonialSection />
        <ProjectsSection />
        <BlogSection />
        
    </>
}