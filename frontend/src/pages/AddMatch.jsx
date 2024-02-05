import { useEffect, useState } from "react"
import axios from "axios"

function AddMatch() {
    const [data, setData] = useState({
        match_name: null,
        match_description: null,
        match_date: null,
        num_players: null,
        object_id: null
    })
    const [objects, setObjects] = useState(null)

    const { match_name, match_description, match_date, num_players, object_id } = data

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/objects')
            .then(response => response.data)
            .then(response => setObjects(response))
            .catch(error => console.error('Error', error))
    }, [])

    const handleChange = (event) => {
        const param_name = event.target.id
        const param_value = param_name !== 'match_date' ? event.target.value : new Date(event.target.value).toISOString()

        setData({...data, [param_name]: param_value})
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
                <label htmlFor="match_name">Match Name</label>
                <input type="text" id="match_name" onChange={handleChange}/>
                <label htmlFor="match_description">Match Description</label>
                <input type="text" id="match_description" onChange={handleChange}/>
                <label htmlFor="match_date" >Date and Time</label>
                <input type="datetime-local" id="match_date" step={900} onChange={handleChange}/>
                <label htmlFor="num_players">How many players?</label>
                <input type="number" id="num_players" min="1" max="22" onChange={handleChange}/>
                <label htmlFor="object_id">Choose an object:</label>
                <select id="object_id" onChange={handleChange}>
                    <option selected disabled value=''>Please choose an object</option>
                    {objects ? (
                        objects.map((object) => {
                            return <option key={object.object_id} value={object.object_id}>{object.object_name}</option>
                        })
                    ) : (
                        null
                    )}
                </select>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default AddMatch