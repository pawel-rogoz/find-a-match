import { useState } from "react"
import axios from "axios"
import { Box, Button, Flex, Heading, Input, Stack, Text, Link, useToast } from "@chakra-ui/react"

function Login ({ setUserData }) {
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    })

    const toast = useToast()
    const [isLogin, setIsLogin] = useState(true)
    
    const { email, password, name } = data

    const handleChange = (event) => {
        console.log(event.target.value)
        setData({...data, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        
        let url, axiosData

        if (isLogin) {
            url = 'http://localhost:3001/auth/login'
            axiosData = { email, password }
        } else {
            url = 'http://localhost:3001/auth/register'
            axiosData = { email, password, name}
        }

        axios({
            method: 'post',
            url: url,
            data: axiosData
        })
        .then(response => response.data)
        .then(response => {
            if (response.token) {
                localStorage.setItem("token", response.token)
                console.log(setUserData)
                toast({ title: 'Success', description: 'You\'ll be redirected to dashboard', duration: 2000, status: 'success'})
                setTimeout(() => setUserData({name: response.name, id: response.id}), 2000)
            } else {
                toast({title: 'Error', description: 'Try again', status: 'error', isClosable: true, duration: 2000})
            }
        })
        .catch(error => {
            console.error(error)
            toast({title: 'Wrong credentials', description: 'Try again', status: 'error', isClosable: true, duration: 2000})
        })
    }

    return (
        <>
            <Box mx={5}>
                <Stack spacing={3}>
                    <Heading mx='auto'>{isLogin ? 'Login' : 'Register'}</Heading>
                    <form onSubmit={handleSubmit}>
                        <Flex justifyContent='center'>
                            <Input
                                isRequired={true}
                                type="email"
                                name="email"
                                placeholder="email"
                                value={data.email}
                                onChange={handleChange}
                                bgColor='white'
                                maxW={500}
                            />
                        </Flex>
                        <Flex justifyContent='center'>
                            <Input 
                                isRequired={true}
                                type="password"
                                name="password"
                                placeholder="password"
                                value={data.password}
                                onChange={handleChange}
                                bgColor='white'
                                mt={3}
                                maxW={500}
                            />
                        </Flex>
                        {
                            isLogin ?
                            (
                                null
                            )
                            :
                            (
                                <Flex justifyContent='center'>
                                    <Input
                                        isRequired={true}
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        bgColor='white'
                                        mt={3}
                                        maxW={500}                                
                                    />
                                </Flex>
                            )
                        }
                        <Flex justifyContent='center'>
                            <Button
                                type="submit"
                                colorScheme="teal"
                                w='30vw'
                                maxW={150}
                                mt={5}
                            >
                                Submit
                            </Button>
                        </Flex>
                    </form>
                    {isLogin ?
                        (
                            <Text mx='auto' mt={3}>
                                Don't have an account?{' '}
                                <Link onClick={() => setIsLogin(false)} color='teal.400'>Register</Link>
                            </Text>
                        )
                        :
                        (
                            <Text mx='auto' mt={3}>
                                Do You have an account?{' '}
                                <Link onClick={() => setIsLogin(true)} color='teal.400'>Login</Link>
                            </Text>
                        )
                    }
                </Stack>
            </Box>
        </>
    )
}

export default Login