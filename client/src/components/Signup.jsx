import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      firstName,
      email,
      password,
    };
    console.log("Sending signup data:", body);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Signup successful!", response.data);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.error("Signup failed:", error.response.data);
      } else {
        console.error("Signup failed:", error.message);
      }
    }
  };

  return (
    <div className="bg-zinc-800 w-full h-screen flex md:items-center md:justify-center">
      <div className="flex flex-col w-full md:w-[750px] h-1/2  gap-10 p-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="First Name..."
            required
            type="text"
            value={firstName}
            onChange={handleUsernameChange}
          />
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
            // type="password" // Use type="password" to mask input
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="relative">
            <button
              className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
