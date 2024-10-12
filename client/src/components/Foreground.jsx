import { useEffect, useRef, useState } from "react";
import Card from "./card";
import axios from "axios";

function Foreground() {
  const ref = useRef(null);
  const [todos, setTodos] = useState([]);
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

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    axios
      .get("http://localhost:8080/api/v1/gettodo", {
        headers: {
          Authorization: `Bearer ${token}`, // Set token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
        console.log("todos", todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to fetch todos. Please try again.");
      });
  }, []);

  // // Log todos state after it has been updated
  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-full h-full z-[4] flex gap-10 flex-wrap p-5"
    >
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display error message */}
      {/* Replace 'data' with 'todos' if fetching data from API */}
      {/* {todos.length > 0
        ? todos.map((todo) => (
            <Card key={todo._id} data={todo}} reference={ref} />
          ))
        : // : data.map((item, index) => (
          //     <Card key={index} data={item} reference={ref} />
          //   ))}
          null} */}
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

// import { useEffect, useRef, useState } from "react";
// import Card from "./card";
// import axios from "axios";

// function Foreground() {
//   const ref = useRef(null);
//   const [todos, setTodos] = useState([]);

//   const data = [
//     {
//       description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
//       fileSize: "0.9 Mb",
//       close: true,
//       tag: { isOpen: true, TagTitle: "Download Now", tagColor: "green" },
//     },
//     {
//       description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
//       fileSize: "0.9 Mb",
//       close: true,
//       tag: { isOpen: true, TagTitle: "Download Now", tagColor: "blue" },
//     },
//     {
//       description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
//       fileSize: "0.9 Mb",
//       close: true,
//       tag: { isOpen: true, TagTitle: "Download Now", tagColor: "green" },
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/v1/gettodo"
//         );
//         setTodos(response.data); // Assuming the API returns a list of todos
//         console.log(todos);
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className="fixed top-0 left-0 w-full h-full z-[4] flex gap-10 flex-wrap p-5"
//     >
//       {/* Replace 'data' with 'todos' if fetching data from API */}
//       {todos.length > 0
//         ? todos.map((item, index) => (
//             <Card key={index} data={item} reference={ref} />
//           ))
//         : data.map((item, index) => (
//             <Card key={index} data={item} reference={ref} />
//           ))}
//     </div>
//   );
// }

// export default Foreground;
