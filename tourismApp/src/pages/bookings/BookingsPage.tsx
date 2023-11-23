import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import BookingItem from "../../components/ItemComponent/BookingItem";
import LoadingWidget from "../../components/LoadingWidget";
import { BsFolderX } from "react-icons/bs";
import { IsScrolledInterface } from "../../Interfaces";

export default function BookingsPage({ isUserAdmin = false }) {
  const {setIsScrolled} = useOutletContext() as IsScrolledInterface;
  setIsScrolled(true);

  const [bookings, setBookings] = useState([]);
  const [ready, setReady] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (isUserAdmin) {
      axios.get("/bookingsData").then(({ data }) => {
        setBookings(data);
        setTimeout(() => setReady(true), 1000);
      });
    } else {
      axios.get("/bookingsData/" + id).then(({ data }) => {
        setBookings(data);
        setReady(true);
      });
    }
  }, [isUserAdmin]);

  if (!ready) {
    return <LoadingWidget />;
  }

  console.log(bookings);
  return (
    <div className="mt-40 w-3/4 mx-auto relative">
      <div className=" w-full mb-4 flex items-center justify-between p-2">
        <h1 className="text-xl">List of Bookings</h1>
        <p className="p-2 border border-gray-500 rounded-full flex gap-1 items-center text-sm">
          Total Records:
          <span> {bookings.length} </span>
        </p>
      </div>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <BookingItem bookingData={booking} isUserAdmin={isUserAdmin} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-[250px] gap-4">
          <BsFolderX className="text-4xl" />
          There was not bookings made yet
        </div>
      )}
    </div>
  );
}
