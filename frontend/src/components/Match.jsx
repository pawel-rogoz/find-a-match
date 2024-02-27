import { Card, CardHeader, Stack, Text, Heading, CardBody, Link as ChakraLink, Flex } from "@chakra-ui/react"
import { IoIosTime } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { Link as ReactRouterLink} from "react-router-dom"

function Match({ match }) {
    const date = new Date(match.match_date)

    const options = { hour: '2-digit', minute: '2-digit' }
    const locale = date.toLocaleTimeString('pl-PL', options)

    return (
        <ChakraLink as={ReactRouterLink} to={`matches/${match.match_id}`}>
            <Card w="25vw" maxW={300} mx="5vw" h="30vh" minH={150} maxH={200}>
                <CardHeader h="30%">
                    <Flex justifyContent={['flex-start', 'flex-start', 'center']}>
                        <Heading size='l' noOfLines={1}>{match.match_name}</Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack spacing={3}>
                        <Flex justifyContent={['flex-start', 'flex-start', 'center']} alignItems='center'>
                            <IoIosTime />
                            <Text ml={1} as='b'>{locale}</Text>
                        </Flex>
                        <Flex justifyContent={['flex-start', 'flex-start', 'center']} alignItems='center'>
                            <FaUserFriends />
                            <Text ml={1} as='b'>3 / {match.num_players}</Text>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card>
        </ChakraLink>
    )
}

export default Match