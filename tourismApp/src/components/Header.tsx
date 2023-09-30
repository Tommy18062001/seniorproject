import { Link } from "react-router-dom";
import lemur from "../assets/lemur.png";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

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
        {user ? (
          <Link
            to={"/account"}
            className="flex items-center gap-2 ml-2 border border-gray-600 px-2 py-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="rgb(34, 34, 34)"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="capitalize">{user.name}</span>
          </Link>
        ) : (
          <Link to={"/signin"} className="ml-2 btn-primary">
            Sign-in
          </Link>
        )}
      </nav>
    </header>
  );
}
