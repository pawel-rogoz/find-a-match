import { useState } from "react"
import axios from "axios"

function Register ({ setAuth }) {
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
        .then(parseResponse => {
            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token)
                setAuth(true)
            } else {
                setAuth(false)
            }
        })
        .catch(error => console.error(error))
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
        </>
    )
}

export default Register