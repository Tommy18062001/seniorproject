import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";

export default function BookingTrip({ placeData }) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const { id } = useParams();

  async function bookTrip(e: { preventDefault: () => void }) {
    e.preventDefault();

    const timeofsubmission = new Date(document.lastModified);
    const lastModified =
      timeofsubmission.toLocaleDateString() +
      " " +
      timeofsubmission.toLocaleTimeString("en-US");
    
      const price = placeData.price * guests

    const bookingData = {
      id,
      date,
      guests,
      lastModified,
      price
    };

    await axios.post("/newBooking", bookingData);
    alert("Booking Done Successfully");
  }
  return (
    <div className="p-4 shadow shadow-gray-500 rounded-2xl">
      <div className="flex flex-col gap-2 mb-12 text-lg p-2">
        <p className="text-md flex items-center gap-1">
          <span className=" font-semibold flex gap-1 items-center">
            <ImPriceTags /> Ar {placeData.price}
          </span>{" "}
          <span className="text-sm">/Per Person</span>
        </p>
        <p className="bg-primary text-white px-2 py-1 rounded-2xl w-max text-md"><span className="text-sm">Total Price: </span> Ar {placeData.price * guests}</p>
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
