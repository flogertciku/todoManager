import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import LogOut from "./LogOut"
const Todo =()=>{
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        dueDate: "",
        state: "todo",
        creator: userId
    })
    const [errors, setErrors] = useState({})
    const AddTodo = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/todo",form,{ withCredentials: true })
            .then(res=>{
                navigate('/')
                console.log(res)
                
            })
            .catch(err=> err.response.data.errors? setErrors(err.response.data.errors) : console.log(err))
    }
    return (
        <div>
            <LogOut/>
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