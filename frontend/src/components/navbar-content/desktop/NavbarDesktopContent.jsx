import { Flex } from "@chakra-ui/react"
import NavbarDesktopButton from "./NavbarDesktopButton"

function NavbarDesktopContent({ changeDisplay, userData }) {
    return (
        <Flex
            display={['none', 'none', 'flex','flex']}
        >
            <NavbarDesktopButton path='/' name='Home' changeDisplay={changeDisplay}/>
            <NavbarDesktopButton path='/matches' name='Matches' changeDisplay={changeDisplay} />
            <NavbarDesktopButton path='/add-match' name='Add Match' changeDisplay={changeDisplay} />
            {userData.name ? (
                <NavbarDesktopButton path='/dashboard' name='Profile' changeDisplay={changeDisplay} />
            ) : (
                <NavbarDesktopButton path='/login' name='Log In' changeDisplay={changeDisplay} />
            )}
        </Flex>
  )
}

export default NavbarDesktopContent