import { FaTimes } from 'react-icons/fa'
const Task = ({ task,taskDelete,toggleTask}) => {
  
    return (
        <div className={`task ${task.reminder?'reminder':'' }`} onDoubleClick={()=>toggleTask(task.id)}>
            <h4 > 
            {task.text} 
            <FaTimes style={{color:'red',cursor:'pointer',float:'right'}} onClick={()=>taskDelete(task.id)}/>
            </h4>
            <p>{task.time}</p>
        </div>
    )
}

export default Task
