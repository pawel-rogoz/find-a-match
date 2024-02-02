import axios from "axios"
import { useState } from "react"

function Home ({ userName, userId }) {
    const min_date = new Date()
    const max_date = new Date()
    max_date.setHours(23,59,59,999)

    const [matches,setMatches] = useState([])

    const handleClick = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/matchesBetweenDates',
            params: { min_date, max_date}
        })
        .then(response => response.data)
        .then(response => setMatches(response))
        .catch(error => console.error(error))
    }

    return (
        <>
            <div>
                <h1>
                    Hi{userName ? `, ${userName}` : ''}
                </h1>
            </div>
            <div>
                <h2>Matches</h2>
                <button onClick={handleClick}>Click me</button>
                {matches.map(match => <li key={match.match_id}>{match.match_name} {match.match_date}</li>)}
            </div>
        </>
    )
}

export default Home