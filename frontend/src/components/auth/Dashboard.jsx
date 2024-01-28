import { useState, useEffect } from "react"

function Dashboard ({ setAuth }) {
    const [name, setName] = useState("")

    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:3001/dashboard/", {
                method: "POST",
                headers: {token : localStorage.token}
            })

            const parseData = await response.json()
            setName(parseData.user_name)
        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = async (event) => {
        event.preventDefault()

        try {
            localStorage.removeItem("token")
            setAuth(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Welcome {name}</h2>
            <button onClick={event => logout(event)} className="btn btn-primary">Logout</button>
        </>
    )
}

export default Dashboard