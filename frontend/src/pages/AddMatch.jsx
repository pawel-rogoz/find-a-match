import { useState } from "react"
import axios from "axios"

function AddMatch() {
    const [data, setData] = useState({
        match_name: null,
        match_description: null,
        match_date: null,
        num_players: null
    })

    const { match_name, match_description, match_date, num_players } = data
    const object_id = 1

    const handleChange = (event) => {
        console.log(event.target.id)
        setData({...data, [event.target.id]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(data)
        axios({
            method: "POST",
            url: `http://localhost:3001/api/matches`,
            headers: {token : localStorage.token},
            data: { match_name, match_description, match_date, num_players, object_id }
        })
        .then(response => response.data)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error(error))
    }

    return (
        <div>
            <form style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            onSubmit={handleSubmit}
            >
                <label for="match_name">Match Name</label>
                <input type="text" id="match_name" onChange={handleChange}/>
                <label for="match_description">Match Description</label>
                <input type="text" id="match_description" onChange={handleChange}/>
                <label for="match_date" >Date and Time</label>
                <input type="datetime-local" id="match_date" step={900} onChange={handleChange}/>
                <label for="num_players">How many players?</label>
                <input type="number" id="num_players" min="1" max="22" onChange={handleChange}/>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default AddMatch