import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
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

      alert("Login Successful");

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);

      alert(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#111827",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          gap: "15px",
          background: "#1f2937",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "0px",
          }}
        >
          Mindlify AI
        </h1>

        <p
          style={{
            color: "#9ca3af",
            textAlign: "center",
            marginTop: "-5px",
            marginBottom: "20px",
          }}
        >
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <p
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
            }}
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;