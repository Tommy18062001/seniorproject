import { Link } from "react-router-dom";
import forest from "../assets/forest.jpg";

export default function PlaceItem() {
  return (
    <Link to={"/"} className=" flex flex-col items-start mb-2 max-w-sm">
      <img className="" src={forest} alt="" />
      <div className="w-full flex justify-between mt-2">
        <h1 className="text-lg px-2">Parc Ivoloina Visit</h1>
        <div className="flex gap-2">
          <p className="px-2 border border-gray-500">Travel</p>
          <p className="px-2 border border-gray-500">Animal</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-2 text-start px-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque facere,
      </p>
    </Link>
  );
}
