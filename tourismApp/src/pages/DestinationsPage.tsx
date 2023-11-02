import { Link, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DestinationItem from "../components/DestinationItem";
import { UserContext } from "../UserContext";
import LoadingWidget from "../components/LoadingWidget";

export default function DestinationsPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);

  const { user } = useContext(UserContext);

  const [places, setPlaces] = useState([]);
  const [placeReady, setPlaceReady] = useState(false);

  useEffect(() => {
    axios.get("/placeData").then(({ data }) => {
      setPlaces(data);
      setTimeout(() => setPlaceReady(true), 2500);
    });
  }, []);

  if (!placeReady) {
    return <LoadingWidget />;
  }
  return (
    <div className="mt-40 w-3/4 mx-auto min-h-screen relative">
      <div className=" w-full mb-4 flex items-center justify-between p-2">
        <h1 className="text-2xl">List of Places</h1>
        <ul className="flex gap-2 items-center">
          <li>
            {user && (
              <Link
                to={"/account/places/new"}
                className="p-2 border border-gray-500 bg-primary text-white rounded-full flex gap-1 items-center text-sm"
              >
                <span>
                  {/* <AiOutlineAppstoreAdd className="text-xl" /> */}
                </span>
                Add Place
              </Link>
            )}
          </li>
          <li className="p-2 border border-gray-500 rounded-full flex gap-1 items-center text-sm">
            Total Records:
            <span> {places.length} </span>
          </li>
        </ul>
      </div>
      <div className="grid gap-2 grid-cols-3">
        {places.length > 0 &&
          places.map((place) => (
            <DestinationItem placeData={place} isList={false} />
          ))}
      </div>
    </div>
  );
}
