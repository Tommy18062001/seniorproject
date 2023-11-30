import axios from "axios";
import { useEffect, useState } from "react";
import RatingWidget from "../RatingWidget";
import { BiSolidQuoteRight, BiTime } from "react-icons/bi";
import { ReviewInterface, UserInterface } from "../../Interfaces";

interface ReviewItemInterface {
  reviewData: ReviewInterface,
  isTestimonials: boolean
}

export default function ReviewItem({ reviewData, isTestimonials = false }: ReviewItemInterface) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [ready, setReady] = useState(false);

  const reviewDate = new Date(reviewData.lastModified);
  const today = new Date();

  const diff = Math.abs(+reviewDate - +today);
  let timeElapsed;

  if (diff > 1000 * 60 && diff < 1000 * 3600) {
    timeElapsed = Math.ceil(diff / (1000 * 60)) + " min";
  } else if (diff > 1000 * 3600 && diff < 1000 * 60 * 60 * 24) {
    timeElapsed = Math.ceil(diff / (1000 * 60 * 60)) + " hours";
  } else if (diff > 1000 * 60 * 60 * 24) {
    timeElapsed = Math.ceil(diff / (1000 * 60 * 60 * 24)) + " days";
  } else {
    timeElapsed = diff + " seconds";
  }

  useEffect(() => {
    axios.get("/userData/" + reviewData.owner).then(({ data }) => {
      setUser(data);
      setReady(true);
    });
  }, [reviewData.owner]);

  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  if (isTestimonials) {
    return (
      <div className=" mx-auto px-4 py-2 h-[200px] flex flex-col items-center justify-center gap-6 mt-4 mb-4 relative">
        <p className="text-xl mt-4 mb-2 w-3/4 px-4 py-2 flex flex-col gap-2 items-center">
          <BiSolidQuoteRight className="text-center text-3xl md:text-4xl mb-4" />
          {reviewData.reviewText}
        </p>
        <div className="flex gap-2 justify-center items-center w-full mb-2 relative">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user?.profilePic}
            alt={user?.profilePic}
          />
          <section className="h-full text-left">
            <h1 className="">{user?.name}</h1>
            <RatingWidget rating={reviewData.rating} isreview={true} />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 my-4 border border-gray-400 rounded-xl cursor-pointer">
      <div className="flex gap-2 items-start mb-2">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user?.profilePic}
          alt={user?.profilePic}
        />
        <div className="flex justify-between w-full">
          <section>
            <h1 className="font-bold">{user?.name}</h1>
            <RatingWidget rating={reviewData.rating} isreview={true} />
          </section>
          <p className="text-sm text-gray-500 flex gap-1 items-center h-max">
            <BiTime /> <span>{timeElapsed}</span>
          </p>
        </div>
      </div>
      <p className="text-sm mt-4 mb-2">{reviewData.reviewText}</p>
    </div>
  );
}
