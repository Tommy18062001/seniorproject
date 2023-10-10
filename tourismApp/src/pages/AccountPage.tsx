import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AccountPage() {
  const { user, setUser, ready } = useContext(UserContext);
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
    "flex flex-col items-center justify-center gap-4 p-2 aspect-square border border-gray-400 text-center cursor-pointer";
  return (
    <div className="mt-32 w-3/4 mx-auto relative">
      <div className="grid grid-cols-[1fr_2fr] place-items-center border-b p-4 w-4/5 mx-auto">
        {/* picture */}
        <img
          className=" w-40 h-40 rounded-full object-cover"
          src={"http://localhost:4000/uploads/" + user.profilePic}
          alt=""
        />
        {/* description */}
        <div className="w-full h-full flex flex-col justify-between p-2">
          <div className="">
            <h1 className="capitalize text-2xl mb-2">{user.name}</h1>
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
              {user.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              className="btn-primary w-32 text-center"
              to={"/account/" + user._id}
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
      <div className="border-t border-gray-400 w-4/5 mx-auto p-4 relative grid grid-cols-3 gap-4">
        <Link to={"/account/places/new"} className={navigationStyling}>
          <AddCircleOutlineIcon className="w-10"/>

          <h1 className="text-2xl">Add Place</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </Link>

        <div className={navigationStyling}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          <h1 className="text-2xl">Bookings</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>

        <div className={navigationStyling}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          <h1 className="text-2xl">Bookings</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>
      </div>
    </div>
  );
}
