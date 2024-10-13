import { useEffect, useRef, useState } from "react";
import Card from "./card";
import axios from "axios";
import { useTodoContext } from "../Context";

// function useTodo(n) {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState(null);
//   function getData() {
//     const token = localStorage.getItem("authToken");

//     axios
//       .get("http://localhost:8080/api/v1/gettodo", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setTodos(response.data);
//         console.log("todos", todos);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//         setError("Failed to fetch todos. Please try again.");
//       });
//   }
//   useEffect(() => {
//     const interval_ID = setInterval(() => {
//       getData();
//     }, n * 1000);
//     getData();

//     return () => {
//       clearInterval(interval_ID);
//     };
//   }, [n]);

//   return { todos,error };
// }

function Foreground() {
  const ref = useRef(null);
  // const [todos, setTodos] = useState([]);
  const { todos, setTodos } = useTodoContext();
  const [error, setError] = useState(null);

  const colors = [
    "#4ffbdf",
    "#9AD1D4",
    "00FF9C",
    "#007EA7",
    "#00c9a7",
    "#00FF77",
    "#5DD39E",
    "#F0EC57",
    "00FF9C",
    "#69DC9E",
    "#5AB2FF",
    "#4379F2",
    "#FFEB00",
    "#6EC207",
    "#117554",
    "BBCEA8",
    "#348AA7",
    "#00896f",
    "#FFD25A",
    "#09814A",
    "#ff9671",
    "#FF785A",
    "#F2E29F",
    "#5DD39E",
    "#60992D",
    "#D991BA",
    "#50C9CE",
    "#00c9a7",
    "#FF570A",
    "#00896f",
    "#4ffbdf",
    "00FF9C",
    "#004346",
    "#F5D3C8",
    "#F08080",
    "#00AFB9",
    "#E0FF4F",
    "00FF9C",
    "#DEF9C4",
    "#9CDBA6",
    "#50B498",
    "#468585",
    "#538392",
    "#6295A2",
    "#80B9AD",
    "#B3E2A7",
    "#00FF9C",
    "#B6FFA1",
    "#FEFFA7",
    "#FFE700",
  ];

  // const {todos,error} = useTodo(5);
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get("http://localhost:8080/api/v1/gettodo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setTodos(response.data);
        // console.log("todos", todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to fetch todos. Please try again.");
      });
  }, []);

  useEffect(() => {
    // console.log(todos);
  }, [todos]);

  return (
    <div
      ref={ref}
      className="top-0 left-0 w-full min-h-screen z-[4] flex gap-10 flex-wrap p-5"
    >
      {error && <div className="text-red-500">{error}</div>}{" "}
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <Card
            key={todo._id}
            data={todo}
            reference={ref}
            color={colors[Math.floor(Math.random() * colors.length)]}
          />
        ))}
    </div>
  );
}

export default Foreground;
