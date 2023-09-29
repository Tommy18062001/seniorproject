import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Layout() {

    return (
        <div className="">
            <Header/>
            <Outlet />
            <Footer />
        </div>
    )
}