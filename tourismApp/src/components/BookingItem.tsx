import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { TbEdit } from "react-icons/tb";
import { BsCalendarCheck } from "react-icons/bs";
import { ImCancelCircle, ImPriceTags } from "react-icons/im";
import {FaUsers} from 'react-icons/fa'

export default function BookingItem({ bookingData }) {
  const [place, setPlace] = useState(null);
  const [ready, setReady] = useState(false);

  let cancellationStatus;

  const bookingDate = new Date(bookingData.lastModified);
  const appointment = new Date(bookingData.selectedDate);
  const today = new Date();

  const diff = Math.abs(bookingDate - today);
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

    axios.get("/placeData/" + bookingData.placeId).then(({ data }) => {
      setPlace(data);
      setReady(true);
    });
  }, [bookingData.placeId]);

  async function cancelBooking(id: string, event) {
    event.preventDefault();

    if (id) {
      try {
        await axios.put("/bookingData/" + id);
        alert("Booking Cancelled");
      } catch (e) {
        console.log(e);
        alert("There was an error. Please try again");
      }
    }
  }

  //check the status of the booking
  let bookingStatus;
  let bookingStatusStyle;
  let textDisplay;

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

  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  return (
    <Link
      to={bookingStatus == "Closed" ? "" : "/place/" + bookingData._id}
      className="grid grid-cols-4 grid-rows-2 gap-4 mb-4 h-44 w-full relative p-2 border border-gray-400"
    >
      <img
        className="w-full h-full object-cover col-start-1 row-span-3"
        src={"http://localhost:4000/uploads/" + place.photos[0]}
        alt={place.photos[0]}
      />
      <div className="w-full flex flex-col gap-2 items-start justify-between mt-2 ml-2 col-start-2 row-span-2">
        <h1 className="text-lg">{place.title}</h1>
        <div>
          <p className={textDisplay}>
            <ImCancelCircle /> Free Cancellation: {cancellationStatus}
          </p>
          <p className={textDisplay + " w-max"}>
            <BsCalendarCheck /> Appointment Date: {bookingData.selectedDate}
            <span className="flex ml-2 items-center gap-2">
              | <FaUsers /> Guests: {bookingData.guests}
            </span>
          </p>
          <p className="text-md flex gap-2 items-center bg-primary text-white w-max pl-1 pr-2">
            <ImPriceTags /> <span className="text-sm">Total Price: </span> Ar{" "}
            {bookingData.price}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-start justify-end col-start-4">
        <p className={bookingStatusStyle}>{bookingStatus}</p>
        {bookingStatus == "Closed" ? (
          <>
            <Link
              to={"/"}
              className="p-2 border border-gray-500 rounded-full text-lg text-gray-500"
            >
              <TbEdit />
            </Link>
            <button className="p-2 border border-gray-500 rounded-full text-lg text-gray-500">
              <LiaTimesSolid />
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/"}
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
    </Link>
  );
}
