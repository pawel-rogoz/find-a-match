import { Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Text} from "@chakra-ui/react"


function CodeDrawer({ isOpen, onClose, btnRef, data }) {

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent data-testid="show-code">
                    <DrawerCloseButton />
                    <DrawerHeader>MATCH CODE</DrawerHeader>
                    <DrawerBody>
                        <Text fontSize='2xl' as='b'>{data.match_code}</Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default CodeDrawer