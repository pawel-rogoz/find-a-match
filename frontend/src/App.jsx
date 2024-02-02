import { useEffect, useState } from "react"
import { Link, Route, Routes, Navigate } from "react-router-dom"
import axios from "axios"

import MatchRoutes from "./pages/match/MatchRoutes"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import User from "./pages/User"
import Object from "./pages/Object"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Dashboard from "./pages/auth/Dashboard"
import AddMatch from "./pages/AddMatch"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [name, setName] = useState(null)
  const [id, setId] = useState(null)

  const setAuth = (isAuth) => {
    setIsAuthenticated(isAuth)
  }

  const isAuth = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/auth/verify',
      headers: { token: localStorage.token }
    })
    .then(response => response.data)
    .then(response => {
      if (response.authenticated === true) {
        setIsAuthenticated(true)
        setName(response.name)
        setId(response.id)
      } else {
        setIsAuthenticated(false)
      }
    })
    .catch(error => console.error(error.message))
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/matches">Matches</Link></li>
        </ul>
      </nav> */}
      {/* {name} */}
      <Routes>
        <Route path="/" element={<Home userName={name} userId={id} />} />
        <Route path="/login" element={
          !isAuthenticated ?
            <Login setAuth={setAuth}/>
          :
            <Navigate to="/dashboard" replace={true} />
        }
        />
        <Route path="/register" element={
          !isAuthenticated ?
            <Register setAuth={setAuth}/>
          :
            <Navigate to="/dashboard" replace={true} />
        }
        />
        <Route path="/dashboard" element={
          isAuthenticated ?
            <Dashboard setAuth={setAuth}/>
          :
            <Navigate to="/login" replace={true} />
        }
        />
        <Route path="/add-match" element={<AddMatch />} />
        <Route path="/matches/*" element={<MatchRoutes userName={name} userId={id}/>} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/objects/:id" element={<Object />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
