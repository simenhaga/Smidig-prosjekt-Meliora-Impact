import React from 'react';
import Bubble from './Bubble'

const Bubbles = ({ tags, toggleSelected }) => {
    return (
        <section>
            {tags.map((tags, index) => (
                <Bubble key={index} tag={tags}
                setSelected={toggleSelected}
                />
            ))}
        </section>
    );
};

export default Bubbles;