import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NotFound () {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
            // navigate(-1) -> this will take to previous url
        }, 2000)
    }, [])
    return (
        <h1>Not Found</h1>
    )
}

export default NotFound