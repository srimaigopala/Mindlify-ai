import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Signup Successful");

      // Go directly to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Signup Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          Mindlify AI
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Create your smart workspace
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-700 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-700 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-all text-white py-4 rounded-xl font-semibold"
        >
          Create Account
        </button>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;