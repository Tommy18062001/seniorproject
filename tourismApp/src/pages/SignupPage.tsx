import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    // pass the date to the server
    try {
      await axios.post("/signup", {
        name,
        email,
        password,
      });
      toast.success("Registration successfull", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => setRedirect(true), 3000)
    } catch (e) {
      console.log(e);
      toast.error("Registration Failed. Please try again", {
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

  if (redirect) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <div className="mt-8 h-auto grow flex flex-col items-center justify-around">
      <h1 className="text-2xl text-center mt-16 mb-4">Create an account</h1>
      <form
        onSubmit={createUser}
        className="relative max-w-md mx-auto flex flex-col items-center gap-4"
      >
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-primary w-2/3">Sign up</button>
        <div className="text-center py-2 text-gray-500">
          Already have an account?{" "}
          <Link className="underline text-black" to={"/signin"}>
            Sign in
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
