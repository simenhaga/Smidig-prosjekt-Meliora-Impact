const Bubble = ({tag, setSelected}) => {
    return (
        <div className={`bubble
        ${tag.selectionType === 1 ? 'bubble-large' : ''}
        ${tag.selectionType === 2 ? 'bubble-favorite' : ''}
        `}
        onClick={() => setSelected(tag.id)}
        >
            <label>{tag.title}</label>
        </div>
    )
}

export default Bubble
