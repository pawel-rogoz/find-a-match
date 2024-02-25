import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function NavbarDesktopButton({ path, name, changeDisplay }) {
    const navigate = useNavigate()
    return (
        <Button
            as="a"
            variant="ghost"
            aria-label={name}
            my={5}
            w="100%"
            onClick={() => {
                navigate(`${path}`)
                changeDisplay('none')
            }}
        >
            {name}
        </Button>        
    )
}

export default NavbarDesktopButton