import axios from "axios"
import { useEffect,useState } from "react"
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import LogOut from "./LogOut";
const Todos = ({socket}) => {
    const MINUTE_MS = 60000;
    const [todos, setTodos] = useState([])
    const [update, setUpdate] = useState(false)
   
    useEffect(() => {
        socket.on('createdNew', data => setUpdate(!update));
        
        // const interval = setInterval(() => {
        //     setUpdate(!update);
        //   }, MINUTE_MS);
        axios.get('http://localhost:8000/api/todo',{ withCredentials: true })
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
        console.log("useEffect")
    }, [update])
    const ChangeState = (id,state)=>{
        axios.patch(`http://localhost:8000/api/todo/${id}`,{state:state})
            .then(res=>{
                console.log(res),setUpdate(!update)
                socket.emit('createdNewTodo', { message: 'I created a new todo!' });
            
            })
            .catch(err=>console.log(err))
    }   
    return (
        <div>
            <LogOut/>
            <Link to="/todo">Add Todo</Link>
            
            <h1>Todos</h1>
            <ul>
                <li>Todo</li>
                { todos.filter(e=>e.state ==="todo").map((todo, i) => {
                    return <li key={i}>{todo.name} {todo.dueDate} created by :  {todo.creator ? todo.creator.firstName : "" } <button onClick={()=>ChangeState(todo._id,"working")} > Start Working </button> </li>
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