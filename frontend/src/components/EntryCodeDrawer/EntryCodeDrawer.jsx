import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Text, Input, useToast, Button} from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"


function EntryCodeDrawer({ isOpen, onClose, btnRef, data, userData, matchId }) {
    const toast = useToast()
    const [code, setCode] = useState()

    const handleChange = (event) => {
        setCode(event.target.value)
    }

    const handleSubmit = () => {
        code === data.match_code ? (
            axios({
                method: "PUT",
                url: `http://localhost:3001/api/users/${userData.id}/matches/${matchId}`,
                headers: {token : localStorage.token},
                data: { completed: true }
            })
            .then(response => response.data)
            .then(response => {
                toast({ title: 'Code added', description: 'Match completed', duration: 2000})
            })
            .catch(error => {
                console.error(error)
                toast({ title: 'Error trying to add code', description: 'Try again', duration: 2000})
            })
        ) : (
            toast({ title: 'Wrong code', description: 'Try again', duration: 2000})
        )
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
                <DrawerContent data-testid="entry-code">
                    <DrawerCloseButton />
                    <DrawerHeader>ENTRY MATCH CODE</DrawerHeader>
                    <DrawerBody>
                        <Input type="text" placeholder="000000" onChange={handleChange} />
                        <Button onClick={handleSubmit}>SUBMIT</Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default EntryCodeDrawer