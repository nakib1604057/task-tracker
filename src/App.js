import {BrowserRouter as Router , Route} from 'react-router-dom'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Tasks from './Component/Tasks'
import AddTask from './Component/AddTask'
import About from './Component/About'
import React ,{ useState, useEffect } from 'react'


function App() {
const [showAddBtn , setShowAddBtn] = useState(false)
const [tasks , setTasks] = useState([])

useEffect(()=>{
 const getTasks = async ()=>{
   const taksFromServer = await fetchData()
   setTasks(taksFromServer)
 } 
  getTasks()
},[])

const fetchData = async ()=>{
  const rs = await fetch('http://localhost:500/tasks')
  const data = await rs.json()
  return data
}

const fetchTasks = async (id)=>{
  const rs = await fetch(`http://localhost:500/tasks/${id}`)
  const data = rs.json()
  return data
}
const addTask = async (newTasks)=>{
  
  const res = await fetch(`http://localhost:500/tasks`,{
    method:'POST',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(newTasks)
  })

  const addNewTask =await res.json()
  setTasks([...tasks , addNewTask])

  // const id = Math.floor(Math.random()*100)+1 
  // const addNewTask = {id , ...newTasks}
  // setTasks([...tasks , addNewTask])

 }

const taskDelete = async (id)=>{
 await fetch(`http://localhost:500/tasks/${id}`,{
    method:'DELETE',
  })
  setTasks(tasks.filter((task)=>task.id!==id))
}

const taskReminder = async (id)=>{
  
  const fetchTaskData = await fetchTasks(id)
  const updateTask = {...fetchTaskData, reminder:!fetchTaskData.reminder}
  const rs = await fetch(`http://localhost:500/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type' : 'application/json',
    },
    body: JSON.stringify(updateTask)
  })

  const updatedTask = await rs.json()
  setTasks(tasks.map((task)=>task.id === id ? { ...task, reminder : updatedTask.reminder} : task))
 
}

  return (
    <Router>
    <div className="container">
      <Header title="Task Tracker" onAdd={()=>{setShowAddBtn(!showAddBtn)}} showAdd={showAddBtn}/>
     
      <Route path='/' exact render={(props)=>(
        <>
           {showAddBtn && <AddTask onAdd={addTask}/>}
           {tasks.length>0?<Tasks tasks={tasks} taskDelete={taskDelete} toggleTask={taskReminder}/>:'No task to show'}
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}
// class App extends React.Component{
//   render(){
//     return <div>Hello</div>
//   }
// }

export default App;
