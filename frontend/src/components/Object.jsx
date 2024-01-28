import { useParams } from "react-router-dom"

function Object () {
    const { id } = useParams()

    return (
        <h1>
            Object {id}
        </h1>
    )
}

export default Object