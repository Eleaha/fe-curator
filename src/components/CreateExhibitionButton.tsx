import { useNavigate } from "react-router-dom"

export const CreateExhibitionButton = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/exhibitions/create')
    }

    return <button onClick={handleClick} className="big-button" id="create-exhibition-button">Create Exhibition</button>
}