import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password });
    navigate("/home");
  };

  return (
    <div className="bg-zinc-800 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col w-1/3 h-1/2 gap-10 p-10">
        <div>
          <form
            action="POST"
            onSubmit={handleFormSubmit}
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
                className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
                onClick={handleFormSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
