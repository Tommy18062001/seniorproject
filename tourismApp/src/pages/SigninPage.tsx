import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { UserContext } from "../UserContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SigninPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // redirect user if login in
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function SigninUser(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/signin", {
        email,
        password,
      });

      setUser(data);
      toast.success("Login success", {
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
      toast.error("Login Failed, Please try again", {
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
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-24 h-auto grow flex flex-col items-center justify-around">
      <h1 className="text-2xl text-center mt-16 mb-4">Login</h1>
      <form
        className="relative max-w-md mx-auto flex flex-col items-center gap-4"
        onSubmit={SigninUser}
      >
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
        <button className="btn-primary w-2/3">Sign in</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?{" "}
          <Link className="underline text-black" to={"/signup"}>
            Sign up
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
