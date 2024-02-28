import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Box, Text, Button, Stack, useDisclosure, Flex } from "@chakra-ui/react"
import DateDrawer from "../../components/DateDrawer"
import Match from "../../components/Match"

function MatchList () {
    const current_date = new Date()
    const midnight_date = new Date()
    midnight_date.setHours(23,59,59,999)

    console.log('Current', current_date)
    console.log('Midnight', midnight_date)

    const [matches, setMatches] = useState([])
    const [dateMin, setDateMin] = useState(current_date)
    const [dateMax, setDateMax] = useState(midnight_date)
    const [isFirstRender, setIsFirstRender] = useState(true)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/api/matchesBetweenDates`,
            params: { min_date: dateMin, max_date: dateMax}
        })
        .then(response => response.data)
        .then(response => {
            setMatches(response)
        })
    }, [dateMin, dateMax])

    return (
        <Box mx={5}>
            <Stack spacing={5}>
                <Text fontSize='3xl' as='b'>
                    Match List
                </Text>
                <Button colorScheme='teal' ref={btnRef} onClick={onOpen}>Specify the date</Button>
                { dateMin.toDateString() === dateMax.toDateString() ? (
                    isFirstRender ?
                    (
                        <Text fontSize='xl' as='b'>Upcoming matches today</Text>
                    )
                    :
                    (
                        <Text fontSize='xl' as='b'>Matches on {dateMin.toLocaleDateString()}</Text>
                    )
                    
                ) : (
                    <Text fontSize='xl' as='b'>Matches between {dateMin.toLocaleDateString()} and {dateMax.toLocaleDateString()}</Text>
                )
                }
                { matches.length > 0 ? (
                    <Flex wrap="wrap" justifyContent='center'>
                        {matches.map(match => <Match key={match.match_id} match={match} width={'35vw'}/>)}
                    </Flex>
                ) : (
                    <Text>There {dateMax.toDateString() < current_date.toDateString() ? 'was' : 'is'} no match then</Text>
                )
                }
                <DateDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} setDateMin={setDateMin} setDateMax={setDateMax} setIsFirstRender={setIsFirstRender}/>
            </Stack>
        </Box>
    )
}

export default MatchList