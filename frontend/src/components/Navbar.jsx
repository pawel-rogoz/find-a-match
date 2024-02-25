import { useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NavbarDesktopContent from './navbar-content/desktop/NavbarDesktopContent';
import NavbarMobileContent from './navbar-content/mobile/NavbarMobileContent';

function Navbar({ userData }) {
    const [display, changeDisplay] = useState('none')
    return (
        <Flex height="3rem">
            <Flex
                position="fixed"
                top="1rem"
                right="1rem"
                align="center"
            >
                {/* Desktop */}
                <NavbarDesktopContent changeDisplay={changeDisplay} userData={userData} />
                {/* Mobile */}
                <IconButton
                    aria-label="Open Menu"
                    size="lg"
                    mr={2}
                    icon={<HamburgerIcon />}
                    onClick={() => changeDisplay('flex')}
                    display={['flex', 'flex', 'none', 'none']}
                />
            </Flex>

            {/* Mobile Content */}
            <NavbarMobileContent display={display} changeDisplay={changeDisplay} userData={userData} />
        </Flex>
    )
}

export default Navbar