import { useEffect, useRef, useState } from "react";
import Card from "./card";
import axios from "axios";

function Foreground() {
  const ref = useRef(null);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  const data = [
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
      fileSize: "0.9 Mb",
      close: true,
      tag: { isOpen: true, TagTitle: "Download Now", tagColor: "green" },
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
      fileSize: "0.9 Mb",
      close: true,
      tag: { isOpen: true, TagTitle: "Download Now", tagColor: "blue" },
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing Hk elit",
      fileSize: "0.9 Mb",
      close: true,
      tag: { isOpen: true, TagTitle: "Download Now", tagColor: "green" },
    },
  ];

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:8080/api/v1/gettodo"
    //     );
    //     setTodos(response.data); // Assuming the API returns a list of todos
    //   } catch (error) {
    //     console.error("Error fetching todos:", error);
    //     setError("Failed to fetch todos. Please try again."); // Set error message
    //   }
    // };

    // fetchData();
    axios
      .get("http://localhost:8080/api/v1/gettodo")
      .then((response) => {
        console.log("Fetched todos:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
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
      {todos.length > 0
        ? todos.map((item, index) => (
            <Card key={index} data={item} reference={ref} />
          ))
        : data.map((item, index) => (
            <Card key={index} data={item} reference={ref} />
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
