import { Outlet } from "react-router";
import Footer from "../Components/Common/footer";
import Navbar from "../Components/Common/navbar";
import FooterEnd from "../Components/Common/footerEnd";

export default function PublicLayout  () {
    return <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    <FooterEnd />
    </>
}


