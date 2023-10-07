import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function PlaceEditPage() {
  // const { user, ready } = useContext(UserContext);
  // const [redirect, setRedirect] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [lastModified, setLastModified] = useState("");
  const [description, setDescription] = useState("");
  const [maxGuests, setMaxGuests] = useState(5);
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState(25000);

  // title: String,
  // location: String,
  // photos: [String],
  // lastModified: String,
  // description: String,
  // maxGuests: Number,
  // price: Number

  async function uploadPics(e: { target: { files: any } }) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post("/uploadPhotos", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    setPhotos((existingPhoto) => {
      return [...existingPhoto, filenames];
    });
  }

  // if (!ready) {
  //   return (
  //     <div className="mt-32 w-3/4 mx-auto relative">
  //         Loading ...
  //     </div>
  //   )
  // }

  // if (ready && !user && !redirect) {
  //   return <Navigate to={"/signin"} />;
  // }

  // if (redirect) {
  //   return <Navigate to={"/"} />
  // }

  return (
    <div className="mt-32 w-2/4 mx-auto relative">
      <h1 className="text-2xl mx-auto mb-8 w-full text-center">
        Add New Place
      </h1>
      <form className="flex flex-col items-center">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            { photos.length > 0 && 
              
            }
            <label className="flex justify-center items-center border border-gray-400 bg-white rounded-2xl cursor-pointer w-32 h-32 relative">
              <input
                type="file"
                className="hidden w-full h-full"
                multiple
                value={photos}
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
        <button className="btn-primary w-2/4 mt-6">Save Changes</button>
      </form>
    </div>
  );
}
