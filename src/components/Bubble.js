import { useState } from "react";

const Bubble = ({title}) => {
    const [selected, setSelected] = useState(false)

    return (
        <div style={{backgroundColor: 'red', width: '100px', height: '100px', borderRadius: '100%', display: 'grid', placeItems: 'center'}}>
            <label>{title}</label>
        </div>
    )
}

export default Bubble
