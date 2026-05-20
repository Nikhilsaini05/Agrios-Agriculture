import Footer from "../../Components/Common/footer";
import Navbar from "../../Components/Common/navbar";
import HeroSection from "./heroSection";
import AboutFarmSection from "./aboutFarmSection";
import ProductsSection from "./productSection";
import DistributorSection from "./distributorSection";
import TetsimonialSection from "./tetsimonialSection";
import HealthyLifeSection from "./healthyLifeSection";
import ProjectsSection from "./projectsSection";
import FooterEnd from "../../Components/Common/footerEnd";
import BlogSection from "./blogSection";
import JsPractice from "./jspractice";
import ShowFavrateCard from "./first";


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