import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import axios from 'axios'

import MatchRoutes from "./pages/match/MatchRoutes"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import User from "./pages/User"
import Object from "./pages/Object"

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => response.data)
      .then(responseData => setData(responseData))
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
        <Route path="/matches/*" element={<MatchRoutes />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/objects/:id" element={<Object />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}

export default App
