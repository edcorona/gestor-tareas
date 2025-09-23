import { Check, Trash2, X } from 'lucide-react';
import BotonTask from '../BotonTask/BotonTask.component';

const TaskItem = ({tarea, onToggle, onDelete}) => {
    return (
        <div style={{display: 'flex', flexDirection:'row', justifyContent:'center', gap:10}}>
              <BotonTask 
                label={
                  <>
                    {tarea.title} {tarea.completed ? <Check color='green'/> : <X color='red' />}
                  </>
                } 
                className='tarea-container' 
                handleClick={() => onToggle(tarea.id)}
                />
              <div style={{padding:'0.5rem'}}>{tarea.priority}</div>
              <BotonTask  
                label={<Trash2 color='red'/>}
                className='iconDel-btn'
                handleClick={() => onDelete(tarea.id)}
              />
            </div>
    );
};

export default TaskItem;