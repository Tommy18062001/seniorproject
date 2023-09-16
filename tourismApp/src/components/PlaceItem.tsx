import { Link } from "react-router-dom";
import forest from "../assets/forest.jpg";

export default function PlaceItem() {
  return (
    <div className="overflow-hidden rounded-2xl my-4 flex bg-gray-200">
      <img className="w-32 h-auto aspect-square rounded-md" src={forest} alt="" />
      <Link to={"/"} className="flex flex-col justify-start w-full cursor-pointer px-2 py-1" >
          <h1 className="text-2xl mb-2">Parc Ivoloina Visit</h1>
          <p className="text-gray-700 text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
            facere, temporibus veritatis ipsa reprehenderit vitae incidunt atque
            quis consectetur blanditiis aut, sunt, error deleniti facilis
            debitis. Ducimus aspernatur ad voluptates!
          </p>
      </Link>
    </div>
  );
}
