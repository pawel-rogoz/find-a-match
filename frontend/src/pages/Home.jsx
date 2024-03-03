import axios from "axios"
import { useEffect, useState } from "react"
import Match from "../components/Match/Match"
import { Text, Flex, Stack, Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

function Home ({ userData }) {
    const navigate = useNavigate()
    const min_date = new Date()
    const max_date = new Date()
    max_date.setHours(23,59,59,0)

    const [matches, setMatches] = useState([])

    const { name, id } = userData

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/matchesBetweenDates',
            params: { min_date, max_date}
        })
        .then(response => response.data)
        .then(response => setMatches(response))
        .catch(error => console.error(error))
    }, [])

    return (
        <>
            <Stack mx="5vw">
                <div>
                    <Text fontSize='4xl' as='b'>
                        Hi{name ? `, ${name}` : ''}
                    </Text>
                </div>
                <div>
                    <Text fontSize='2xl' as='b'>Today's Matches</Text>
                    {matches.length > 0 ? 
                    (
                        <Flex justifyContent="center" mt="5" mx={10}>
                            {matches.slice(0,3).map(match => <Match key={match.match_id} match={match} width={'25vw'} showDate={false}/>)}
                        </Flex>
                    )
                    :
                    (
                        <p>There are no matches today</p>
                    )}
                </div>
                <Flex mt={5} direction="row" justifyContent='center' alignItems='center' w="100vw">
                    <Flex w="50%" justifyContent='center'>
                        <Button fontSize={14} colorScheme='teal' as='b' onClick={() => navigate('/matches')}>SEE ALL MATCHES</Button>
                    </Flex>
                    <Flex w="50%">
                        <Button fontSize={14} colorScheme='teal' as='b' onClick={() => navigate('/add-match')}>ADD YOUR OWN</Button>
                    </Flex>
                </Flex>
            </Stack>
        </>
    )
}

export default Home