import { Button, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import GenerateCodeDrawer from "./GenerateCodeDrawer"
import axios from "axios"
import CodeDrawer from "./CodeDrawer"
import EntryCodeDrawer from "./EntryCodeDrawer"

function MatchButton({ date, data, players, setPlayers, userData, matchId }) {
    const { name, id } = userData

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const navigate = useNavigate()

    const handleClick = (event) => {
        if (!id) {
            navigate("/login")
            return
        }
        const eventType = event.target.id
        if (eventType === 'add') {
            axios({
                method: 'post',
                url: `http://localhost:3001/api/matches/${matchId}/users`,
                headers: { token: localStorage.token } 
            })
            .catch(error => console.error(error))
            setPlayers(players.concat([{user_name: name, user_id: id}]))
        } else if (eventType === 'remove') {
            axios({
                method: 'delete',
                url: `http://localhost:3001/api/matches/${matchId}/users`,
                headers: {token: localStorage.token }
            })
            .catch(error => console.error(error))
            setPlayers(players.filter(player => player.user_id != id))
        }
    }

    return (
        <>
            {date <= data.match_date ?
                (
                    players.filter(player => player.user_id === id).length === 1 ?
                    (
                        <Button id="remove" onClick={handleClick} colorScheme="teal">Leave match</Button>
                    )
                    :
                    (
                        players.length < data.num_players ?
                        (
                            <Button id="add" onClick={handleClick} colorScheme="teal">Join match</Button>
                        )
                        :
                        (
                            <Button isDisabled={true}>Can't join</Button>
                        )
                    )
                )
                :
                (
                    players.filter(player => player.user_id === id).length === 1 ?
                    (
                        data.host_id === id ?
                        (
                            data.match_code === null ?
                            (
                                <Button id="generate" colorScheme="teal" ref={btnRef} onClick={onOpen}>Generate match code</Button>
                            )
                            :
                            (
                                <Button colorScheme='teal' ref={btnRef} onClick={onOpen}>See the match code</Button>
                            )
                        )
                        :
                        (
                            data.match_code === null ?
                            (
                                <Button isDisabled={true} colorScheme='teal'>We are waiting for host to generate the code</Button>
                            )
                            :
                            (
                                <Button colorScheme='teal' ref={btnRef} onClick={onOpen}>Entry match code</Button>
                            )
                        )
                    )
                    :
                    (
                        <Button isDisabled={true}>This match has finished</Button>
                    )
                )}
                {data.match_code ?
                (
                    id === data.host_id ?
                    (
                        <CodeDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} data={data}/>
                    )
                    :
                    (
                        <EntryCodeDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} data={data} userData={userData} matchId={matchId}/>
                    )
                )
                :
                (
                    <GenerateCodeDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} matchId={matchId}/>
                )
                }
            </>     
    )
}

export default MatchButton