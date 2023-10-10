import { Link } from "react-router-dom";

export default function PlaceItem({ placeData }) {
  return (
    <Link to={"/place/" + placeData._id} className=" flex flex-col items-start mb-2 max-w-sm">
      <img className="w-full h-52 object-cover" src={"http://localhost:4000/uploads/" + placeData.photos[0]} alt={placeData.photos[0]} />
      <div className="w-full flex justify-between mt-2">
        <h1 className="text-lg px-2">{placeData.title}</h1>
        <div className="flex gap-2">
          <p className="px-2 border border-gray-500">Travel</p>
          <p className="px-2 border border-gray-500">Animal</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-2 text-start px-2">
        {placeData.description}
      </p>
    </Link>
  );
}
