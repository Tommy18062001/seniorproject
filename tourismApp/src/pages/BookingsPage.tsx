import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import BookingItem from "../components/BookingItem";
import LoadingWidget from "../components/LoadingWidget";

export default function BookingsPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);
  
  const [bookings, setBookings] = useState([]);
  const [ready, setReady] = useState(false);
  const { id } = useParams()

  useEffect(() => {
    axios.get("/bookingData/"+ id).then(({ data }) => {
      setBookings(data);
      setTimeout(()=> setReady(true), 2000)
    });
  }, [id]);

  if (!ready) {
    return <LoadingWidget />;
  }

  return (
    <div className="mt-40 w-3/4 mx-auto relative">
      {bookings.length > 0 &&
        bookings.map((booking) => <BookingItem bookingData={booking}/>)}
    </div>
  );
}
