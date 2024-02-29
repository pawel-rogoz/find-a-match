import { useEffect, useState } from "react"
import { Link, Route, Routes, Navigate } from "react-router-dom"
import axios from "axios"

import MatchRoutes from "./pages/match/MatchRoutes"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import User from "./pages/User"
import Object from "./pages/Object"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/auth/Dashboard"
import AddMatch from "./pages/AddMatch"

import PageLayout from "./layouts/PageLayout"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const [userData, setUserData] = useState({
    name: null,
    id: null
  })

  const verify = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/auth/verify',
      headers: { token: localStorage.token }
    })
    .then(response => response.data)
    .then(response => {
      if (response.authenticated === true) {
        console.log('Name', response.name)
        console.log('Id', response.id)
        setUserData({name: response.name, id: response.id})
      }
    })
    .catch(error => console.error(error.message))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <PageLayout userData={userData}>
      {
        !isLoading ? (
        <Routes>
          <Route path="/" element={<Home userData={userData} />} />
          <Route path="/login" element={
            !userData.id ?
              <Login setUserData={setUserData} />
            :
              <Navigate to="/dashboard" replace={true} />
          }
          />
          <Route path="/dashboard" element={
            userData.id ?
              <Dashboard userData={userData} setUserData={setUserData} />
            :
              <Navigate to="/login" replace={true} />
          }
          />
          <Route path="/add-match" element={
            userData.id ?
              <AddMatch />
            :
              <Navigate to="/login" replace={true} />
          } 
          />
          <Route path="/matches/*" element={<MatchRoutes userData={userData} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/objects/:id" element={<Object />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        ) : (
          null
        )
      }
    </PageLayout>
  )
}

export default App
