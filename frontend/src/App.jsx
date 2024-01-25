import { useEffect, useState } from "react"
import axios from 'axios'

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
      <h1>App</h1>
      {data ? data.map(person => <li key={person.id}>{person.name}</li>) : null}
    </>
  )
}

export default App
