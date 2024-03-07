import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './components/Todo'
import Todos from './components/Todos'
import io from 'socket.io-client';
import Auth from './components/Auth';


function App() {
  const [count, setCount] = useState(0)
  const [socket] = useState(() => io(':8000'));
  const nonTrue = false;
  const userId = localStorage.getItem('userId');
  const [loguser, setLogUser] = useState({ id: '', email: '' });
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            userId ?
              <>
                <Route path="/" element={<Todos socket={socket}></Todos>} />

                <Route path="/todo" element={<Todo />} />
              </>
              :
              <>

                <Route path="/" element={<Auth loguser={loguser} setLogUser={setLogUser} />} />

                <Route path="/todo" element={<Auth loguser={loguser} setLogUser={setLogUser}/>} />
                <Route path="/auth" element={<Auth loguser={loguser} setLogUser={setLogUser}/>} />
              </>



          }




        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
