import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { TbEdit } from "react-icons/tb";
import { BsCalendarCheck } from "react-icons/bs";
import { ImCancelCircle, ImPriceTags } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BookingInterface, PlaceInterface, UserInterface } from "../../Interfaces";

// add the type for each element
export interface BookingItemInterface {
  bookingData: BookingInterface,
  isUserAdmin: boolean
}

export default function BookingItem({ bookingData, isUserAdmin = false }: BookingItemInterface) {
  const [place, setPlace] = useState<PlaceInterface | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [ready, setReady] = useState(false);
  const [placeReady, setPlaceReady] = useState(false);

  let cancellationStatus;

  //check the status of the booking
  let bookingStatus;
  let bookingStatusStyle;
  let textDisplay;

  const bookingDate = new Date(bookingData.lastModified);
  const appointment = new Date(bookingData.selectedDate);
  const today = new Date();

  const diff = Math.abs(+bookingDate - +today);
  const timeElapsed = Math.ceil(diff / (1000 * 60 * 60));

  if (timeElapsed < 48) {
    cancellationStatus = "Available";
  } else {
    cancellationStatus = "Not Available";
  }

  useEffect(() => {
    if (!bookingData.placeId) {
      return;
    }
    axios.get("/userData/" + bookingData.owner).then(({ data }) => {
      setUser(data);
      setReady(true);
    });

    axios.get("/placeData/" + bookingData.placeId).then(({ data }) => {
      console.log(data);
      setPlace(data);
      setPlaceReady(true);
    });
  }, [bookingData.placeId, bookingData.owner]);

  async function cancelBooking(
    id: string,
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    event.preventDefault();

    if (id) {
      try {
        await axios.put("/bookingStatus/" + id);
        bookingStatus = "Cancelled";
        alert("Booking Cancelled");
      } catch (e) {
        console.log(e);
        alert("There was an error. Please try again");
      }
    }
  }

  async function deleteBooking(
    id: string,
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    event.preventDefault();

    if (id) {
      try {
        await axios.delete("/bookingData/" + id);
        // remove it from the DOM
        document.getElementById(bookingData._id)?.remove();
        alert("Booking Deleted");
      } catch (e) {
        console.log(e);
        alert("There was an error. Please try again");
      }
    }
  }

  if (bookingData.isCancelled) {
    bookingStatus = "Cancelled";
    bookingStatusStyle =
      "p-2 bg-red-400 rounded-full text-sm w-[80px] text-center";
    textDisplay = "flex gap-2 items-center text-sm mb-2 pl-1 text-gray-500";
  } else if (bookingData.isCancelled == false && appointment < today) {
    bookingStatus = "Closed";
    bookingStatusStyle =
      "p-2 bg-blue-400 rounded-full text-sm w-[80px] text-center";
    textDisplay = "flex gap-2 items-center text-sm mb-2 pl-1 text-gray-500";
  } else {
    bookingStatus = "Open";
    bookingStatusStyle =
      "p-2 bg-green-400 rounded-full text-sm w-[80px] text-center";
    textDisplay = "flex gap-2 items-center text-sm mb-2 pl-1";
  }

  if (!ready || !placeReady) {
    return (
      <div className="mb-4 h-44 w-full flex justify-start items-start px-4 py-2"></div>
    );
  }

  if (!place) {
    return (
      <div
        id={bookingData._id}
        className="grid grid-cols-4 grid-rows-2 gap-4 mb-4 h-auto lg:h-44 w-full relative p-2 border border-gray-400 cursor-pointer"
      >
        <div className="w-full flex flex-col gap-2 items-start justify-between mt-2 ml-2 col-start-1 col-span-2 row-span-2">
          <h1 className="text-lg">Place Deleted</h1>
          <div>
            <p className="flex gap-2 items-center text-sm mb-2 pl-1 text-gray-500">
              <ImCancelCircle /> Free Cancellation: N/A
            </p>
            <p className="flex gap-2 items-center text-sm mb-2 pl-1 text-gray-500">
              <span className="flex gap-2 items-center">
                <BsCalendarCheck /> Appointment Date: {bookingData.selectedDate}
              </span>
              <span className="flex md:ml-2 items-center gap-2">
                | <FaUsers /> Guests: {bookingData.guests}
              </span>
            </p>
            {isUserAdmin && (
              <p className="text-md flex gap-2 items-center w-max pl-1 pr-2 mb-2">
                <AiOutlineUser />{" "}
                <span className="text-sm">Added By: {user?.name}</span>
              </p>
            )}
            <p className="text-md flex gap-2 items-center bg-primary text-white w-max pl-1 pr-2">
              <ImPriceTags /> <span className="text-sm">Total Price: </span> Ar{" "}
              {bookingData.price}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start justify-end col-start-4">
          <p
            id={bookingData.placeId}
            className="p-2 bg-blue-400 rounded-full text-sm w-[80px] text-center"
          >
            Closed
          </p>
          <Link
            to={""}
            className="p-2 border border-gray-500 rounded-full text-lg text-gray-500"
          >
            <TbEdit />
          </Link>
          <button
            className="p-2 border border-gray-500 rounded-full text-lg"
            onClick={(event) => {
              deleteBooking(bookingData._id, event);
            }}
          >
            <BiTrashAlt />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id={bookingData._id}
      className="grid grid-cols-4 grid-rows-2 gap-4 mb-4 h-auto lg:h-44 w-full relative p-2 border border-gray-400 cursor-pointer"
    >
      <img
        className="w-full h-full object-cover hidden md:col-start-1 md:row-span-3 md:block"
        src={"https://fanilotour.onrender.com/" + place.photos[0]}
        alt={place.photos[0]}
      />
      <div className="w-full flex flex-col gap-2 items-start justify-between mt-2 ml-2 col-start-1 col-span-2 md:col-start-2 row-span-2">
        <h1 className="text-lg">{place.title}</h1>
        <div>
          <p className={textDisplay}>
            <ImCancelCircle /> Free Cancellation: {cancellationStatus}
          </p>
          <p className={textDisplay + " w-max"}>
            <span className="flex gap-2 items-center">
              <BsCalendarCheck /> Appointment Date: {bookingData.selectedDate}
            </span>
            <span className="flex md:ml-2 items-center gap-2">
              | <FaUsers /> Guests: {bookingData.guests}
            </span>
          </p>
          {isUserAdmin && (
            <p className="text-md flex gap-2 items-center w-max pl-1 pr-2 mb-2">
              <AiOutlineUser />{" "}
              <span className="text-sm">Added By: {user?.name}</span>
            </p>
          )}
          <p className="text-md flex gap-2 items-center bg-primary text-white w-max pl-1 pr-2">
            <ImPriceTags /> <span className="text-sm">Total Price: </span> Ar{" "}
            {bookingData.price}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-start justify-end col-start-4">
        <p id={bookingData.placeId} className={bookingStatusStyle}>
          {bookingStatus}
        </p>
        {bookingStatus == "Closed" || bookingStatus == "Cancelled" ? (
          <>
            <Link
              to={""}
              className="p-2 border border-gray-500 rounded-full text-lg text-gray-500"
            >
              <TbEdit />
            </Link>
            <button
              className="p-2 border border-gray-500 rounded-full text-lg"
              onClick={(event) => {
                deleteBooking(bookingData._id, event);
              }}
            >
              <BiTrashAlt />
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/account/bookings/edit/" + bookingData._id}
              className="p-2 border border-gray-500 rounded-full text-lg"
            >
              <TbEdit />
            </Link>
            <button
              className="p-2 border border-gray-500 rounded-full text-lg"
              onClick={(event) => {
                cancelBooking(bookingData._id, event);
              }}
            >
              <LiaTimesSolid />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
