import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function Match ({ userName, userId }) {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [players, setPlayers] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/matches/${id}`
        })
        .then(response => response.data)
        .then(response => setData(response))
    }, [])

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/matches/${id}/users`
        })
        .then(response => response.data)
        .then(response => {
            setPlayers(response)
        })
    }, [])

    const handleClick = (event) => {
        console.log(event.target.id)
        console.log(typeof event.target.id)
        const eventType = event.target.id
        if (eventType === 'add') {
            axios({
                method: 'post',
                url: `http://localhost:3001/api/matches/${id}/users`,
                headers: { token: localStorage.token } 
            })
            .catch(error => console.error(error))
            setPlayers(players.concat([{user_name: userName, user_id: userId}]))
        } else if (eventType === 'remove') {
            axios({
                method: 'delete',
                url: `http://localhost:3001/api/matches/${id}/users`,
                headers: {token: localStorage.token }
            })
            .catch(error => console.error(error))
            setPlayers(players.filter(player => player.user_id != userId))
        }
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false}
        const formattedDate = new Date(date).toLocaleString('en-US', options);
        return formattedDate;
    }

    return (
        <>
            <div id="match-data">
                <h1>{data.match_name}</h1>
                <h2>Kiedy?</h2>
                {data.match_date}
                <h2>{formatDate(data.match_date)}</h2>
            </div>
            <div id="object">
                <h2>Gdzie?</h2>
                <h2>{data.object_name}</h2>
                <iframe src={data.object_url} />
            </div>
            <div id="players">
                <h2>Players {players.length}/{data.num_players}</h2>
                <ul>
                    {players.length === 0 ? <p>No players yet</p> : players.map(player => <li key={player.user_id}>{player.user_name}{player.user_id === data.host_id ? <b> HOST</b> : null}{player.user_id === userId ? <b> YOU</b> : null}</li>)}
                </ul>
            </div>
            <div id="action">
                {players.filter(player => player.user_id === userId).length === 1 ? (
                    <button id="remove" onClick={handleClick}>Leave match</button>
                )   
                : (
                    players.length < data.num_players ? (
                        <button id="add" onClick={handleClick}>Join match</button>
                    )
                    :
                    (
                        <button>Can't join</button>
                    )
                )}
            </div>
        </>
    )
}

export default Match