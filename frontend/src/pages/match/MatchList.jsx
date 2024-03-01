import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Box, Text, Button, Stack, useDisclosure, Flex } from "@chakra-ui/react"
import DateDrawer from "../../components/DateDrawer/DateDrawer"
import Match from "../../components/Match"
import { useSearchParams } from "react-router-dom"

function MatchList () {
    const current_date = new Date()
    const midnight_date = new Date()
    midnight_date.setHours(23,59,59,0)

    console.log('MIDNIGHT', midnight_date)

    const [searchParams, setSearchParams] = useSearchParams()
    const [matches, setMatches] = useState([])
    const [dateMin, setDateMin] = useState(searchParams.get("date_min") ? new Date(searchParams.get("date_min")) : current_date)
    const [dateMax, setDateMax] = useState(searchParams.get("date_max") ? new Date(searchParams.get("date_max")) : midnight_date)
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
            setSearchParams({ date_min: dateMin, date_max: dateMax})
            setMatches(response)
        })
    }, [dateMin, dateMax])

    return (
        <Box mx={5}>
            <Stack spacing={5}>
                <Text fontSize='3xl' as='b' mx='auto'>
                    Match List
                </Text>
                <Button colorScheme='teal' ref={btnRef} onClick={onOpen} w='90vw' maxW={500} mx='auto'>Specify the date</Button>
                { dateMin.toDateString() === dateMax.toDateString() ? (
                    isFirstRender ?
                    (
                        <Text fontSize='xl' as='b' mx='auto'>Upcoming matches today</Text>
                    )
                    :
                    (
                        <Text fontSize='xl' as='b' mx='auto'>Matches on {dateMin.toLocaleDateString()}</Text>
                    )
                    
                ) : (
                    <Text fontSize='xl' as='b' mx='auto'>Matches between {dateMin.toLocaleDateString()} and {dateMax.toLocaleDateString()}</Text>
                )
                }
                { matches.length > 0 ? (
                    <Flex wrap="wrap" justifyContent='center'>
                        {matches.map(match => <Match key={match.match_id} match={match} width={'35vw'} showDate={true}/>)}
                    </Flex>
                ) : (
                    <Text mx='auto'>There {dateMax.toDateString() < current_date.toDateString() ? 'was' : 'is'} no match in this date</Text>
                )
                }
                <DateDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} dateMin={dateMin} setDateMin={setDateMin} dateMax={dateMax} setDateMax={setDateMax} setIsFirstRender={setIsFirstRender} />
            </Stack>
        </Box>
    )
}

export default MatchList