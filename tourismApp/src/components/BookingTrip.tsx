import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingTrip({ placeData }) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(0);
  const {id} = useParams();

  async function bookTrip(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const timeofsubmission = new Date(document.lastModified);
    const lastModified =
      timeofsubmission.toLocaleDateString() +
      " " +
      timeofsubmission.toLocaleTimeString("en-US");

    const bookingData = {
      id,
      date,
      guests,
      lastModified
    };

    await axios.post("/newBooking", bookingData);
    alert("Booking Done Successfully");
  }
  return (
    <div className="p-4 shadow shadow-gray-500 rounded-2xl">
      <div className="flex justify-between mb-8">
        <p className="flex gap-1 items-center">
          <span className="text-sm font-bold">
            {" "}
            {placeData.rating.toFixed(1)}{" "}
          </span>{" "}
          Stars Rating
        </p>
        <p className="text-lg font-bold">
          Price: <span>{placeData.price} Ar</span>
        </p>
      </div>
      <form onSubmit={bookTrip}>
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
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button className="btn-primary w-full mx-auto my-4">Book Trip</button>
      </form>
    </div>
  );
}
