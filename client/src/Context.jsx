import { createContext, useContext, useState } from "react";

const TodoContext = createContext({});

function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {" "}
      {children}{" "}
    </TodoContext.Provider>
  );
}

function useTodoContext(){
    return useContext(TodoContext);
}

export {TodoContextProvider ,useTodoContext}