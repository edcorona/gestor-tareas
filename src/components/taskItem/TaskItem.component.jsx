import BotonTask from '../BotonTask/BotonTask.component';

const TaskItem = ({tarea, onToggle, onDelete}) => {
    return (
        <div style={{display: 'flex', flexDirection:'row', justifyContent:'center', gap:10}}>
              <BotonTask 
                label={`${tarea.title} ${tarea.completed ? "✅" : "❌"}`} 
                className='tarea-container' 
                handleClick={() => onToggle(tarea.id)}
                />

              <BotonTask  
                label={"❌"}
                className='iconDel-btn'
                handleClick={() => onDelete(tarea.id)}
              />
            </div>
    );
};

export default TaskItem;