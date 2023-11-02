import { useEffect, useState } from "react";
import PlaceItem from "../components/PlaceItem";
import ServiceItem from "../components/ServiceItem";
import axios from "axios";
import ReviewItem from "../components/ReviewItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";

import { BsShieldCheck } from "react-icons/bs";

import forest from "../assets/forest.jpg";
import fanilo from "../assets/fanilo.jpg";

import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link, useOutletContext } from "react-router-dom";
import LoadingWidget from "../components/LoadingWidget";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaAccessibleIcon } from "react-icons/lia";
import {RxActivityLog} from 'react-icons/rx'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useOutletContext();

  const [placeList, setPlaceList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ready, setReady] = useState(false);
  const [reviewsReady, setReviewsReady] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  if (inView) {
    setIsScrolled(false);
  } else {
    setIsScrolled(true);
  }

  console.log(isScrolled);

  useEffect(() => {
    axios.get("/placeData/top").then(({ data }) => {
      setPlaceList(data);
      setReady(true);
    });

    axios.get("/reviewData").then((reviewData) => {
      setReviews(reviewData.data);
      setTimeout(() => setReviewsReady(true), 2000);
    });
  }, []);

  if (!ready || !reviewsReady) {
    return <LoadingWidget />;
  }

  return (
    <div>
      {/* Introduction */}
      <div className="w-full h-screen flex flex-col text-[#eee] justify-center items-center text-center gap-12 relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="absolute z-10 
            w-full h-screen max-w-none object-cover
            "
        >
          <SwiperSlide>
            <img src={forest} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={forest} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={forest} alt="" />
          </SwiperSlide>{" "}
        </Swiper>
        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-20"></span>
        <h1 className="uppercase text-7xl font-bold z-40">
          Welcome to Fanilo Tour
        </h1>
        <p className="z-20">Explore the beauty of toamasina</p>
        <p className="w-1/2 z-40" ref={ref}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          rerum provident voluptatum quibusdam officiis aperiam tenetur tempora
          fugiat debitis deserunt necessitatibus distinctio animi repellat,
          perferendis placeat enim magni ullam maxime.
        </p>
      </div>

      {/* Introduction */}
      <div className="relative mx-auto mt-32 w-5/6 grid grid-cols-2 gap-2">
        <picture className="p-4">
          <img src={fanilo} alt="cover" className="w-full h-auto" />
        </picture>
        <div className="p-4 h-full">
          <h1 className="text-6xl mb-16">Fanilo Tour Mada</h1>
          <p className="mb-4">
            Fanilo tour is tour agency which offers specialized tours of the
            exotic east coast of Madagascar. We are flexible and accommodate
            families with young children, senior travelers, and visitors with
            special needs. We offer private excursions, as well as those for
            small or large groups.
          </p>
          <p className="mb-8">
            Let us personalize your itinerary, and introduce you to unique flora
            and fauna, and magnificent scenery! Our experienced Malagasy guides
            are fluent in English, French, Italian and German
          </p>
          <Link to={"/"} className="block btn-primary w-max">
            Learn More
          </Link>
        </div>
      </div>

      {/* What we do */}
      {/* Posts and eents */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">What We do</h1>
        <h2 className="text-gray-500">Never miss any updates and offers</h2>
        {/* Display the reviews of the customers */}
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 gap-8 m-8 mt-16">
          <ServiceItem
            Icon={BsShieldCheck}
            title="Travel Insurance"
            description="Offer travel insurance options to protect travelers during their trips. ptio minus iste eius dignissimos vel? Minima tempora"
          />
          <ServiceItem
            Icon={AiOutlineUsergroupAdd}
            title="Group Travel and Corporate Services"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ex
        quod corrupti, optio minus iste eius dignissimos vel? Minima tempora
        delectus cupiditate eum nisi rem impedit dolorem dignissimos, mollitia
        quod."
          />
          <ServiceItem
            Icon={LiaAccessibleIcon}
            title="Accessibility and Inclusivity"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ex
        quod corrupti, optio minus iste eius dignissimos vel? Minima tempora
        delectus cupiditate eum nisi rem impedit dolorem dignissimos, mollitia
        quod."
          />
          <ServiceItem
            Icon={RxActivityLog}
            title="Activity and Excursion Booking"
            description="Provide options for booking activities, tours, and excursions at the destination.
            Recommendations for adventure sports, cultural experiences, and more cupiditate eum nisi rem impedit dolorem dignissimos, mollitia
        quod."
          />
        </div>
      </div>

      {/* Popular destination */}
      <div id="popularDestination" className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">
          Popular Destination
        </h1>
        <h2 className="text-gray-500">A little description</h2>
        {/* list of top 3 destination */}
        <div className="relative grid grid-cols-1 place-items-center sm:grid-cols-3 gap-4 m-8 items-start h-[400px]">
          {placeList.length > 0 &&
            placeList
              .slice(0, 3)
              .map((place) => <PlaceItem placeData={place} />)}
        </div>

        <button className="btn-primary">See more</button>
      </div>

      {/* Testimonial destination */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">Customer reviews</h1>
        <h2 className="text-gray-500">What people say about us</h2>
        {/* Display the reviews of the customers */}
        <div className="flex items-center gap-4 relative w-full mt-4">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
          >
            {reviews.length > 0 &&
              reviews.map((review) => (
                <SwiperSlide className="px-2 py-5 mt-4">
                  <ReviewItem reviewData={review} isTestimonials={true} />
                </SwiperSlide>
              ))}
          </Swiper>
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
                className="btn-primary cursor-pointer"
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
            className="border border-gray-400"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
