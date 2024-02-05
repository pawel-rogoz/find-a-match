import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Login ({ setUserData }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    
    const [isUnsuccesfull, setIsUnsuccesfull] = useState(null)

    const { email, password } = data

    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/auth/login',
            data: { email, password }
        })
        .then(response => response.data)
        .then(response => {
            if (response.token) {
                localStorage.setItem("token", response.token)
                console.log(setUserData)
                setUserData({name: response.name, id: response.id})
            } else {
                // setAuth(false)
                setIsUnsuccesfull(true)
            }
        })
        .catch(error => {
            console.error(error)
            setIsUnsuccesfull(true)
        })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={data.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={data.password}
                    onChange={handleChange}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">Don't have an account? Register</Link>
            {isUnsuccesfull ? (
                <p>Wrong credentials, try again</p>
            ) : (
                null
            )
            }
        </>
    )
}

export default Login