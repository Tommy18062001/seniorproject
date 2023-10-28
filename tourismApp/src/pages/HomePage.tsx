import { useEffect, useState } from "react";
import PlaceItem from "../components/PlaceItem";
import PostItem from "../components/PostItem";
import axios from "axios";
import ReviewItem from "../components/ReviewItem";

export default function HomePage() {
  const [placeList, setPlaceList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ready, setReady] = useState(false);
  const [reviewsReady, setReviewsReady] = useState(false);

  useEffect(() => {
    axios.get("/placeData").then(({ data }) => {
      setPlaceList(data);
      setReady(true);
    });

    axios.get("/reviewData").then((reviewData) => {
      setReviews(reviewData.data);
      setReviewsReady(true);
    });
  }, []);

  if (!ready || !reviewsReady) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  return (
    <div>
      {/* Introduction */}
      <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-12">
        <h1 className="uppercase text-7xl font-bold">Welcome to Fanilo Tour</h1>
        <p>Explore the beauty of toamasina</p>
        <p className="w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          rerum provident voluptatum quibusdam officiis aperiam tenetur tempora
          fugiat debitis deserunt necessitatibus distinctio animi repellat,
          perferendis placeat enim magni ullam maxime.
        </p>
      </div>

      {/* Popular destination */}
      <div id="popularDestination" className="mx-auto mt-16 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">
          Popular Destination
        </h1>
        <h2 className="text-gray-500">A little description</h2>
        {/* list of top 3 destination */}
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 gap-4 m-8 items-start">
          {placeList.length > 0 &&
            placeList.map((place) => <PlaceItem placeData={place} />)}
        </div>

        <button className="btn-primary">See more</button>
      </div>

      {/* Posts and eents */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">Recent post/events</h1>
        <h2 className="text-gray-500">Never miss any updates and offers</h2>
        {/* Display the reviews of the customers */}
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 gap-4 m-8">
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>

      {/* Testimonial destination */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">Customer reviews</h1>
        <h2 className="text-gray-500">We provide affordable price</h2>
        {/* Display the reviews of the customers */}
        <div className="flex items-center gap-4 mt-8 relative bg-green-400 w-full relative">
          {reviews.length > 0 &&
            reviews.map((review) => (
              <ReviewItem reviewData={review} isTestimonials={true} />
            ))}
        </div>
      </div>

      {/* Contact information */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">All about us</h1>
        <h2 className="text-gray-500">Wanna get in touch</h2>
        {/* Display the reviews of the customers */}
        <div className="relative w-full p-2 mt-8 flex gap-4 justify-center">
          {/* Contact form */}
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <ul className=" text-start">
                <li>Lot 170 parcelle 22/31 Tanamborozano</li>
                <li>johantony@hotmail.com</li>
                <li>034 08 880 10</li>
              </ul>
            </div>
            <form className="mt-8">
              <input type="text" placeholder="Name" name="name" required />
              <input type="email" placeholder="Email" name="email" required />
              <input type="text" placeholder="Subject" name="subject" />
              <textarea name="message"></textarea>
              <input
                type="submit"
                value="Send"
                className="btn-primary cursor-pointer w-1/3"
              />
            </form>
          </div>
          {/* Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7582.151981709474!2d49.39379803639575!3d-18.160413014442867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f50031040daf03%3A0xb45d4ec9b2579ea1!2sTanamborozano%2C%20Toamasina!5e0!3m2!1sfr!2smg!4v1695015186302!5m2!1sfr!2smg"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
