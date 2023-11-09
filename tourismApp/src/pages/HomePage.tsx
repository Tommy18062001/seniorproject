import { useEffect, useState } from "react";
import PlaceItem from "../components/PlaceItem";
import ServiceItem from "../components/ServiceItem";
import axios from "axios";
import ReviewItem from "../components/ReviewItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";

import {BsShieldCheck } from "react-icons/bs";

import forest from "../assets/forest.jpg";
import fanilo from "../assets/fanilo.jpg";
import image from "../assets/image.jpg";

import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link, useOutletContext } from "react-router-dom";
import LoadingWidget from "../components/LoadingWidget";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaAccessibleIcon } from "react-icons/lia";
import { RxActivityLog } from "react-icons/rx";
import { BiSolidQuoteRight } from "react-icons/bi";

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
      setTimeout(() => setReviewsReady(true), 1000);
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
          <Link to={"/aboutus"} className="block btn-primary w-max">
            Learn More
          </Link>
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

      {/* What we do */}
      {/* Posts and eents */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">Why us</h1>
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
                <SwiperSlide className="px-2 py-5 mt-4 flex flex-col justify-center items-center">
                  <BiSolidQuoteRight className="text-center text-4xl" />
                  <ReviewItem reviewData={review} isTestimonials={true} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      <div className="w-5/6 h-auto mt-32 grid grid-cols-1 lg:grid-cols-2 relative justify-items-center mx-auto">
        <section className="flex flex-col justify-center items-start">
          <h1 className="text-4xl mb-8">Get in touch</h1>
          <p className="w-full mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, iusto facilis. Odit minima illo dolores exercitationem
            quo laboriosam commodi inventore quaerat cumque possimus libero
            blanditiis doloremque, quidem, deserunt ratione placeat.
          </p>
          <Link to={"/aboutus"} className="block btn-primary w-max">
            Send a message
          </Link>
        </section>
        <img src={image} alt="image" className=" max-w-[350px] h-auto" />
      </div>
    </div>
  );
}
