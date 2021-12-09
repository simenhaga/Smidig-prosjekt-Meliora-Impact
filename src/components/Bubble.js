import { useState } from "react";

const Bubble = ({tag, onToggle}) => {
    const [selected, setSelected] = useState(false)

    const toggleSize = () => {
        console.log(onToggle)
    }
    return (
        <div className={`bubble ${tag.selected ? 'bubble-large' : ''}`} onClick={() =>
            onToggle(tag.id)}>
            <label>{tag.title}</label>
        </div>
    )
}

export default Bubble
