import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Input, Stack, Text, Button, HStack, GridItem, Grid, ButtonGroup, Box, Flex, Toast, useToast, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function GenerateCodeDrawer({ isOpen, onClose, btnRef, matchId}) {
    const toast = useToast()

    const navigate = useNavigate()

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const cancelRef = useRef()

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
            onDeleteOpen()
            setDisplay('none')
        } else if ( id === 'generate') {
            generateMatchCode()
        }
        
    }

    const handleDelete = () => {
        axios({
            method: "DELETE",
            url: `http://localhost:3001/api/matches/${matchId}`,
            headers: {token: localStorage.token}
        })
        .then(response => {
            onDeleteClose()
            navigate("/")
            toast({status: "success", title: "Match deleted", description: "Match is now deleted from DB", duration: 2000})
        })
        .catch(error => {
            console.error(error)
            toast({status: "error", title: "Something went wrong", description: "We didn't manage to delete match from DB. Try again", duration: 2000})
        })
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
                <DrawerContent data-testid='generate-code'>
                    <DrawerCloseButton />
                    <DrawerHeader>Generate the code</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={5}>
                        <Text>Did the match took place?</Text>
                        <ButtonGroup>
                            <Button id='yes' onClick={handleClick} colorScheme={isChosen ? 'gray' : 'green'}>YES</Button>
                            <Button id='no' onClick={handleClick} colorScheme={isChosen ? 'gray' : 'red'}>NO</Button>
                        </ButtonGroup>
                        <Flex display={display} h='2rem'>
                            <Text data-testid='code' fontSize='2xl' as='b'>{code}</Text>
                        </Flex>
                        <Box display={display}>
                            <Button id='generate' onClick={handleClick} isDisabled={isDisabled} colorScheme='teal'>Generate the code</Button>
                        </Box>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={cancelRef}
                onClose={onDeleteClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent data-testid='alert'>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Match
                        </AlertDialogHeader>
  
                        <AlertDialogBody>
                            Are you sure You want to delete this match? You can't undo this action afterwards.
                        </AlertDialogBody>
  
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => {
                                onDeleteClose()
                                setIsChosen(false)
                            }}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default GenerateCodeDrawer