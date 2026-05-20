import PageName from "../../Components/Common/pageName";
import AboutHeroSection from "./aboutHeroSection";
import AboutStorySection from "./aboutStorySection";
import AboutTestimonialsSection from "./aboutTestimonialsSection";
import AboutVideoSection from "./aboutVedioSection";

export default function AboutMain(){
    return(<>
    <PageName/>
    <AboutHeroSection/>
    <AboutStorySection/>
    <AboutVideoSection/>
    <AboutTestimonialsSection/>
    </>)
}