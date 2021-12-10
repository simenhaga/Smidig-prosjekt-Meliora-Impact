import React from 'react';
import Bubble from './Bubble'

const Bubbles = ({ tags, toggleSelected }) => {
    return (
        <section className={'section bubbleContainer'}>
            {tags.map((tags, index) => (
                <Bubble key={index} tag={tags}
                setSelected={toggleSelected}
                />
            ))}
        </section>
    );
};

export default Bubbles;