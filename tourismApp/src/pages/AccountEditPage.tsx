import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function AccountEditPage() {
  const {id} = useParams();

  const { user, setUser, ready } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("placeholder.png");

  async function saveUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (id) {
      try {
        await axios.put("/userData", {
          id,
          name,
          email,
          profilePic
        });
        alert("Profile Updated")
      } catch (e) {
        console.log(e);
        alert("Update Failed. Please try again");
      }
    }
  }

  async function uploadPic(e: { target: { files: any } }) {
    const files = e.target.files;
    console.log(files[0]);
    const data = new FormData();
    data.append("profilePic", files[0]);

    const { data: filename } = await axios.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    setProfilePic(filename);
  }

  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  if (ready && !user) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="mt-8 h-auto grow flex flex-col items-center justify-around">
      <h1 className="text-2xl text-center mt-32 mb-8">
        Edit Personal Information
      </h1>
      <form
        onSubmit={saveUser}
        className="relative max-w-md mx-auto flex flex-col justify-center items-center gap-2"
      >
        <div className="w-full">
          <label>Upload a Profile Picture</label>
          <img
            className="my-2 w-40 h-40"
            src={"http://localhost:4000/uploads/" + profilePic}
            alt=""
          />
          <input
            type="file"
            name="picture"
            maxLength={1}
            className="cursor-pointer bg-white"
            onChange={uploadPic}
          />
        </div>

        <div className="w-full mb-2">
          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </div>

        <div className="w-full">
          <label>Email Address</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>

        <button className="btn-primary w-3/4 mt-4">Save Changes</button>
      </form>
    </div>
  );
}
