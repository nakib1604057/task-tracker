import { useState } from 'react'

const AddTask = ({onAdd}) => {

    const [text , setTaskText] = useState('')
    const [time , setTaskDay] = useState('')
    const [reminder, setTaskReminder] = useState(false)


    const taskSubmit = (e)=>{
         e.preventDefault()
      if(!text){
           alert("please enter somthing")
           return
      }
      onAdd({text,time,reminder})

      setTaskText('')
      setTaskDay('')
      setTaskReminder(false)
       
    }
    return (
      <form action="" className='add-form' onSubmit={taskSubmit}>
          <div className='form-control'>
               <label htmlFor="">Task</label>
               <input type="text" placeholder="Add Task" value={text} onChange={(e)=>{setTaskText(e.target.value)}}/>
          </div>
          <div className='form-control'>
               <label htmlFor="">Day & Time</label>
               <input type="date" placeholder="Add Day &  Time" value={time} onChange={(e)=>{setTaskDay(e.target.value)}}/>
          </div>
          <div className='form-control form-control-check'>
               <label htmlFor="">Set Reminder</label>
               <input type="checkbox" checked={reminder} value={reminder} onChange={(e)=>{setTaskReminder(e.currentTarget.checked)}}/>
          </div>
          <input type="submit" value='Save Task' className='btn btn-block'/>
      </form>
    )
}

export default AddTask
