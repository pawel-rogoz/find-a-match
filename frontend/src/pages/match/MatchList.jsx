import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function MatchList () {
    const current_date = new Date()
    const [currentMatches, setCurrentMatches] = useState(null)
    const [pastMatches, setPastMatches] = useState(null)

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/matches`
        })
        .then(response => response.data)
        .then(response => {
            let pastArray = []
            let currentArray = []
            response.forEach((match) => {
                const match_date = new Date(match.match_date)
                if (match_date > current_date) {
                    currentArray.push(match)
                } else {
                    pastArray.push(match)
                }
            })
            setCurrentMatches(currentArray)
            setPastMatches(pastArray)
        })
    }, [])

    return (
        <>
            <h1>
                MatchList
            </h1>
            <div>
                <h2>Current Matches</h2>
                <ul>
                    {currentMatches ? currentMatches.map(match => <li key={match.match_id}><Link to={`/matches/${match.match_id}`}>{match.match_name}</Link></li>) : null}
                </ul>
            </div>
            <div>
                <h2>Past Matches</h2>
                <ul>
                    {pastMatches ? pastMatches.map(match => <li key={match.match_id}><Link to={`/matches/${match.match_id}`}>{match.match_name}</Link></li>) : null}
                </ul>
            </div>
        </>

    )
}

export default MatchList