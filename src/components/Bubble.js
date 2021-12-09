import { useState } from "react";

const Bubble = ({tag, onToggle}) => {
    const [selected, setSelected] = useState(false)

    const toggleSize = () => {
        console.log(onToggle)
    }
    return (
        <div className={'bubble'} onClick={() =>
            toggleSize(onToggle)}>
            <label>{tag.title}</label>
        </div>
    )
}

export default Bubble
