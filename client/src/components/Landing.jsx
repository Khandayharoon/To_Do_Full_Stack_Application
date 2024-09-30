// import { useState } from "react";
import Background from "./Background";
import Foreground from "./Foreground";

function Landing() {
  // const [createTodo, setCreateTodo] = useState(false);

  // const create_todo = () => {
  //   setCreateTodo(true);
  // };

  return (
    <div className="relative w-full h-screen bg-zinc-800">
      {/* <div className="absolute right-10 top-10 z-10">
        <button
          className="bg-zinc-900 text-white px-6 py-2 rounded-lg text-lg cursor-pointer"
          onClick={create_todo}
        >
          Create Todo
        </button>
      </div> */}
      <Background />
      <Foreground />
      {/* {createTodo && (
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-500 z-50 flex items-center justify-center">
          <h1 className="text-white text-3xl">Create your ToDo here!</h1>
        </div>
      )} */}
    </div>
  );
}

export default Landing;
