import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Todo from './components/Todo'
import Todos from './components/Todos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos></Todos>} />
        <Route path="/todo" element={<Todo/>} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
