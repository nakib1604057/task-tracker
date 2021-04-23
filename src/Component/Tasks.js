import Task from './Task'

const Tasks = ({tasks,taskDelete,toggleTask}) => {


    return (
      <>
      {tasks.map((task)=>(
      <Task key={task.id} task={task} taskDelete={taskDelete} toggleTask={toggleTask}/>
    
      ))}
      </>
    )
}

export default Tasks
