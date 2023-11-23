import axios from "axios";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";
import { UserContext } from "../UserContext";
import emailjs from "@emailjs/browser";
import {
  PlaceInterface,
  UserContextInterface,
  UserInterface,
} from "../Interfaces";

interface BookingTripInterface {
  placeData: PlaceInterface;
  userData: UserInterface | null;
}
export default function BookingTrip({
  placeData,
  userData,
}: BookingTripInterface) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const { id } = useParams();

  const { user } = useContext(UserContext) as UserContextInterface;

  async function bookTrip(e: React.SyntheticEvent) {
    e.preventDefault();

    const timeofsubmission = new Date(document.lastModified);
    const lastModified =
      timeofsubmission.toLocaleDateString() +
      " " +
      timeofsubmission.toLocaleTimeString("en-US");

    const price = placeData.price * guests;

    const bookingData = {
      id,
      date,
      guests,
      lastModified,
      price,
    };

    await axios.post("/newBooking", bookingData);

    emailjs.sendForm(
      "service_9uphv2k",
      "template_5l7zo7s",
      e.target as HTMLFormElement,
      "Ws1Bqh3AZ0IiHcEI_"
    );

    alert("Booking Done Successfully");
  }
  return (
    <div className="p-4 shadow shadow-gray-500 rounded-2xl">
      <div className="flex flex-col gap-2 mb-12 text-lg md:p-2">
        <p className="text-md flex items-center gap-1">
          <span className=" font-semibold flex gap-1 items-center">
            <ImPriceTags /> Ar {placeData.price}
          </span>{" "}
          <span className="text-sm">/Per Person</span>
        </p>
        <p className="bg-primary text-white px-2 py-1 rounded-2xl w-max text-md">
          <span className="text-sm">Total Price: </span> Ar{" "}
          {placeData.price * guests}
        </p>
      </div>
      <form onSubmit={bookTrip}>
        <input type="text" name="from_name" value={userData?.name} hidden />
        <input type="email" name="from_email" value={userData?.email} hidden />
        <input type="text" name="place" value={placeData.title} hidden />

        <div className="mb-4 text-md">
          <label className="block">Date</label>
          <input
            className="outline-none"
            type="date"
            name="appointmentDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Number of guests</label>
          <input
            type="number"
            name="guestCount"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </div>
        {user ? (
          <button className="btn-primary w-full mx-auto my-4">Book Trip</button>
        ) : (
          <>
            <p className="text-sm text-gray-600 mt-6 w-full text-center">
              Please Sign In in order to book a trip
            </p>
            <Link
              to={"/signin"}
              className="block text-center btn-primary w-3/4 mx-auto my-4"
            >
              Sign In
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
