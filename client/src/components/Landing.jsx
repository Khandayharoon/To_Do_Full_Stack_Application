import { useState } from "react";
import Background from "./Background";
import Foreground from "./Foreground";
import CreateTodo from "./CreateTodo";
import SearchTodo from "./SearchTodo";
import { TodoContextProvider } from "../Context";
import { FiFilePlus } from "react-icons/fi";
import { FaSearchengin } from "react-icons/fa";

function Landing() {
  const [createTodo, setCreateTodo] = useState(false);
  const [searchTodo, setsearchTodo] = useState(false);

  const create_todo = () => {
    setCreateTodo(true);
  };

  const search_todo = () => {
    setsearchTodo(true);
  };

  return (
    <TodoContextProvider>
      <div className="relative w-full min-h-screen bg-zinc-800">
        <div className="absolute right-5 md:right-10 top-10 z-10 flex flex-col md:flex-row gap-5 ">
          <button
            className="bg-zinc-900 text-white px-2 py-2 md:px-6 md:py-2  rounded-lg text-lg cursor-pointer"
            onClick={create_todo}
          >
            <span className="hidden md:block">Create Todo</span>
            <span className=" md:hidden">
              {" "}
              <FiFilePlus />{" "}
            </span>
          </button>
          <button
            className="bg-zinc-900 text-white px-2 py-2 md:px-6 md:py-2  rounded-lg text-lg cursor-pointer"
            onClick={search_todo}
          >
            <span className="hidden md:block">Search Todo</span>
            <span className=" md:hidden ">
              {" "}
              <FaSearchengin />{" "}
            </span>
          </button>
        </div>

        <Background />
        <Foreground />
        {createTodo && (
          <div className="absolute top-10 md:top-1/3 md:left-1/3 w-full md:w-1/3 md:h-1/3 backdrop-blur-lg rounded-3xl z-50">
            <CreateTodo setCreateTodo={setCreateTodo} />
          </div>
        )}
        {searchTodo && (
          <div className="absolute top-10 md:top-1/3 md:left-1/3 w-full md:w-1/3 md:h-1/3 backdrop-blur-lg rounded-3xl z-50">
            <SearchTodo setsearchTodo={setsearchTodo} />
          </div>
        )}
      </div>
    </TodoContextProvider>
  );
}

export default Landing;
