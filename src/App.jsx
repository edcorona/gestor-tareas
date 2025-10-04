import { useEffect, useState } from 'react'

import { PacmanLoader } from 'react-spinners'
import './App.css'
import Input from './components/Input/Input.component'
import BotonTask from './components/BotonTask/BotonTask.component'
import TaskList from './components/taskList/taskList.component'
import { Plus } from 'lucide-react'

const App = () => {

  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true);
  const [nuevaTarea, setNuevaTarea] = useState("")
  const [buscarTarea, setBuscarTarea] = useState("")
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        setTimeout(async ()=> {
          const response = await fetch('http://localhost:3001/tareas');

          if(!response.ok)
            throw new Error(`HTTP GET error! Estatus: ${response.status}`);

          const data = await response.json();
          console.log(data);
          setTareas(data);
          setLoading(false);
        }, 5000);
      } catch (error) {
        console.error('Error buscando tareas', error);
        setError('A ocurrido un error al buscar la data. Por favor intenta más tarde');
        setLoading(false);
      }
    }

    fetchTareas();

  }, [])

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

  const addTask = async (titulo) => {
    try {  
      if (!titulo.trim()) {
        return alert("La tarea no puede estar vacía");
        }

        const response = await fetch('http://localhost:3001/tareas', {
          method: 'POST',
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
            title: titulo.trim(),
            completed: false,
            priority: "media"
          })
        })
        if(!response.ok)
          throw new Error(`HTTP POST error! Estatus: ${response.status}`);

        const data = await response.json();
        setTareas(prev => [...prev, data]) //functional update
        setNuevaTarea("")

      } catch(error) {
        console.error('Error agregando tarea', error);
        setError('A ocurrido un error al agregar tarea')
        setLoading(false);
      }
    
    
  }

  const handletoggleTask = async (id) => {
    try {

      const tarea = tareas.find(tar => tar.id === id);
      if (!tarea)
        throw new Error('Tarea no encontrada');

      const response = await fetch(`http://localhost:3001/tareas/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ completed: !tarea.completed })
      })
      if (!response.ok)
        throw new Error(`HTTP PATCH  error! Estatus: ${response.status}`);

      const data = await response.json();
      setTareas(prev => prev.map(tar => tar.id === id ? { ...tar, ...data } : tar )); //functional update

    } catch(error) {
      console.error('Error actualizando estatus tarea', error);
      setError('A ocurrido un error al actualizar estatus tarea');
      setLoading(false);
    }
  }

  const delTask = async (id) => {
    try {
      const tarea = tareas.find(tar => tar.id === id);
      if (!tarea)
        throw new Error('Tarea no encontrada');

      const response = await fetch(`http://localhost:3001/tareas/${id}`, { 
        method: "DELETE",
      })
      if (!response.ok)
        throw new Error(`HTTP DELETE error! Estatus: ${response.status}`);

      // json-server responde con {} en DELETE, no hace falta leer el body
      setTareas(prev => prev.filter(tar => tar.id !== id)); //functional update

    } catch(error) {
      console.error('Error eliminando tarea', error);
      setError('A ocurrido un error al eliminar tarea');
      setLoading(false);
    }

  }
  

  return (
    <>
      <div className='pos-container'>
        <div className='column-container'>
          <Input placeholder="Buscar tarea" value={buscarTarea} onChangeValue={setBuscarTarea} />
          {
            loading ? (<PacmanLoader color='#fff506' size={25} />) : (<TaskList
              tareas={tareas}
              buscarTarea={buscarTarea}
              onToggle={handletoggleTask}
              onDelete={delTask}
            />)
          }
          
          
          <div className='add-container'>
              <Input placeholder="Nueva tarea" value={nuevaTarea} onChangeValue={setNuevaTarea} />

              <BotonTask className={'tarea-container'}
              label={
                <>
                {<Plus color='yellow'/>}
                {`Añadir ${tareas.length}`}
                </>
              }
              handleClick={() => addTask(nuevaTarea)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
