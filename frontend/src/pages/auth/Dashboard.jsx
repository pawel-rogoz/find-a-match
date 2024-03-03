import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import Match from "../../components/Match/Match"

function Dashboard ({ userData, setUserData }) {
    const [pastMatches, setPastMatches] = useState([])
    const [upcomingMatches, setUpcomingMatches] = useState([])
    const [completedMatches, setCompletedMatches] = useState([])

    const now = new Date()

    const logout = async (event) => {
        event.preventDefault()

        try {
            localStorage.removeItem("token")
            setUserData({name: null, id: null})
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/users/${userData.id}/matches`)
            .then(response => response.data)
            .then(response => {
                const upcoming = response.filter(match => {
                    const date = new Date(match.match_date)
                    return date > now
                })
                const completed = response.filter(match => match.completed)
                const past = response.filter(match => {
                    const date = new Date(match.match_date)
                    return date < now
                })
                setUpcomingMatches(upcoming)
                setCompletedMatches(completed)
                setPastMatches(past)
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <>
            <Box mx={5}>
                <Stack spacing={3}>
                    <Heading>Dashboard</Heading>
                    <Button onClick={() => logout(event)} colorScheme="teal">LOGOUT</Button>
                    <Text fontSize='xl' as='b'>UPCOMING MATCHES</Text>
                    <Flex wrap='wrap' justifyContent='center'>
                        {upcomingMatches.map(match => <Match key={match.match_id} match={match} width={'30vw'} showDate={true}/>)}
                    </Flex>
                    <Text fontSize='xl' as='b'>COMPLETED MATCHES</Text>
                    <Flex wrap='wrap' justifyContent='center'>
                        {completedMatches.map(match => <Match key={match.match_id} match={match} width={'30vw'} showDate={true}/>)}
                    </Flex>
                    <Text fontSize='xl' as='b'>PAST MATCHES</Text>
                    <Flex wrap='wrap' justifyContent='center'>
                        {pastMatches.map(match => <Match key={match.match_id} match={match} width={'30vw'} showDate={true}/>)}
                    </Flex>
                </Stack>
            </Box>
        </>
    )
}

export default Dashboard