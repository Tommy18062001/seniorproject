import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import LoadingWidget from "../components/LoadingWidget";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlaceEditPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);
  
  const { id } = useParams();
  const { user, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxGuests, setMaxGuests] = useState(5);
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState(25000);
  const [rating, setRating] = useState(4);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/placeData/" + id).then(({ data }) => {
      setTitle(data.title);
      setLocation(data.location);
      setDescription(data.description);
      setMaxGuests(data.maxGuests);
      setPhotos(data.photos);
      setPrice(data.price);
      setRating(data.rating);
    });
  }, [id]);

  async function uploadPics(e: { target: { files: any } }) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post("/uploadPhotos", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    console.log(filenames);
    setPhotos(filenames);
  }

  async function savePlace(e: { preventDefault: () => void }) {
    e.preventDefault();
    const timeofsubmission = new Date(document.lastModified);
    const lastModified =
      timeofsubmission.toLocaleDateString() +
      " " +
      timeofsubmission.toLocaleTimeString("en-US");

    const placeData = {
      title,
      location,
      lastModified,
      description,
      maxGuests,
      photos,
      price,
      rating,
    };

    if (id) {
      await axios.put("/editPlace/" + id, placeData);
      toast.success("Place Edited Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => setRedirect(true), 2000)
    } else {
      await axios.post("/newPlace", placeData);
      toast.success("Place Added Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => setRedirect(true), 2500)
    }
  }

  if (!ready) {
    return <LoadingWidget />;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/signin"} />;
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="mt-32 w-2/4 mx-auto relative">
      <h1 className="text-2xl mx-auto mb-8 w-full text-center">
        Add New Place
      </h1>
      <form className="flex flex-col items-center" onSubmit={savePlace}>
        {/* title */}
        <div className="w-full mt-4">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* location */}
        <div className="w-full mt-4">
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Photos */}
        <div className="w-full mt-4">
          <label>Photos</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
            {photos.length > 0 &&
              photos.map((photo) => (
                <div
                  className="w-auto h-32 rounded-2xl overflow-hidden"
                  key={photo}
                >
                  <img
                    className=" w-full h-full object-cover"
                    src={"http://localhost:4000/uploads/" + photo}
                    alt={photo}
                  />
                </div>
              ))}
            <label className="flex justify-center items-center border border-gray-400 bg-white rounded-2xl cursor-pointer w-full h-32 relative">
              <input
                type="file"
                className="hidden w-full h-full"
                multiple
                onChange={uploadPics}
              />
              Upload
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="w-full mt-4">
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Guests */}
        <div className="w-full mt-4">
          <label>Max Guests</label>
          <input
            type="number"
            placeholder="Max Guests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
          />
        </div>
        <div className="w-full mt-4">
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="w-full mt-4">
          <label>Rating</label>
          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button className="btn-primary w-2/4 mt-6">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
