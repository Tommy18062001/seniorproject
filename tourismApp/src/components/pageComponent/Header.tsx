import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { PiUserCircleLight } from "react-icons/pi";
import logo from "../../assets/FaniloTours.png";
import { UserContextInterface } from "../../Interfaces";

export default function Header({ isScrolled = true }) {
  const { user } = useContext(UserContext) as UserContextInterface;
  let defaultStyle;
  if (isScrolled) {
    defaultStyle =
      "fixed top-0 flex justify-between px-3 py-2 py-auto w-full z-50 text-white bg-primary";
  } else {
    defaultStyle =
      "fixed top-0 flex justify-between px-3 py-2 py-auto w-full z-50 text-[#eee] bg-primary newmd:bg-transparent";
  }

  return (
    <header className={defaultStyle}>
      {/* logo */}
      <Link to={"/"} className="flex gap-2 items-center cursor-pointer ml-4">
        <img src={logo} alt="logo" className="w-14 h-14 sm:w-16 sm:h-16" />
        <p className="text-3xl sm:text-4xl logoFont mt-2">Fanilo Tour</p>
      </Link>

      {/* navigation */}
      <nav className="flex gap-1 items-center mr-4">
        <Link to={"/destinations"} className="hidden sm:block mr-4">
          Explore Destinations
        </Link>
        <span className="hidden sm:block">|</span>
        {user ? (
          <Link
            to={"/account"}
            className="flex items-center gap-2 ml-2 border border-[#eee]-600 p-1 md:px-2 md:py-1 rounded-full bg-white text-[#31343c]"
          >
            <PiUserCircleLight className="w-8 h-8" />
            <span className="capitalize hidden md:block">{user.name}</span>
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
