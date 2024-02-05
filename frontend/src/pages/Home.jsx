import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home ({ userData }) {
    const min_date = new Date()
    const max_date = new Date()
    max_date.setHours(23,59,59,999)

    const [matches, setMatches] = useState([])

    const { name, id } = userData

    useEffect(() => {
        console.log('effect')
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/matchesBetweenDates',
            params: { min_date, max_date}
        })
        .then(response => response.data)
        .then(response => setMatches(response))
        .catch(error => console.error(error))
    }, [])

    const formatDate = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false}
        const formattedDate = new Date(date).toLocaleString('en-US', options);
        return formattedDate;
    }

    return (
        <>
            <div>
                <h1>
                    Hi{name ? `, ${name}` : ''}
                </h1>
            </div>
            <div>
                <h2>Today's Matches</h2>
                {matches.length > 0 ? 
                (
                    <ul>
                        {matches.map(match => <li key={match.match_id}><Link to={`/matches/${match.match_id}`}>{match.match_name}, godzina: {formatDate(match.match_date)}</Link></li>)}
                    </ul>
                )
                :
                (
                    <p>There are no matches today</p>
                )}
            </div>
        </>
    )
}

export default Home