import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTodoContext } from "../Context";
import { IoClose } from "react-icons/io5";

function CreateTodo({ setCreateTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { todos, setTodos } = useTodoContext();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, description });
    setCreateTodo(false);

    const body = { title, description };

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      // setTodos([{ ...body, _id: title }, ...todos]);
      const response = await axios.post(
        "http://localhost:8080/api/v1/createtodo",
        body,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Todo has been created successfully");
        setTodos([{ ...body, _id: title }, ...todos]);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const CloseModel = () => {
    setCreateTodo(false);
  };

  return (
    <div className=" relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-600  absolute top-0 right-2 cursor-pointer">
        <button onClick={CloseModel}>
          <IoClose />
        </button>
      </div>
      <div className="flex w-full h-full flex-col gap-10 p-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="Title..."
            required
            value={title}
            onChange={handleTitleChange}
          />
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="Description..."
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="relative">
            <button
              type="submit"
              className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
