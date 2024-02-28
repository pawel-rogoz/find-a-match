import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Input, Stack, Text, Button, HStack, GridItem, Grid, ButtonGroup, Box, Flex, Toast, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"

function GenerateCodeDrawer({ isOpen, onClose, btnRef, matchId}) {
    const toast = useToast()

    const [display, setDisplay] = useState('none')
    const [isChosen, setIsChosen] = useState(false)
    const [code, setCode] = useState()
    const [isDisabled, setIsDisabled] = useState(false)

    const handleClick = (event) => {
        const id = event.target.id
        console.log(event.target.id)

        setIsChosen(true)

        if ( id === 'yes' ) {
            setDisplay('flex')
        } else if ( id === 'no' ) {
            setDisplay('none')
        } else if ( id === 'generate') {
            generateMatchCode()
        }
        
    }

    const generateMatchCode = () => {
        let randomNumberString = ''
        for (let i = 0; i < 6; i++) {
            const randomNumber = Math.floor(Math.random() * 10)
            randomNumberString += randomNumber.toString()
        }
        axios({
            method: "PUT",
            url: `http://localhost:3001/api/matches/${matchId}`,
            headers: {token : localStorage.token},
            data: { match_code: randomNumberString }
        })
        .then(response => {
            setCode(randomNumberString)
            setIsDisabled(true)
        })
        .catch(error => {
            console.error(error)
            toast({title: 'There was an error trying to generate the code', description: "Try again", status: 'error', duration: 3000})
        })
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Generate the code</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={5}>
                        <Text>Did the match took place?</Text>
                        <ButtonGroup>
                            <Button id='yes' onClick={handleClick} colorScheme={isChosen ? 'gray' : 'green'}>YES</Button>
                            <Button id='no' onClick={handleClick} colorScheme={isChosen ? 'gray' : 'red'}>NO</Button>
                        </ButtonGroup>
                        <Flex h='2rem'>
                            <Text fontSize='2xl' as='b'>{code}</Text>
                        </Flex>
                        <Box display={display}>
                            <Button id='generate' onClick={handleClick} isDisabled={isDisabled} colorScheme='teal'>Generate the code</Button>
                        </Box>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default GenerateCodeDrawer