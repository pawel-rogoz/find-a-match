import { Card, CardHeader, Stack, Text, Heading, CardBody, Link as ChakraLink, Flex } from "@chakra-ui/react"
import { IoIosTime } from "react-icons/io";
import { FaUserFriends, FaCalendar } from "react-icons/fa";
import { Link as ReactRouterLink} from "react-router-dom"

function Match({ match, width, showDate }) {
    const date = new Date(match.match_date)

    const options = { hour: '2-digit', minute: '2-digit' }
    const locale = date.toLocaleTimeString('pl-PL', options)
    const matchDate = date.toLocaleDateString()

    return (
        <ChakraLink as={ReactRouterLink} to={`/matches/${match.match_id}`}>
            <Card w={width} maxW={300} m={5} h="30vh" minH={180} maxH={250}>
                <CardHeader h="30%">
                    <Flex justifyContent={['flex-start', 'flex-start', 'center']}>
                        <Heading size='l' noOfLines={1}>{match.match_name}</Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack spacing={2}>
                        {showDate ?
                        (
                            <Flex justifyContent={['flex-start', 'flex-start', 'center']} alignItems='center'>
                                <FaCalendar />
                                <Text ml={1} as='b'>{matchDate}</Text>
                            </Flex>
                        )
                        : (null)}
                        <Flex justifyContent={['flex-start', 'flex-start', 'center']} alignItems='center'>
                            <IoIosTime />
                            <Text ml={1} as='b'>{locale}</Text>
                        </Flex>
                        <Flex justifyContent={['flex-start', 'flex-start', 'center']} alignItems='center'>
                            <FaUserFriends />
                            <Text ml={1} as='b'>{match.curr_num_players} / {match.num_players}</Text>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card>
        </ChakraLink>
    )
}

export default Match