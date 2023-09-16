import { useState } from "react";
import { Link } from "react-router-dom";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mt-8 h-auto grow flex flex-col items-center justify-around">
      <h1 className="text-2xl text-center mt-16 mb-4">Login</h1>
      <form className="relative max-w-md mx-auto flex flex-col items-center gap-4">
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
    </div>
  );
}
