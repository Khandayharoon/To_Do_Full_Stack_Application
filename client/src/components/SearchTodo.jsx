import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchTodo({ setsearchTodo }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  //   const [inputValue, setInputValue] = useState('');
  //   const [selectedOption, setSelectedOption] = useState('Option 1');

  const handleUsernameChange = (e) => {
    setSearch(e.target.value);
  };
  //   const handleInputChange = (e) => {
  //     setInputValue(e.target.value);
  //   };

  //   const handleSelectChange = (e) => {
  //     setSelectedOption(e.target.value);
  //   };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({ search });
    setsearchTodo(false);
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
              placeholder="Search..."
              required
              type="text"
              value={search}
              onChange={handleUsernameChange}
            />
            {/* <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select> */}
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
