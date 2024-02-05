import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function MatchList () {
    const current_date = new Date()
    const [currentMatches, setCurrentMatches] = useState([])
    const [pastMatches, setPastMatches] = useState([])
    const [showCurrent, setShowCurrent] = useState(true)
    const [showPast, setShowPast] = useState(false)

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
            <div id="checkInput">
                <form>
                    <label htmlFor="current">Show Current</label>
                    <input type="checkbox" id="current" checked={showCurrent} onChange={() => setShowCurrent(!showCurrent)} />
                    <br/>
                    <label htmlFor="past">Show Past</label>
                    <input type="checkbox" id="past" checked={showPast} onChange={() => setShowPast(!showPast)} />
                </form>
            </div>
            {showCurrent ? (
                <div>
                    <h2>Current Matches</h2>
                    {currentMatches.length > 0 ? (
                        <ul>
                        {currentMatches ? currentMatches.map(match => <li key={match.match_id}><Link to={`/matches/${match.match_id}`}>{match.match_name}</Link></li>) : null}
                        </ul>
                    ) : (
                        <p>No current matches</p>
                    )}

                </div>
            ) : (
                null
            )}
            {showPast ? (
                <div>
                    <h2>Past Matches</h2>
                    {pastMatches.length > 0 ? (
                        <ul>
                        {pastMatches ? pastMatches.map(match => <li key={match.match_id}><Link to={`/matches/${match.match_id}`}>{match.match_name}</Link></li>) : null}
                        </ul>
                    ) : (
                        <p>No past matches</p>
                    )}

                </div>
            ) : (
                null
            )}
        </>

    )
}

export default MatchList