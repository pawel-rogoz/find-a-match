import { Flex, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import NavbarMobileButton from './NavbarMobileButton'

function NavbarMobileContent({ display, changeDisplay, userData }) {
    return (
        <Flex
            w='100vw'
            display={display}
            bgColor="gray.50"
            zIndex={20}
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            overflowY="auto"
            flexDir="column"
        >
            <Flex justify="flex-end">
                <IconButton
                    mt={2}
                    mr={2}
                    aria-label="Open Menu"
                    size="lg"
                    icon={
                        <CloseIcon />
                    }
                    onClick={() => changeDisplay('none')}
                />
            </Flex>

            <Flex
                flexDir="column"
                align="center"
            >
                <NavbarMobileButton path={'/'} name={'Home'} changeDisplay={changeDisplay} />

                <NavbarMobileButton path={'/matches'} name={'Matches'} changeDisplay={changeDisplay} />

                <NavbarMobileButton path={'/add-match'} name={'Add Match'} changeDisplay={changeDisplay} />
                {userData.name ? (
                    <NavbarMobileButton path={'/dashboard'} name={'Profile'} changeDisplay={changeDisplay} />
                ) : (
                    <NavbarMobileButton path={'/login'} name={'Log In'} changeDisplay={changeDisplay} />
                )}
            </Flex>
        </Flex>        
    )
}

export default NavbarMobileContent