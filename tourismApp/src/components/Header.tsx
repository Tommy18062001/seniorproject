import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { SiForestry } from "react-icons/si";
import { PiUserCircleLight } from "react-icons/pi";
import logo from '../assets/FaniloTours.png'

export default function Header({ isScrolled = true }) {
  const { user } = useContext(UserContext);
  let defaultStyle;
  if (isScrolled) {
    defaultStyle =
      "fixed top-0 flex justify-between px-3 py-2 py-auto w-full z-50 text-white bg-primary";
  } else {
    defaultStyle =
      "fixed top-0 flex justify-between px-3 py-2 py-auto w-full z-50 text-[#eee]";
  }

  return (
    <header className={defaultStyle}>
      {/* logo */}
      <Link to={"/"} className="flex gap-2 items-center cursor-pointer ml-4">
        <img src={logo} alt="logo" className=" w-16 h-16" />
        <p className="text-4xl logoFont mt-2">Fanilo Tour</p>
      </Link>

      {/* navigation */}
      <nav className="flex gap-1 items-center mr-4">
        <Link to={"/destinations"} className="mr-4">
          Explore Destinations
        </Link>
        <span>|</span>
        {user ? (
          <Link
            to={"/account"}
            className="flex items-center gap-2 ml-2 border border-[#eee]-600 px-2 py-1 rounded-full bg-white text-[#31343c]"
          >
            <PiUserCircleLight className="w-8 h-8" />
            <span className="capitalize">{user.name}</span>
          </Link>
        ) : (
          <Link to={"/signin"} className="ml-2 btn-primaryScrolled">
            Sign-in
          </Link>
        )}
      </nav>
    </header>
  );
}
