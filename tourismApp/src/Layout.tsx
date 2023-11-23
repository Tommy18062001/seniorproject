import { Outlet } from "react-router-dom";
import Header from "./components/pageComponent/Header";
import Footer from "./components/pageComponent/Footer";
import { useState } from "react";

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="">
      <Header isScrolled={isScrolled} />
      <Outlet context={{setIsScrolled}} />
      <Footer />
    </div>
  );
}
