import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingWidget from "../../components/LoadingWidget";
import { ImPriceTags } from "react-icons/im";
import { BookingInterface } from "../../Interfaces";

export default function BookingEditPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);

  const [booking, setBooking] = useState<BookingInterface>(null);
  const [ready, setReady] = useState(false);

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/bookingData/" + id).then(({ data }) => {
      console.log(data);
      setBooking(data);
      setReady(true);
    });
  }, [id]);

  async function updateBooking(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log("we are here");

    const timeofsubmission = new Date(document.lastModified);
    const lastModified =
      timeofsubmission.toLocaleDateString() +
      " " +
      timeofsubmission.toLocaleTimeString("en-US");

    let price;
    if (guests) {
      price = defaultPrice * guests;
    } else {
      price = defaultPrice;
    }

    await axios.put("/bookingData/" + id, {
      date,
      guests,
      lastModified,
      price,
    });

    // emailjs.sendForm(
    //   "service_9uphv2k",
    //   "template_5l7zo7s",
    //   e.target,
    //   "Ws1Bqh3AZ0IiHcEI_"
    // );

    alert("Booking Updated Successfully");
  }

  if (!ready) {
    return <LoadingWidget />;
  }

  const defaultPrice = booking.price / booking.guests;

  return (
    <div className="mt-32 w-fit mx-auto relative flex flex-col justify-center items-start gap-4">
      <div className="flex flex-col gap-2 text-lg p-2">
        <p className="text-md flex items-center gap-1">
          <span className=" font-semibold flex gap-1 items-center">
            <ImPriceTags /> Ar {defaultPrice}
          </span>
          <span className="text-sm">/Per Person</span>
        </p>
        <p className="bg-primary text-white px-2 py-1 rounded-2xl w-max text-md">
          <span className="text-sm">Total Price: </span> Ar{" "}
          {!guests ? defaultPrice * booking.guests : defaultPrice * guests}
        </p>
      </div>
      <form onSubmit={updateBooking}>
        <div className="mb-4 text-md">
          <label className="block">Date</label>
          <input
            className="outline-none"
            type="date"
            name="appointmentDate"
            defaultValue={booking.selectedDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Number of guests</label>
          <input
            type="number"
            name="guestCount"
            defaultValue={booking.guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button className="btn-primary w-full mx-auto my-4">
          Update Booking
        </button>
      </form>
    </div>
  );
}
