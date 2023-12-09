import { Link, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsFolderX } from "react-icons/bs";
import { UserContext } from "../../UserContext";
import LoadingWidget from "../../components/LoadingWidget";
import DestinationItem from "../../components/ItemComponent/DestinationItem";
import { IsScrolledInterface, UserContextInterface } from "../../Interfaces";

export default function DestinationsPage() {
  const {setIsScrolled} = useOutletContext() as IsScrolledInterface;
  setIsScrolled(true);

  const { user } = useContext(UserContext) as UserContextInterface;

  const [places, setPlaces] = useState([]);
  const [placeReady, setPlaceReady] = useState(false);

  useEffect(() => {
    axios.get("/placeData").then(({ data }) => {
      setPlaces(data);
      setPlaceReady(true);
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
                className={
                  user.isAdmin
                    ? "p-2 border border-gray-500 bg-primary text-white rounded-full flex gap-1 items-center text-sm"
                    : "hidden"
                }
              >
                <span>
                  {/* <AiOutlineAppstoreAdd className="text-xl" /> */}
                </span>
                Add Place
              </Link>
            )}
          </li>
          <li className="w-[38px] sm:w-auto justify-center p-2 border border-gray-500 rounded-full flex gap-1 items-center text-sm">
            <span className="hidden sm:block">Total Records:</span>
            <span> {places.length} </span>
          </li>
        </ul>
      </div>
      <div className="grid gap-4 place-items-center grid-cols-1 newmd:grid-cols-2 xl:grid-cols-3">
        {places.length > 0 &&
          places.map((place) => (
            <DestinationItem placeData={place} isList={false} />
          ))}
      </div>
      {places.length <= 0 && (
        <div className="flex flex-col justify-center items-center h-[250px] gap-4">
          <BsFolderX className="text-4xl"/>
          There was not place added yet
        </div>
      )}
    </div>
  );
}
