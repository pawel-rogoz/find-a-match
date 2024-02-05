import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Dashboard ({ userData, setUserData }) {
    const [matches, setMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const logout = async (event) => {
        event.preventDefault()

        try {
            localStorage.removeItem("token")
            setUserData({name: null, id: null})
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/users/${userData.id}/matches`)
            .then(response => response.data)
            .then(response => setMatches(response))
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Welcome {userData.name}</h2>
            <button onClick={event => logout(event)} className="btn btn-primary">Logout</button>
            {!isLoading ? (
                matches.length > 0 ? (
                    matches.map(match => <li key={match.match_id}><Link to={`/matches/${match.match_id}`}>{match.match_name}</Link></li>)
                ) : (
                    null
                )
            ) : (
                <p>Loading data...</p>
            )}
        </>
    )
}

export default Dashboard