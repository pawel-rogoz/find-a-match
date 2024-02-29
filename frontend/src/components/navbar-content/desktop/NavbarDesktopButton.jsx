import { Button, Link } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function NavbarDesktopButton({ path, name, changeDisplay }) {
    const navigate = useNavigate()
    return (
        // <Link>
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
        // </Link>    
    )
}

export default NavbarDesktopButton