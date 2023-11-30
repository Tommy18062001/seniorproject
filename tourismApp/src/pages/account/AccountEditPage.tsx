import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IsScrolledInterface, UserContextInterface } from "../../Interfaces";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../components/firebase";

// firebase upload

export default function AccountEditPage() {
  const {setIsScrolled} = useOutletContext() as IsScrolledInterface;
  setIsScrolled(true);

  const { id } = useParams();

  const { user, setUser, ready } = useContext(UserContext) as UserContextInterface;

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [profilePic, setProfilePic] = useState(user?.profilePic);

  const [redirect, setRedirect] = useState(false);

  async function saveUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (id) {
      try {
        await axios.put("/userData", {
          id,
          name,
          email,
          profilePic,
        });

        // update the user info
        axios.get("/userData").then(({ data }) => {
          setUser(data);
        });

        toast.success("Profile Updated", {
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
      } catch (e) {
        console.log(e);
        toast.error("Update Failed. Please try again", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  async function uploadPic(e: React.SyntheticEvent) {
    const target = e.target as HTMLFormElement;
    const files = target.files;

    const imageRef = ref(storage, 'profile/'+ files[0].name.replace(" ", ""));
    uploadBytes(imageRef, files[0]).then((response)=> {
      toast.success("The image has been uploaded", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getDownloadURL(response.ref).then((url)=> {
        console.log(url);
        setProfilePic(url);
      })
    })
  }

  // if the user info are not fetched yet don't show the page yet
  if (!ready) {
    return <div className="mt-32 w-3/4 mx-auto relative">Loading ...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/signin"} />;
  }

  if (redirect) {
    return <Navigate to={"/account"} />;
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
            className="my-2 w-40 h-40 object-cover"
            src={profilePic}
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
            defaultValue={user?.name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
        </div>

        <div className="w-full">
          <label>Email Address</label>
          <input
            type="email"
            defaultValue={user?.email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>

        <button className="btn-primary w-3/4 mt-4">Save Changes</button>
      </form>
      <ToastContainer />
    </div>
  );
}
