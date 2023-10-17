import { FaStar } from "react-icons/fa";

export default function RatingWidget({ rating }: number) {
  let stars = [];

  [...Array(rating)].map((e, i) =>
    stars.push(
      <span>
        <FaStar className=" text-yellow-500" key={i} />
      </span>
    )
  );

  if (rating < 5) {
    [...Array(5 - rating)].map((e, i) =>
      stars.push(
        <span>
          <FaStar key={i} />
        </span>
      )
    );
  }

  return <div className="my-4 flex gap-1">{stars}</div>;
}
