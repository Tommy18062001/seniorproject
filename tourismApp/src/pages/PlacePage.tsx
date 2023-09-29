import { useState } from "react";
import forest from "../assets/forest.jpg";
import BookingTrip from "../components/BookingTrip";

export default function PlacePage() {
  const [showPhotos, setshowPhotos] = useState(false);

  // if showphoto is true, display the list of photos
  if (showPhotos) {
    return (
      <div className="absolute top-0 left-0 h-full min-w-full z-50 flex gap-8 justify-center items-center bg-white">
        <button>Back</button>
        <img className="rounded-md w-2/4 h-auto" src={forest} alt="" />
        <button>Forward</button>
        <button className="absolute top-6 right-10 btn-primary" onClick={() => setshowPhotos(false)}>Close</button>
      </div>
    );
  }

  return (
    <div className="mt-32 w-3/4 mx-auto min-h-screen">
      {/* place headline */}
      <h1>This is the place page</h1>
      <div>
        <p>Stars</p>
        <p>Adress of the place</p>
      </div>

      {/* image display */}
      <div className="grid grid-cols-[2fr_1fr] gap-2 mt-8 relative">
        <div>
          <img className="rounded-md h-full" src={forest} alt="" />
        </div>
        <div className="grid gap-2">
          <img className="rounded-md" src={forest} alt="" />
          <img className="rounded-md" src={forest} alt="" />
        </div>
        <button
          className="absolute bottom-2 left-2 bg-white rounded-full px-6 py-2"
          onClick={() => setshowPhotos(true)}
        >
          See more
        </button>
      </div>

      {/* More info and pricing */}
      <div className="grid grid-cols-[2fr_1fr] gap-2 mt-8">
        <div className="p-2">
          <div>
            <div>
              <h2>Hosted By</h2>
              <p>Tommy Sylver</p>
            </div>
            <div>
              <h2>Last modified</h2>
              <p>26/09/2023</p>
            </div>
            <div>
              <h2>Cancellation Process</h2>
              <p>Within 48 hours</p>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl mb-2">Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              accusantium fugit totam reiciendis, ea neque porro delectus autem
              cumque itaque sed doloribus? Commodi molestiae magnam dolore
              excepturi eveniet veniam ab.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl mb-2">Perks</h2>
            <ul>
              <li>FT</li>
              <li>FT</li>
              <li>FT</li>
            </ul>
          </section>
        </div>

        {/* booking Trip */}
        <BookingTrip />
      </div>
    </div>
  );
}
