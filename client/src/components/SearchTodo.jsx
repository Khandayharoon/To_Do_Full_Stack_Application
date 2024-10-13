import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useTodoContext } from "../Context";

function SearchTodo({ setsearchTodo }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("Options");
  const { todos, setTodos } = useTodoContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);

    const today = new Date();
    let startDate, endDate;

    // Cloning date object to avoid mutation
    switch (option) {
      case "Yesterday":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = new Date(today);
        break;

      case "Day before yesterday":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 2);
        endDate = new Date(today);
        endDate.setDate(today.getDate() - 1);
        break;

      case "From last Week":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = new Date();
        break;

      case "From last Year":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        endDate = new Date();
        break;

      case "From last Decade":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 10);
        endDate = new Date();
        break;

      case "From Day Of Birth":
        startDate = new Date("1990-01-01");
        endDate = new Date();
        break;

      default:
        return;
    }

    searchTodo(null, option, startDate.toISOString(), endDate.toISOString());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchTodo(inputValue, null, null, null);
    setsearchTodo(false);
    navigate("/home");
  };

  const searchTodo = async (keyword, date, startDate, endDate) => {
    try {
      const token = localStorage.getItem("authToken");
      const queryParams = new URLSearchParams();

      if (keyword) queryParams.append("keyword", keyword);
      if (date) queryParams.append("date", date);
      if (startDate && endDate) {
        queryParams.append("startDate", startDate);
        queryParams.append("endDate", endDate);
      }

      console.log("Query Params:", queryParams.toString());

      const response = await axios.get(
        `http://localhost:8080/api/v1/searchtodo?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos([...response.data]);
      console.log("Fetched Todos:", response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const CloseModel = () => {
    setsearchTodo(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-600 absolute top-0 right-2 cursor-pointer">
        <button onClick={CloseModel}>
          <IoClose />
        </button>
      </div>
      <div className="flex w-full h-full flex-col gap-10 p-10">
        <form
          action="POST"
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-5"
        >
          <input
            className="py-4 indent-6 outline-none rounded-md text-lg"
            placeholder="Search..."
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <select
            className="py-4 outline-none rounded-md text-md"
            id="dropdown"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="Options">Options</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Day before yesterday">Day before yesterday</option>
            <option value="From last Week">From Last Week</option>
            <option value="From last Year">From Last Year</option>
            <option value="From last Decade">From Last Decade</option>
            <option value="From Day Of Birth">From Day Of Birth</option>
          </select>
          <div className="relative">
            <button
              className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
              type="submit"
            >
              Search ToDo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchTodo;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoClose } from "react-icons/io5";
// import axios from "axios";

// function SearchTodo({ setsearchTodo }) {
//   // const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const [inputValue, setInputValue] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");

//   // const handleUsernameChange = (e) => {
//   //   setSearch(e.target.value);
//   // };
//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSelectChange = (e) => {
//     setSelectedOption(e.target.value);
//     // Generate appropriate date ranges based on selected option
//     let startDate, endDate;
//     const today = new Date();

//     switch (option) {
//       case "Yesterday":
//         startDate = new Date(today.setDate(today.getDate() - 1));
//         endDate = new Date(today.setDate(today.getDate() + 1)); // Today, 00:00
//         break;

//       case "Day befor yesterday":
//         startDate = new Date(today.setDate(today.getDate() - 2));
//         endDate = new Date(today.setDate(today.getDate() + 1)); // Yesterday, 00:00
//         break;

//       case "From last Week":
//         startDate = new Date(today.setDate(today.getDate() - 7));
//         endDate = new Date(); // Today
//         break;

//       case "From last Year":
//         startDate = new Date(today.setFullYear(today.getFullYear() - 1));
//         endDate = new Date(); // Today
//         break;

//       case "From last Decade":
//         startDate = new Date(today.setFullYear(today.getFullYear() - 10));
//         endDate = new Date(); // Today
//         break;

//       case "From Day Of Birth":
//         startDate = new Date("1990-01-01"); // Example: Replace with actual birth date
//         endDate = new Date(); // Today
//         break;

//       default:
//         return; // Do nothing if "Options" is selected
//     }
//   };
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log({ inputValue });
//     setsearchTodo(false);
//     navigate("/home");
//     const isoDate = new Date().toISOString();
//     console.log(isoDate);
//   };
//   searchTodo(inputValue , )
//   const CloseModel = () => {
//     setsearchTodo(false);
//   };

//   const searchTodo = async (keyword, date, startDate, endDate) => {
//     try {
//       const token = localStorage.getItem("authToken");

//       const queryParams = new URLSearchParams();
//       if (keyword) queryParams.append("keyword", keyword);
//       if (date) queryParams.append("date", date);
//       if (startDate && endDate) {
//         queryParams.append("startDate", startDate);
//         queryParams.append("endDate", endDate);
//       }
//       const response = await axios.get(
//         `http://localhost:8080/api/v1/searchtodo?${queryParams.toString()}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Fetched Todos:", response.data);
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//     }
//   };

//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-600  absolute top-0 right-2 cursor-pointer">
//         <button onClick={CloseModel}>
//           <IoClose />
//         </button>
//       </div>
//       <div className="flex w-full h-full flex-col gap-10 p-10">
//         <div>
//           <form
//             action="POST"
//             onSubmit={handleFormSubmit}
//             className="flex flex-col gap-5"
//           >
//             <input
//               className="py-4 indent-6 outline-none rounded-md text-lg"
//               placeholder="Search..."
//               type="text"
//               value={inputValue}
//               onChange={handleInputChange}
//             />
//             <select
//               className="py-4 outline-none rounded-md text-md"
//               id="dropdown"
//               value={selectedOption}
//               onChange={handleSelectChange}
//             >
//               <option value="Options">Options</option>
//               <option value="Yesterday">Yesterday</option>
//               <option value="Day befor yesterday">Day befor yesterday</option>
//               <option value="From last Week">From Last Week</option>
//               <option value="From last Week">From Last Week</option>
//               <option value="From last year">From Last Year</option>
//               <option value="From last Decade">From Last Decade</option>
//               <option value="From Day Of Birth">From Day Of Birth</option>
//             </select>
//             <div className="relative">
//               <button
//                 className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
//                 onClick={handleFormSubmit}
//               >
//                 Search ToDo
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchTodo;
