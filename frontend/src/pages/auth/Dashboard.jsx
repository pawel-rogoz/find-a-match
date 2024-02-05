function Dashboard ({ userData, setUserData }) {

    const logout = async (event) => {
        event.preventDefault()

        try {
            localStorage.removeItem("token")
            setUserData({name: null, id: null})
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Welcome {userData.name}</h2>
            <button onClick={event => logout(event)} className="btn btn-primary">Logout</button>
        </>
    )
}

export default Dashboard