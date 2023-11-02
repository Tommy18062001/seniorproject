import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Layout() {
    const [isScrolled, setIsScrolled] = useState(false);

    return (
        <div className="">
            <Header isScrolled={isScrolled}/>
            <Outlet context={[isScrolled, setIsScrolled]} />
            <Footer />
        </div>
    )
}