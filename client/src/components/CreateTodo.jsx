import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTodo({ setCreateTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescritpion] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setDescritpion(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description });
    setCreateTodo(false);
    navigate("/home");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex w-full h-full flex-col gap-10 p-10">
        <div>
          <form
            action="POST"
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5"
          >
            <input
              className="py-4 indent-6 outline-none rounded-md text-lg"
              placeholder="Title..."
              required
              type="text"
              value={title}
              onChange={handleUsernameChange}
            />
            <input
              className="py-4 indent-6 outline-none rounded-md text-lg"
              placeholder="Description..."
              required
              type="text"
              value={description}
              onChange={handlePasswordChange}
            />
            <div className="relative">
              <button
                className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
                onClick={handleFormSubmit}
              >
                Submit Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
