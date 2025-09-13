import TaskItem from '../TaskItem/TaskItem.component';

const TaskList = ({tareas, buscarTarea, onToggle, onDelete}) => {
    return (
        <>
        {tareas
          .filter(tarea => tarea.title.toLowerCase().includes(buscarTarea.toLowerCase()))
          .map(tarea => 
            <TaskItem
                Key={tarea.id}
                tarea={tarea}
                onToggle={onToggle}
                onDelete={onDelete}
            />
          )}
        </>
    );
};

export default TaskList;