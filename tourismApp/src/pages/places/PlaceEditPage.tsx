import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import LoadingWidget from "../../components/LoadingWidget";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdFileUpload } from "react-icons/md";
import { BiTrashAlt } from "react-icons/bi";
import { IsScrolledInterface, UserContextInterface } from "../../Interfaces";

export default function PlaceEditPage() {
  const {setIsScrolled} = useOutletContext() as IsScrolledInterface;
  setIsScrolled(true);

  const { id } = useParams();
  const { user, ready } = useContext(UserContext) as UserContextInterface;
  const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxGuests, setMaxGuests] = useState(5);
  const [photos, setPhotos] = useState<string[]>([]);
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

  async function uploadPics(e: React.SyntheticEvent) {
    const target = e.target as HTMLFormElement;
    const files = target.files;
    console.log(files);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post("/uploadPhotos", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    setPhotos([...photos, ...filenames]);
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
      setTimeout(() => setRedirect(true), 2000);
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
      setTimeout(() => setRedirect(true), 2500);
    }
  }

  // remove the photo from the list
  function removePhoto(filename: string) {
    // update the setPhotos to not include the photo
    setPhotos([...photos.filter((photo) => photo !== filename)]);

    // remove it from the database
    axios.delete("/delete/" + filename);
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
                  className="w-auto h-32 rounded-2xl overflow-hidden relative border border-gray-300"
                  key={photo}
                >
                  <img
                    className=" w-full h-full object-cover"
                    src={"http://localhost:4000/uploads/" + photo}
                    alt={photo}
                  />
                  <button
                    className="absolute -bottom-2 -right-2 bg-white w-[40px] h-[40px]
                   p-2 rounded-2xl flex items-start justify-start 
                   hover:bg-[#242526] hover:text-white transition ease-out duration-200"
                    onClick={() => removePhoto(photo)}
                  >
                    <BiTrashAlt className="" />
                  </button>
                </div>
              ))}
            <label className="flex flex-col gap-2 justify-center items-center border border-gray-400 bg-white rounded-2xl cursor-pointer w-full h-32 relative">
              <input
                type="file"
                className="hidden w-full h-full"
                multiple
                onChange={uploadPics}
              />
              <MdFileUpload className="text-2xl" />
              <span>Upload</span>
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
            onChange={(e) => setMaxGuests(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full mt-4">
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>

        <div className="w-full mt-4">
          <label>Rating</label>
          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </div>
        <button className="btn-primary w-2/4 mt-6">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
