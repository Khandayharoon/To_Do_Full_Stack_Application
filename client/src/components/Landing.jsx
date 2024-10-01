import { useState } from "react";
import Background from "./Background";
import Foreground from "./Foreground";
import CreateTodo from "./CreateTodo";
import SearchTodo from "./SearchTodo";


function Landing() {
  const [createTodo, setCreateTodo] = useState(false);
  const [searchTodo, setsearchTodo] = useState(false);

  const create_todo = () => {
    setCreateTodo(true);
  };

  const search_todo = ()=>{
    setsearchTodo(true)
  }

  return (
    <div className="relative w-full h-screen bg-zinc-800">
      <div className="absolute right-10 top-10 z-10 flex gap-5">
        <button
          className="bg-zinc-900 text-white px-6 py-2 rounded-lg text-lg cursor-pointer"
          onClick={create_todo}
        >
          Create Todo
        </button>
        <button
          className="bg-zinc-900 text-white px-6 py-2 rounded-lg text-lg cursor-pointer"
          onClick={search_todo}
        >
          Search Todo
        </button>
      </div>

      <Background />
      <Foreground />
      {createTodo && (
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 backdrop-blur-lg rounded-3xl z-50">
          <CreateTodo setCreateTodo={setCreateTodo} />
        </div>
      )}
      {searchTodo && (
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 backdrop-blur-lg rounded-3xl z-50">
          <SearchTodo setsearchTodo={setsearchTodo} />
        </div>
      )}
    </div>
  );
}

export default Landing;
