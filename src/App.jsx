import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/Input/Input.component'
import BotonTask from './components/BotonTask/BotonTask.component';
import TaskList from './components/taskList/taskList.component'

const App = () => {

  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true);
  const [nuevaTarea, setNuevaTarea] = useState("")
  const [buscarTarea, setBuscarTarea] = useState("")

  useState(()=>{
    const fetchTareas = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=7");
      const data = await res.json();
      console.log(data);
      setTareas(data);
      setLoading(false);
    };

    fetchTareas();
  },[])

  {/*const [tareas, setTareas] = useState([
    {
      id:1,
      title: "Primera tarea",
      completed: false,
    },
    {
      id:2,
      title: "Segunda tarea",
      completed: true,
    },
    {
      id:3,title: "Tercera tarea",
      completed:false
    }
  ]);*/}

  const addTask = (titulo) => {
    
    if (!titulo.trim()) {
      return alert("La tarea no puede estar vacía");
    }

    const nueva = {id: Date.now(), title: titulo.trim(), completed: false }

    setTareas(prev => [...prev, nueva]) //functional update
    setNuevaTarea("")
  }

  const handletoggleTask = (id) => {
    setTareas(prev => prev.map(tar => tar.id === id ? { ...tar, completed: !tar.completed } : tar )); //functional update
  }

  const delTask = (id) => {
    setTareas(prev => prev.filter(tar => tar.id !== id)); //functional update
  }
  if (loading) return <p>Cargando tareas...</p>

  return (
    <>
      <div className='pos-container'>
        <div className='column-container'>
          <Input placeholder="Buscar tarea" value={buscarTarea} onChangeValue={setBuscarTarea} />
          
          <TaskList
            tareas={tareas}
            buscarTarea={buscarTarea}
            onToggle={handletoggleTask}
            onDelete={delTask}
          />
          
          <div className='add-container'>
              <Input placeholder="Nueva tarea" value={nuevaTarea} onChangeValue={setNuevaTarea} />

              <BotonTask 
              label={`➕ Añadir ${tareas.length}`}
              handleClick={() => addTask(nuevaTarea)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
