import { useEffect, useState } from 'react'
import './App.css'
import Create from './components/Create'
import Listtasks from './components/Listtasks'
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App()  {
  const [tasks, setTasks] = useState([]);

    console.log("tasks", tasks);

    useEffect(() => {
      setTasks(JSON.parse(localStorage.getItem("tasks")));

    },[])

  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <Toaster />
    <div className=' w-screen h-screen flex flex-col items-center p-5 gap-16 pt-32'>
      <Create tasks={tasks} setTasks={setTasks} />
      <Listtasks tasks={tasks} setTasks={setTasks} />
    </div>
    </DndProvider>
    </>
  );
}

export default App;
