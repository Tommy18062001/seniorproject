import { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { BsCardChecklist } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { GiBlackBook } from "react-icons/gi";
import { BiCalendarEvent } from "react-icons/bi";
import { UserContext } from "../../UserContext";
import { IsScrolledInterface, UserContextInterface } from "../../Interfaces";

export default function AccountPage() {
  const {setIsScrolled} = useOutletContext() as IsScrolledInterface;
  setIsScrolled(true);

  const { user, setUser, ready } = useContext(UserContext) as UserContextInterface;
  const [redirect, setRedirect] = useState(false);

  async function logoutUser() {
    axios.post("/signout");
    setRedirect(true);
    setUser(null);
  }

  // if the user info are not fetched yet don't show the page yet
  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/signin"} />;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const navigationStyling =
    "max-w-[225px] lg:max-w-full flex flex-col items-center justify-center gap-4 p-2 aspect-square border border-gray-400 text-center cursor-pointer";
  return (
    <div className="mt-32 w-3/4 mx-auto relative">
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr] place-items-center border-b p-4 w-5/6 md:w-4/5 mx-auto">
        {/* picture */}
        <img
          className=" w-40 h-40 rounded-full object-cover"
          src={"https://fanilotour.onrender.com/" + user?.profilePic}
          alt=""
        />
        {/* description */}
        <div className="w-full h-full flex flex-col justify-between p-2">
          <div className="">
            <h1 className="capitalize text-2xl mb-2">{user?.name}</h1>
            <p className="text-gray-800 flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              {user?.email}
            </p>
          </div>
          <div className="flex  gap-2">
            <Link
              className="btn-primary w-32 text-center"
              to={"/account/" + user?._id}
            >
              Edit
            </Link>
            <button className="btn-primary w-32" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* navigation  */}
      {user?.isAdmin ? (
        <div className="border-t border-gray-400 w-4/5 mx-auto p-4 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          <Link to={"/account/places/new"} className={navigationStyling}>
            <AiOutlineAppstoreAdd className="text-4xl" />
            <h1 className="text-2xl">Add Place</h1>
            <p className="text-sm">
              Add a place for your visitors to check and book
            </p>
          </Link>

          <Link to={"/account/places"} className={navigationStyling}>
            <BsCardChecklist className="text-4xl" />
            <h1 className="text-2xl">All places</h1>
            <p className="text-sm">Discover and edit all the places/destinations</p>
          </Link>

          <Link to={"/account/bookings"} className={navigationStyling}>
            <GiBlackBook className="text-4xl" />
            <h1 className="text-2xl">Bookings</h1>
            <p className="text-sm">
              View, modify, and keep a record of all your visitor's bookings
            </p>
          </Link>
        </div>
      ) : (
        <div className="border-t border-gray-400 w-4/5 mx-auto p-4 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          <Link to={"/destinations"} className={navigationStyling}>
            <BsCardChecklist className="text-4xl" />
            <h1 className="text-2xl">All places</h1>
            <p className="text-sm">Discover a diverse array of destinations</p>
          </Link>

          <Link
            to={"https://www.facebook.com/FANILOTOURS"}
            target="_blank"
            className={navigationStyling}
          >
            <BiCalendarEvent className="text-4xl" />
            <h1 className="text-2xl">Events</h1>
            <p className="text-sm">
              Explore and stay updated on exciting news, events, and cultural
              occasions
            </p>
          </Link>

          <Link
            to={"/account/bookings/" + user?._id}
            className={navigationStyling}
          >
            <GiBlackBook className="text-4xl" />
            <h1 className="text-2xl">Bookings</h1>
            <p className="text-sm">
              Check and review the list of bookings you have made
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
