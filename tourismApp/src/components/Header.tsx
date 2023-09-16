import { Link } from "react-router-dom";
import lemur from "../assets/lemur.png";

export default function Header() {
  return (
    <header className="relative max-w-xl flex justify-between px-3 py-auto mb-8 shadow shadow-gray-400 mx-auto my-4 rounded-full">
      {/* logo */}
      <div className="flex gap-2 items-center">
        <img src={lemur} alt="" className="w-16 h-16" />
        <p>Fanilo Tour</p>
      </div>

      {/* navigation */}
      <nav className="flex gap-1 items-center">
        <Link to={"/"} className="mr-4">
          My bookings
        </Link>
        <span>|</span>
        <Link to={"/signin"} className="btn-primary">
          Sign-in
        </Link>
      </nav>
    </header>
  );
}
