/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";

function Listtasks({ tasks, setTasks }) {

  const [todo, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks?.filter((task) => task.status === "todo");
    const fInprogress = tasks?.filter((task) => task.status === "inprogress");
    const fclosed = tasks?.filter((task) => task.status === "closed");

    setTodos(fTodos);
    setInprogress(fInprogress);
    setClosed(fclosed);
  }, [tasks]);

  const states = ["todo", "inprogress", "closed"];

  return (
    <div className="flex gap-16">
      {states.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todo={todo}
          inprogress={inprogress}
          closed={closed}
        />
      ))}
    </div>
  );
}

export default Listtasks;

function Section({ status, tasks, setTasks, todos, todo, inprogress, closed }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task", 
    drop: (item) => addItemTOSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "todo") {
    text = "Todo";
    bg = "bg-orange-400";
    tasksToMap = todo;
  }

  if (status === "inprogress") {
    text = "In progress";
    bg = "bg-purple-500";
    tasksToMap = inprogress;
  }

  if (status === "closed") {
    text = "closed";
    bg = "bg-green-500";
    tasksToMap = closed;
  }

  const addItemTOSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast("✈️Task status changed ✈️");

      return mTasks;
    });
  };
  return (
    <div
      ref={drop}
      className={`w-64 rounded-md ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap?.length ?? 0} />
      {tasksToMap?.length > 0 &&
        tasksToMap?.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
}

function Header({ text, bg, count }) {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className=" ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
}

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks?.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);

    toast("🌚Task Removed 🌚");
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      } `}
    >   
       <h1>{task.name}</h1> 
      <button
        className="absolute bottom-1 right-1 text-slate-600"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}
