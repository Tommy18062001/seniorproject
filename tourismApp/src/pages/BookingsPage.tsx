import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingItem from "../components/BookingItem";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [ready, setReady] = useState(false);
  const { id } = useParams()

  useEffect(() => {
    axios.get("/bookingData/"+ id).then(({ data }) => {
      setBookings(data);
      setReady(true);
    });
  }, [id]);

  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  return (
    <div className="mt-32 w-3/4 mx-auto relative">
      {bookings.length > 0 &&
        bookings.map((booking) => <BookingItem bookingData={booking}/>)}
    </div>
  );
}
