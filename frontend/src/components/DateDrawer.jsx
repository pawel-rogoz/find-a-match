import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Input, Stack, Text, Button } from "@chakra-ui/react"
import { useState } from "react"

function DateDrawer({ isOpen, onClose, btnRef, dateMin, setDateMin, dateMax, setDateMax, setIsFirstRender }) {
    const [fromDate, setFromDate] = useState(dateMin)
    const [toDate, setToDate] = useState(dateMax)

    const handleChange = (event) => {
        console.log('ID', event.target.id)
        console.log('Value', event.target.value)

        const date = new Date(event.target.value)

        if (event.target.id === 'from') {
            date.setHours(0,0,0,0)
            console.log('From:', date)
            setFromDate(date)
        } else if (event.target.id === 'to') {
            date.setHours(23,59,59,999)
            console.log('To:', date)
            setToDate(date)
        }
    }

    const handleSubmit = () => {
        if (fromDate && toDate && toDate > fromDate) {
            setDateMin(fromDate)
            setDateMax(toDate)
            setIsFirstRender(false)
            onClose()
        } else {
            console.error('Bad data')
        }
    }

    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
    
        return `${year}-${month}-${day}`
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
                    <DrawerHeader>Specify the date</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={3}>
                            <Text m={0}>From:</Text>
                            <Input id="from" type="date" onChange={handleChange} value={formatDateToYYYYMMDD(fromDate)}/>
                            <Text m={0}>To:</Text>
                            <Input id="to" type="date" onChange={handleChange} value={formatDateToYYYYMMDD(toDate)}/>
                            <Button mt={5} onClick={handleSubmit} colorScheme='teal'>Submit</Button>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DateDrawer