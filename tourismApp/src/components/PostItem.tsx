import { Link } from "react-router-dom";
import forest from "../assets/forest.jpg";

export default function PostItem() {
  return (
    <Link to={"/"} className="flex flex-col items-start mb-2 max-w-sm relative">
      <img className="" src={forest} alt="" />
      <div className="w-full h-full flex flex-col items-start justify-between absolute top-0 left-0 z-10 p-4 bg-black opacity-30 text-white">
        <div>
            <p>Sept 28 2023</p>
        </div>
        <div>A trip in ivoloina</div>
      </div>
    </Link>
  );
}
