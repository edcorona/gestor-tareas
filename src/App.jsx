import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/Input/Input.component'
import BotonTask from './components/BotonTask/BotonTask.component'

const App = () => {

  const [nuevaTarea, setNuevaTarea] = useState("")
  const [buscarTarea, setBuscarTarea] = useState("")

  const [tareas, setTareas] = useState([
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
  ]);

  console.log(tareas);

  const addTask = (titulo) => {
    if (!titulo.trim() === "") {
    setTareas([...tareas, {id: Date.now(), title: titulo, completed:false}]);
    } else {
      alert("La tarea no puede estar vacía");
    }
  }

  const handletoggleTask = (id) => {
    const tareasActualizadas = tareas.map(tar => tar.id === id ? { ...tar, completed: !tar.completed } : tar)
    setTareas(tareasActualizadas);
  }

  return (
    <>
      <div className='pos-container'>
        <div className='column-container'>
          <Input placeholder="Buscar tarea" value={buscarTarea} onChangeValue={setBuscarTarea} />
          
          {tareas
          .filter(tarea => tarea.title.toLowerCase().includes(buscarTarea.toLowerCase()))
          .map(tarea => 
            <BotonTask 
              key={tarea.id}
              label={`${tarea.title} ${tarea.completed ? "✅" : "❌"}`} 
              className='tarea-container' 
              handleClick={() => {
                handletoggleTask(tarea.id);}}
              />
          )}
          
          <div className='add-container'>
              <Input placeholder="Nueva tarea" value={nuevaTarea} onChangeValue={setNuevaTarea} />

              <BotonTask 
              label={`➕ Añadir ${tareas.length}`}
              handleClick={() => {
                addTask(nuevaTarea),
                setNuevaTarea("")
              }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
