import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
    // console.log("Sending signup data:", body);

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
        // console.log("Signup successful!", response.data);
        navigate("/login");
      }
    } catch (error) {
      // Check if the error is from the server response
      if (error.response && error.response.status === 401) {
        toast.error("User already exists");
      } else {
        console.error("Login failed:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  const loginPage = () => {
    navigate("/login");
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
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="relative flex flex-col">
            <div>
              <button
                className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg "
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div>
              <button
                onClick={loginPage}
                className=" bg-zinc-900 text-white px-6 py-2 rounded-lg absolute  text-lg"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
