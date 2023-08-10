import { useEffect, useState } from 'react'
import { Route, Routes, Router, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import { fetchUser } from './utils/fetchUser'
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if(!user) {
      navigate('/login')
    }
  },[])
  return (
    <>
     <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/*' element={<Home />}/>
     </Routes>
    </>
  )
}

export default App
