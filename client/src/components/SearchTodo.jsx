import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function SearchTodo({ setsearchTodo }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleUsernameChange = (e) => {
    setSearch(e.target.value);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ search });
    setsearchTodo(false);
    navigate("/home");
  };
  const CloseModel = () => {
    setsearchTodo(false);
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-600  absolute top-0 right-2 cursor-pointer">
        <button onClick={CloseModel}>
          <IoClose />
        </button>
      </div>
      <div className="flex w-full h-full flex-col gap-10 p-10">
        <div>
          <form
            action="POST"
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5"
          >
            <input
              className="py-4 indent-6 outline-none rounded-md text-lg"
              placeholder="Search..."
              type="text"
              value={search}
              onChange={handleUsernameChange}
            />
            <select
              className="py-4 outline-none rounded-md text-md"
              id="dropdown"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="Options">Options</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Day befor yesterday">Day befor yesterday</option>
              <option value="From last Week">From Last Week</option>
              <option value="From last Week">From Last Week</option>
              <option value="From last year">From Last Year</option>
              <option value="From last Decade">From Last Decade</option>
              <option value="From Day Of Birth">From Day Of Birth</option>
            </select>
            <div className="relative">
              <button
                className="bg-zinc-900 text-white px-6 py-2 rounded-lg absolute right-0 text-lg"
                onClick={handleFormSubmit}
              >
                Search ToDo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchTodo;
