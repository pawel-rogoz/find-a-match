import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Register ({ setUserData }) {
    const [isUnsuccesfull, setIsUnsuccesfull] = useState(false)
    const [data, setData] = useState({
        "email": '',
        "password": '',
        "name": ''
    })

    const { email, password, name } = data

    const handleChange = (event) => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: 'http://localhost:3001/auth/register',
            data: {email, password, name }
        })
        .then(response => response.data)
        .then(response => {
            if (response.token) {
                localStorage.setItem("token", response.token)
                setUserData({ name: response.name, id: response.id})
            } else {
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
            <h1 className="text-center my-5">Register</h1>
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
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="form-control my-3"
                    value={data.name}
                    onChange={handleChange}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>
            {isUnsuccesfull ? (
                <p>There was an error adding Your account. Try again</p>
            ) : (
                null
            )}
        </>
    )
}

export default Register