import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import BookingItem from "../components/BookingItem";
import LoadingWidget from "../components/LoadingWidget";
import { TbListSearch } from "react-icons/tb";

export default function BookingsPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);

  const [bookings, setBookings] = useState([]);
  const [ready, setReady] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get("/bookingsData/" + id).then(({ data }) => {
      setBookings(data);
      setTimeout(() => setReady(true), 1000);
    });
  }, [id]);

  if (!ready) {
    return <LoadingWidget />;
  }

  return (
    <div className="mt-40 w-3/4 mx-auto relative">
      {bookings.length > 0 ? (
        bookings.map((booking) => <BookingItem bookingData={booking} />)
      ) : (
        <div className="flex flex-col justify-center items-center text-xl h-[250px] gap-4">
          <TbListSearch className="text-4xl" />
          <p> You have not done any booking yet</p>
        </div>
      )}
    </div>
  );
}
