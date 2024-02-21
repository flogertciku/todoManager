import axios from "axios"
import { useEffect,useState } from "react"

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/todo')
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
        console.log("useEffect")
    }, [update])
    const ChangeState = (id,state)=>{
        axios.patch(`http://localhost:8000/api/todo/${id}`,{state:state})
            .then(res=>{console.log(res),setUpdate(!update)})
            .catch(err=>console.log(err))
    }   
    return (
        <div>
            <h1>Todos</h1>
            <ul>
                <li>Todo</li>
                { todos.filter(e=>e.state ==="todo").map((todo, i) => {
                    return <li key={i}>{todo.name} {todo.dueDate} <button onClick={()=>ChangeState(todo._id,"working")} > Start Working </button> </li>
                })}
            </ul>
            <ul>
                <li>working</li>
                { todos.filter(e=>e.state ==="working").map((todo, i) => {
                    return <li key={i}>{todo.name} {todo.dueDate} <button onClick={()=>ChangeState(todo._id,"finished")} > Done </button> </li>
                })}
            </ul>
            <ul>
                <li>finished</li>
                { todos.filter(e=>e.state ==="finished").map((todo, i) => {
                    return <li key={i}>{todo.name} {todo.dueDate} <button onClick={()=>ChangeState(todo._id,"deleted")} > Delete</button> </li>
                })}
            </ul>
   
        </div>
    )
}
export default Todos