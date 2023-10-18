import { Link, Navigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { TbEdit } from "react-icons/tb";
import axios from "axios";
import { MouseEvent, useState } from "react";

export default function PlaceItem({ placeData, isList = false }) {
  const [redirect, setRedirect] = useState(false);

  async function deletePlace(
    id: string,
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    if (id) {
      try {
        await axios.delete("/placeData/" + id);
        setRedirect(true);
      } catch (e) {
        console.log(e);
        alert("There was an error. Please try again");
      }
    }
  }
  if (isList) {
    if (redirect) {
      return <Navigate to={""} />;
    }
    return (
      <Link
        to={"/place/" + placeData._id}
        className="grid grid-cols-4 grid-rows-2 gap-4 mb-4 h-44 w-full relative p-2 border border-gray-400"
      >
        <img
          className="w-full h-full object-cover col-start-1 row-span-3"
          src={"http://localhost:4000/uploads/" + placeData.photos[0]}
          alt={placeData.photos[0]}
        />
        <div className="w-full flex flex-col gap-2 items-start justify-between mt-2 ml-2 col-start-2">
          <h1 className="text-lg">{placeData.title}</h1>
          <div className="flex gap-2">
            <p className="px-2 border border-gray-500">Travel</p>
            <p className="px-2 border border-gray-500">Animal</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm mt-2 text-start px-2 col-start-2 col-span-3 row-start-2">
          {placeData.description}
        </p>
        <div className="flex gap-2 items-start justify-end col-start-4">
          <Link
            to={"/account/places/edit/" + placeData._id}
            className="p-2 border border-gray-500 rounded-full text-lg"
          >
            <TbEdit />
          </Link>
          <button
            className="p-2 border border-gray-500 rounded-full text-lg"
            onClick={(event) => {
              deletePlace(placeData._id, event);
            }}
          >
            <LiaTimesSolid />
          </button>
        </div>
      </Link>
    );
  }
  return (
    <Link
      to={"/place/" + placeData._id}
      className="flex flex-col items-start mb-2 max-w-xs border border-gray-500 p-2"
    >
      <img
        className="w-full h-52 object-cover"
        src={"http://localhost:4000/uploads/" + placeData.photos[0]}
        alt={placeData.photos[0]}
      />
      <div className="w-full flex justify-between mt-2">
        <h1 className="text-lg px-2">{placeData.title}</h1>
        <div className="flex gap-2">
          <p className="px-2 border border-gray-500">Travel</p>
          <p className="px-2 border border-gray-500">Animal</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-2 text-start px-2">
        {placeData.description}
      </p>
    </Link>
  );
}
