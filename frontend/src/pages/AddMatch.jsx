import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Button, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, useToast } from "@chakra-ui/react";

function AddMatch() {
    const navigate = useNavigate()
    const toast = useToast()

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

        console.log(param_name, param_value)

        setData({...data, [param_name]: param_value})
    }

    const handleNumberChange = (event) => {
        console.log(event)
        setData({...data, 'num_players': event})
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
            toast({title: 'Match created', description: 'You will be redirected to match page', status: 'success', duration: 3000})
            setTimeout(() => navigate(`/matches/${response.match_id}`), 3000)
        })
        .catch(error => {
            console.error(error)
            toast({title: 'Match can\'t be created', description: "Check your form's data", status: 'error', duration: 3000})
        })
    }

    // return (
    //     <div>
    //         <form style={{
    //             display: 'flex',
    //             flexDirection: 'column'
    //         }}
    //         onSubmit={handleSubmit}
    //         >
    //             <label htmlFor="match_name">Match Name</label>
    //             <input type="text" id="match_name" onChange={handleChange}/>
    //             <label htmlFor="match_description">Match Description</label>
    //             <input type="text" id="match_description" onChange={handleChange}/>
    //             <label htmlFor="match_date" >Date and Time</label>
    //             <input type="datetime-local" id="match_date" step={900} onChange={handleChange}/>
    //             <label htmlFor="num_players">How many players?</label>
    //             <input type="number" id="num_players" min="1" max="22" onChange={handleChange}/>
    //             <label htmlFor="object_id">Choose an object:</label>
    //             <select id="object_id" onChange={handleChange}>
    //                 <option selected disabled value=''>Please choose an object</option>
    //                 {objects ? (
    //                     objects.map((object) => {
    //                         return <option key={object.object_id} value={object.object_id}>{object.object_name}</option>
    //                     })
    //                 ) : (
    //                     null
    //                 )}
    //             </select>
    //             <input type="submit" value="submit" />
    //         </form>
    //     </div>
    // )

    return (
        <Stack spacing={3} m={5} maxW={600}>
            <Heading>Want to add new match?</Heading>
            <Text as='b'>Complete this form</Text>
            <Text m={0}>Match's name:</Text>
            <Input id="match_name" onChange={handleChange} type='text' placeholder="Evening match..."></Input>
            <Text m={0}>Match's description</Text>
            <Input id="match_description" onChange={handleChange} type='text' placeholder='6v6 match, two halfs of 35 mins...'></Input>
            <Text m={0}>Match's date</Text>
            <Input id="match_date" type='datetime-local' min={new Date} onChange={handleChange}></Input>
            <Text m={0}>Number of players</Text>
            <NumberInput id="num_players" defaultValue={12} min={1} max={30} onChange={handleNumberChange}>
                <NumberInputField id="num_players"/>
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Text m={0}>Choose an object:</Text>
            <Select id="object_id" placeholder='Select object' onChange={handleChange}>
                {/* <option selected disabled value=''>Click here to see the list of objects</option> */}
                {objects ? (
                    objects.map((object) => {
                        return <option key={object.object_id} value={object.object_id}>{object.object_name}</option>
                    })
                ) : (
                    null
                )}
            </Select>
            <Button colorScheme='teal' mt={5} maxW={150} onClick={handleSubmit}>SUBMIT</Button>
        </Stack>
    )
}

export default AddMatch