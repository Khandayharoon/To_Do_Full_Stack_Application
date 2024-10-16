import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    // console.log("Sending login data:", body);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login", // Corrected the URL
        body,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.user.token;
        localStorage.setItem("authToken", token);
        navigate("/home");
      }
    } catch (error) {
      // Check if the error is from the server response
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        console.error("Login failed:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-zinc-800 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col w-1/3 h-1/2 gap-10 p-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="E-mail..."
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="Password..."
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="relative">
            <button
              type="submit"
              className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
