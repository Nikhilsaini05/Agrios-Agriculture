import PageName from "../../Components/Common/pageName";
import ServicesCTA from "./servicesCTA";
import ServicesHeroService from "./servicesHeroSection";
import ServicesListSection from "./servicesListSection";


export default function ServicesMain(){
    return(<>
    <PageName/>
    <ServicesHeroService/>
    <ServicesListSection/>
    <ServicesCTA/>
    </>)
}