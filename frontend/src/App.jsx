import { useEffect, useState } from "react"
import { Link, Route, Routes, Navigate } from "react-router-dom"
import axios from "axios"

import MatchRoutes from "./components/match/MatchRoutes"
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import User from "./components/User"
import Object from "./components/Object"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/auth/Dashboard"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
    .then(parseResponse => {
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    })
    .catch(error => console.error(error.message))
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/matches">Matches</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/matches/*" element={<MatchRoutes />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/objects/:id" element={<Object />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
