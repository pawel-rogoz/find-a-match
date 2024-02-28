import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { AspectRatio, Flex, Stack, Text, Box } from "@chakra-ui/react"
import MatchButton from "../../components/MatchButton"

function Match ({ userData }) {
    const { matchId } = useParams()
    const [data, setData] = useState({})
    const [players, setPlayers] = useState([])

    const date = new Date().toISOString()

    const { name, id } = userData

    console.log(name)
    console.log(id)

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/matches/${matchId}`
        })
        .then(response => response.data)
        .then(response => setData(response))
    }, [])

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/matches/${matchId}/users`
        })
        .then(response => response.data)
        .then(response => {
            setPlayers(response)
        })
    }, [])


    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Warsaw'}
        const formattedDate = new Date(date).toLocaleString('en-US', options);
        return formattedDate;
    }

    return (
        <>
            <Box>
                <Flex direction='column' spacing={3} mx={5}>
                    <Text fontSize='2xl' as='b' m={0}>WHEN?</Text>
                    <Text m={0}>{formatDate(data.match_date)}</Text>
                    <Text fontSize='2xl' as='b' m={0}>WHERE?</Text>
                    <Text m={0}>{data.object_name}</Text>
                    <AspectRatio ratio={1 / 1} w='70%' mt={3} mx='auto'>
                        <iframe 
                            src={data.object_url}
                            title='Object location'
                        />
                    </AspectRatio>
                    <Stack mt={3}>
                        <Text fontSize='2xl' as='b'>PLAYERS:</Text>
                        {
                        players.length === 0 ? <Text>No players yet</Text> : players.map(player => <Text key={player.user_id}>{player.user_name}{player.user_id === data.host_id ? <b> HOST</b> : null}{player.user_id === id ? <b> YOU</b> : null}</Text>)
                        }
                    </Stack>
                    <MatchButton date={date} data={data} players={players} setPlayers={setPlayers} userData={userData} matchId={matchId}/>
                </Flex>
            </Box>
        </>
    )
}

export default Match