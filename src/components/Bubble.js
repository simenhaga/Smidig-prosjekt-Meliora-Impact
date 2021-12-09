import { useState } from "react";

const Bubble = ({title, onToggle}) => {
    const [selected, setSelected] = useState(false)

    const toggleSize = () => {
        
    }
    return (
        <div className={'bubble'} onClick={() => toggleSize}>
            <label>{title}</label>
        </div>
    )
}

export default Bubble
