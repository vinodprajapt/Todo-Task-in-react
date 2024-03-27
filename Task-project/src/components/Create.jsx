/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Create = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "", 
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 5) return toast.error("A task must have more than 5 characters");
     
    if (task.name.length > 100) return toast.error("A task must not be more than 100 characters");

    setTasks((prev) => {
      const list = Array.isArray(prev) ? [...prev, task] : [task];

      localStorage.setItem("tasks", JSON.stringify(list));

      return list;
    });
    toast.success("Task Created");
    setTask({
      id: "",
      name: "",
      status: "todo", // Corrected 'state' to 'status'
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={task.name}
        type="text"
        className="border-2 border-slate-600 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button type="submit" className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  );
};

export default Create;
