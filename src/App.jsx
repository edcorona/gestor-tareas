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

  return (
    <>
      <div className='pos-container'>
        <div className='column-container'>
          <Input placeholder="Buscar tarea" value={buscarTarea} onChangeValue={setBuscarTarea} />
          
          {tareas
          .filter(tarea => tarea.title.toLowerCase().includes(buscarTarea.toLowerCase()))
          .map(tarea => 
            <div key={tarea.id} style={{display: 'flex', flexDirection:'row', justifyContent:'center', gap:10}}>
              <BotonTask 
                label={`${tarea.title} ${tarea.completed ? "✅" : "❌"}`} 
                className='tarea-container' 
                handleClick={() => {
                  handletoggleTask(tarea.id);}}
                />

              <BotonTask  
                label={"❌"}
                className='iconDel-btn'
                handleClick={() => {
                  delTask(tarea.id)
                }}
              />
            </div>

          )}
          
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
