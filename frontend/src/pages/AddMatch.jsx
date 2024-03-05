import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Button, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, useToast } from "@chakra-ui/react";

function AddMatch() {
    const navigate = useNavigate()
    const toast = useToast()
    const defaultNumValue = 12

    const [data, setData] = useState({
        match_name: null,
        match_description: null,
        match_date: null,
        num_players: defaultNumValue,
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

    return (
        <Stack spacing={3} m={5} maxW={600}>
            <Heading>Want to add new match?</Heading>
            <form onSubmit={handleSubmit}>
                <Text as='b'>Complete this form</Text>
                <Text m={0}>Match's name:</Text>
                <Input id="match_name" onChange={handleChange} type='text' placeholder="Evening match..." bgColor='white' />
                <Text m={0}>Match's description</Text>
                <Input id="match_description" onChange={handleChange} type='text' placeholder='6v6 match, two halfs of 35 mins...' bgColor='white' />
                <Text m={0}>Match's date</Text>
                <Input id="match_date" type='datetime-local' min={new Date} onChange={handleChange} bgColor='white' />
                <Text m={0}>Number of players</Text>
                <NumberInput id="num_players" defaultValue={defaultNumValue} min={1} max={30} onChange={handleNumberChange} bgColor='white'>
                    <NumberInputField id="num_players"/>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text m={0}>Choose an object:</Text>
                <Select id="object_id" placeholder='Select object' onChange={handleChange} bgColor='white'>
                    {/* <option selected disabled value=''>Click here to see the list of objects</option> */}
                    {objects ? (
                        objects.map((object) => {
                            return <option key={object.object_id} value={object.object_id}>{object.object_name}</option>
                        })
                    ) : (
                        null
                    )}
                </Select>
                <Button type="submit" colorScheme='teal' mt={5} maxW={150}>SUBMIT</Button>
            </form>
        </Stack>
    )
}

export default AddMatch