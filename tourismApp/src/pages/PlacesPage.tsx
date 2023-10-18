import axios from "axios";
import { useEffect, useState } from "react";
import PlaceItem from "../components/PlaceItem";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get("/placeData").then(({ data }) => {
      setPlaces(data);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }
  return (
    <div className="mt-32 w-3/4 mx-auto min-h-screen relative ">
      <div className=" w-full mb-4 flex items-center justify-between p-2">
        <h1 className="text-2xl">List of Places</h1>
        <ul className="flex gap-2 items-center">
          <li>
            <Link
              to={"/account/places/new"}
              className="p-2 border border-gray-500 bg-primary text-white rounded-full flex gap-1 items-center text-sm"
            >
              <span>
                <AiOutlineAppstoreAdd className="text-xl" />
              </span>
              Add Place
            </Link>
          </li>
          <li className="p-2 border border-gray-500 rounded-full flex gap-1 items-center text-sm">
            Total Records:
            <span> {places.length} </span>
          </li>
        </ul>
      </div>
      <div>
        {places.length > 0 &&
          places.map((place) => <PlaceItem placeData={place} isList={true} />)}
      </div>
    </div>
  );
}
