import { Link } from "react-router-dom";
import lemur from "../assets/lemur.png";

export default function Header() {

  return (
    <header className="fixed top-0 flex justify-between px-3 py-auto w-full z-50">
      {/* logo */}
      <div className="flex gap-2 items-center cursor-pointer ml-4">
        <img src={lemur} alt="" className="w-20" />
        <p className="text-xl">Fanilo Tour</p>
      </div>

      {/* navigation */}
      <nav className="flex gap-1 items-center mr-4">
        <Link to={"/"} className="mr-4">
          My bookings
        </Link>
        <span>|</span>
        <Link to={"/signin"} className="ml-2 btn-primary">
          Sign-in
        </Link>
      </nav>
    </header>
  );
}
