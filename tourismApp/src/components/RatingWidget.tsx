import { ReactNode } from "react";
import { FaStar } from "react-icons/fa";

export default function RatingWidget({ rating, isreview = false } : {rating: number, isreview: boolean}) {
  const stars: ReactNode[] = [];

  [...Array(rating)].map((i) =>
    stars.push(
      <span>
        <FaStar className=" text-yellow-500" key={i} />
      </span>
    )
  );

  if (rating < 5) {
    [...Array(5 - rating)].map((i) =>
      stars.push(
        <span>
          <FaStar key={i} />
        </span>
      )
    );
  }

  if (isreview) {
    return <div className="flex gap-1 text-xs mt-1">{stars}</div>;
  }

  return <div className="my-4 flex gap-1">{stars}</div>;
}
