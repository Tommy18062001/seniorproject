import { FaStar } from "react-icons/fa";

export default function BookingTrip({ placeData }) {
  function bookTrip() {
    return;
  }
  return (
    <div className="p-4 shadow shadow-gray-500 rounded-2xl">
      <div className="flex justify-between mb-8">
        <p className="flex gap-1 items-center">
          <span className="text-sm font-bold"> {(placeData.rating).toFixed(1)} </span> Stars Rating
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
            required
          />
        </div>
        <div className="mb-4">
          <label>Number of guests</label>
          <input type="number" name="guestCount" />
        </div>
        <button className="btn-primary w-full mx-auto my-4">Book Trip</button>
      </form>
    </div>
  );
}
