import { Box, Flex } from "@chakra-ui/react"
import Navbar from "../components/Navbar"

function PageLayout({ userData, children }) {
    return (
        <Flex direction="column">
            <Box>
                <Navbar userData={userData} />
            </Box>
            <Box>
                {children}
            </Box>
        </Flex>
    )
}

export default PageLayout