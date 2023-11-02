import { Link } from "react-router-dom";
import { BsTelephoneInbound, BsTwitter } from "react-icons/bs";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" mt-16 bg-header text-white">
      <div className="grid-display w-11/12 mx-auto p-4 gap-4 relative">
        <div className="w-full h-48 p-4">
          <Link to={"/"} className="items-center cursor-pointer text-4xl logoFont">
            Fanilo Tour
          </Link>
          <p className="text-sm mb-4 mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
            consequuntur esse quis repudiandae eligendi quidem. Ut deleniti
            harum itaque qui quibusdam perspiciatis!
          </p>
          <p>Link</p>
        </div>

        <div className="w-full h-48 p-4">
          <h1 className="text-lg mb-7">Contact details</h1>
          <p className="flex gap-2 items-center mb-2">
            <CiLocationOn />
            <span className="text-sm">Lot 170 parcelle 22/31 Tanamborozano</span>
          </p>
          <p className="flex gap-2 items-center mb-2">
            <CiMail />
            <span className="text-sm">johantony@hotmail.com</span>
          </p>
          <p className="flex gap-2 items-center mb-2">
            <BsTelephoneInbound />
            <span className="text-sm">034 08 880 10</span>{" "}
          </p>
        </div>
        <div className="w-full h-48 p-4">
          <h1 className="text-lg mb-6">Latest Feeds</h1>
          <Link to={"/destinations"} className="text-sm hover:underline">Explore Destinations</Link>
          <p className="text-sm mt-2">Check our social media to learn more about our next plan</p>
          <ul className="flex gap-2 items-center mt-4">
            <li className="text-xl bg-white p-2 rounded-full text-[#31343c] hover:text-[#E1306C] cursor-pointer transition duration-250"><AiOutlineInstagram /></li>
            <li className="text-xl bg-white p-2 rounded-full text-[#31343c] hover:text-[#4267B2] cursor-pointer transition duration-250"><FaFacebookF /></li>
            <li className="text-xl bg-white p-2 rounded-full text-[#31343c] hover:text-[#FF0000] cursor-pointer transition duration-250"><AiOutlineYoutube /></li>
            <li className="text-xl bg-white p-2 rounded-full text-[#31343c] hover:text-[#1DA1F2] cursor-pointer transition duration-250"><BsTwitter /></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center py-2 border-t w-11/12 mx-auto">
        <p className="text-sm">All Rights Reserved - Copyright @2023</p>
        <p className="logoFont text-xl">Fanilo Tour</p>
      </div>
    </footer>
  );
}
