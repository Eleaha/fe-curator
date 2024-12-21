import { Dispatch, SetStateAction } from "react"

interface EditButtonProps {
    editing: boolean,
    setEditing: Dispatch<SetStateAction<boolean>>
}

export const EditButton = ({editing, setEditing} : EditButtonProps) => {

    const handleClick = () => {
        setEditing(!editing)
    }

    return <button onClick={handleClick}>✏</button>
}