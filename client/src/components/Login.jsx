import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Activate useNavigate for navigation

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
      username,
      email,
      password,
    };

    console.log("Sending login data:", body);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login", // Corrected the URL
        body,
        {
          withCredentials: true, // Ensures cookies are sent in subsequent requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful!", response.data);
        const token = response.data.user.token;
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem("authToken", token); // Store token in localStorage
        navigate("/home"); // Navigate on successful login
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  return (
    <div className="bg-zinc-800 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col w-1/3 h-1/2 gap-10 p-10">
        <form
          onSubmit={handleFormSubmit} // Removed action="POST" as it's unnecessary
          className="flex flex-col gap-5"
        >
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="Username..."
            required
            type="text"
            value={username}
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
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="relative">
            <button
              type="submit" // Changed to type="submit" to avoid using onClick
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// function Login() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const navigate = useNavigate();

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const body = {
//       username,
//       email,
//       password,
//     };
//     console.log("Sending signup data:", body);

//     try {
//       // const response = await axios.post(
//       //   "http://localhost:8080/api/v1/login",
//       //   body,
//       //   {
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //   }
//       // );
//       // axios
//       //   .get("http://localhost:3000/api/v1/gettodo", { withCredentials: true })
//       //   .then((response) => {
//       //     console.log(response.data);
//       //   })
//       //   .catch((error) => {
//       //     console.error("Error fetching todos:", error);
//       //   });
//       const response = await axios.post("http://localhost:3000/api/v1/login", body, {
//         withCredentials: true, // Ensures cookies are sent in subsequent requests
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         console.log("Login successful!", response.data);
//         navigate("/home");
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Signup failed:", error.response.data);
//       } else {
//         console.error("Signup failed:", error.message);
//       }
//     }
//   };

//   return (
//     <div className="bg-zinc-800 w-full h-screen flex items-center justify-center">
//       <div className="flex flex-col w-1/3 h-1/2 gap-10 p-10">
//         <div>
//           <form
//             action="POST"
//             onSubmit={handleFormSubmit}
//             className="flex flex-col gap-5"
//           >
//             <input
//               className="py-4 indent-6 outline-none rounded-md text-lg"
//               placeholder="Username..."
//               required
//               type="text"
//               value={username}
//               onChange={handleUsernameChange}
//             />
//             <input
//               className="py-4 indent-6 outline-none rounded-md text-lg"
//               placeholder="E-mail..."
//               required
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             <input
//               className="py-4 indent-6 outline-none rounded-md text-lg"
//               placeholder="Password..."
//               required
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <div className="relative">
//               <button
//                 className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
//                 onClick={handleFormSubmit}
//               >
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
