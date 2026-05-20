import PageName from "../../Components/Common/pageName";
import AboutHeroSection from "./aboutHeroSection";
import AboutStorySection from "./AboutStorySection";
import AboutTestimonialsSection from "./AboutTestimonialsSection";
import AboutVideoSection from "./AboutVedioSection";

export default function AboutMain(){
    return(<>
    <PageName/>
    <AboutHeroSection/>
    <AboutStorySection/>
    <AboutVideoSection/>
    <AboutTestimonialsSection/>
    </>)
}