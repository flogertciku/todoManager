import { useState } from "react"
import axios from "axios"
const Todo =()=>{
    const [form, setForm] = useState({
        name: "",
        dueDate: "",
        state: "todo"
    })
    const [errors, setErrors] = useState({})
    const AddTodo = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/todo",form)
            .then(res=>console.log(res))
            .catch(err=>setErrors(err.response.data.errors))
    }
    return (
        <div>
           <form onSubmit={AddTodo}>
            {errors.name? <p>{errors.name.message}</p>:null}
                <input type="text" name="name" id="name" onChange={(e)=> setForm({...form,name:e.target.value})}/>
                {errors.dueDate? <p>{errors.dueDate.message}</p>:null}
                <input type="date" name="dueDate" id="dueDate"  onChange={(e)=> setForm({...form,dueDate:e.target.value})}/>
                <input type="submit" value="Create"/>
           </form>
        </div>
    )
}
export default Todo;