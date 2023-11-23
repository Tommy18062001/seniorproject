import { useEffect, useState } from "react";
import PlaceItem from "../components/ItemComponent/PlaceItem";
import ServiceItem from "../components/ItemComponent/ServiceItem";
import axios from "axios";
import ReviewItem from "../components/ItemComponent/ReviewItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";

import { BsArrowUp, BsShieldCheck } from "react-icons/bs";

import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
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
import { IsScrolledInterface, ReviewInterface } from "../Interfaces";



export default function HomePage() {
  const {isScrolled, setIsScrolled} = useOutletContext() as IsScrolledInterface;

  const [placeList, setPlaceList] = useState([]);
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [ready, setReady] = useState(false);
  const [reviewsReady, setReviewsReady] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // TO CHANGE LATER ON
  if (!inView || window.innerWidth < 640) {
    setIsScrolled(true);
  } else {
    setIsScrolled(false);
  }

  console.log(isScrolled);

  useEffect(() => {
    console.log(window.innerWidth);
    axios.get("/placeData/top").then(({ data }) => {
      setPlaceList(data);
      setReady(true);
    });

    axios.get("/reviewData/top").then((reviewData) => {
      setReviews(reviewData.data);
      setTimeout(() => setReviewsReady(true), 1000);
    });
  }, []);

  if (!ready || !reviewsReady) {
    return <LoadingWidget />;
  }

  return (
    <div className="relative" id="top">
      {/* Introduction */}
      <div
        className="w-full h-screen flex flex-col newmd:text-white justify-center items-center text-center gap-12 
      relative"
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="hidden newmd:block absolute z-20 
            w-full h-screen max-w-none object-cover
            "
        >
          <SwiperSlide>
            <img src={image3} alt="" className="w-full h-auto object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} alt="" className="w-full h-auto object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image1} alt="" className="w-full h-auto object-cover" />
          </SwiperSlide>{" "}
        </Swiper>
        <span className="hidden newmd:block absolute top-0 left-0 w-full h-full bg-black opacity-25 z-30"></span>
        <h1 className="uppercase text-4xl mt-16 lg:mt-0 newmd:text-6xl lg:text-7xl font-bold z-40">
          Welcome to Fanilo Tour
        </h1>
        <p className="z-30 text-md">Explore the beauty of toamasina</p>
        <p className="w-2/3 sm:w-1/2 z-30 text-sm newmd:text-md" ref={ref}>
          We are your trusted partner in creating memories that last a lifetime.
          Explore with confidence, and let the wonders of our country unfold
          before you. Your next adventure begins here.
        </p>
      </div>

      {/* Introduction */}
      <div className="relative mx-auto mt-32 w-5/6 grid grid-cols-1 place-items-center lg:grid-cols-2 gap-2">
        <picture className="p-4">
          <img src={fanilo} alt="cover" className="w-full h-auto" />
        </picture>
        <div className="p-4 h-full">
          <h1 className="text-5xl sm:text-6xl mb-16">Fanilo Tour Mada</h1>
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
        <div className="relative grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-8 items-start h-auto lg:h-[400px]">
          {placeList.length > 0 &&
            placeList
              .slice(0, 3)
              .map((place, i) => <PlaceItem placeData={place} key={i} isList={false} />)}
        </div>

        <button className="btn-primary">See more</button>
      </div>

      {/* What we do */}
      {/* Posts and eents */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">Why us</h1>
        <h2 className="text-gray-500">Never miss any updates and offers</h2>
        {/* Display the reviews of the customers */}
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 newlg:grid-cols-3 gap-8 m-8 mt-16">
          <ServiceItem
            Icon={BsShieldCheck}
            title="Travel Insurance"
            description="Offer travel insurance options to protect travelers during their trips. 
            Your adventure is not only memorable but also worry-free"
          />
          <ServiceItem
            Icon={AiOutlineUsergroupAdd}
            title="Group Travel and Corporate Services"
            description="Whether you're planning a group getaway with friends and 
            family or organizing a corporate retreat, 
            our tailored services cater to the unique needs of collective travel. 
            "
          />
          <ServiceItem
            Icon={LiaAccessibleIcon}
            title="Accessibility and Inclusivity"
            description="Our commitment to accessibility goes beyond convenience;
            From thoughtfully designed itineraries to accommodations that prioritize comfort and inclusivity, 
            we strive to ensure that every traveler, regardless of ability, feels welcome and empowered to explore the world."
          />
          <ServiceItem
            Icon={RxActivityLog}
            title="Activity and Excursion Booking"
            description=" Our platform empowers you to seamlessly plan and book 
            a diverse range of activities and excursions, tailored to your interests and preferences."
          />
        </div>
      </div>

      {/* Testimonial destination */}
      <div className="mx-auto mt-32 w-full text-center">
        <h1 className="text-4xl font-semibold mt-2 mb-2">Customer reviews</h1>
        <h2 className="text-gray-500">What people say about us</h2>
        {/* Display the reviews of the customers */}
        <div className="flex items-center gap-4 relative w-full h-auto mt-4">
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
              reviews.map((review, i) =>
                review.rating > 3 ? (
                  <SwiperSlide key={i} className="px-2 py-5 mt-4 flex flex-col justify-center items-center h-[400px]">
                    <ReviewItem reviewData={review} isTestimonials={true} />
                  </SwiperSlide>
                ) : null
              )}
          </Swiper>
        </div>
      </div>

      <div className="w-5/6 h-auto mt-32 grid grid-cols-1 lg:grid-cols-2 relative justify-items-center mx-auto">
        <section className="flex flex-col justify-center items-start mb-8 lg:mb-0">
          <h1 className="text-4xl mb-8">Get in touch</h1>
          <p className="w-full mb-6">
            We're here to turn your travel dreams into reality. If you have
            questions about our curated tours, need assistance in planning a
            personalized itinerary, or simply want to share your excitement
            about an upcoming adventure, please don't hesitate to reach out to
            us
          </p>
          <Link to={"/aboutUs#contact"} className="block btn-primary w-max">
            Send a message
          </Link>
        </section>
        <img src={image} alt="image" className=" max-w-[350px] h-auto" />
      </div>

      {/* button to help the user scroll up  */}
      <button
        onClick={() => {
          document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed bottom-[50px] right-10 p-2 bg-primary border border-white text-white
         text-2xl hover:-translate-y-2 transition-all duration-150 z-10"
      >
        <BsArrowUp />
      </button>
    </div>
  );
}
