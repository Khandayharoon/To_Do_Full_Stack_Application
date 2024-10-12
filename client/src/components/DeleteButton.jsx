import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { useTodoContext } from "../Context";

export default function DeleteButton({ id }) {
  const { setTodos } = useTodoContext();
  const token = localStorage.getItem("authToken");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/gettodo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/deletetodo?id=${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Todo has been deleted Successfully");
      await fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <button onClick={deleteTodo}>
      <AiTwotoneDelete />
    </button>
  );
}
