import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Match from "../components/Match"
import { Grid, GridItem, Text, Flex, Stack, Button, Box } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

function Home ({ userData }) {
    const navigate = useNavigate()
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
                        // <Box overflowX="auto" mx={30}>
                            <Flex justifyContent="center" mt="5vh" mx={10}>
                                {matches.slice(0,3).map(match => <Match key={match.match_id} match={match}/>)}
                            </Flex>
                        // </Box>
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