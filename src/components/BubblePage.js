import React from 'react'
import Bubbles from './Bubbles'
import { useState } from 'react'


const OldBubblePage = () => {
    const toggleSelected = (id) => {
		setTags(tags.map((tag) =>
			tag.id === id ? {...tag, selectionType:
			tag.selectionType === 2 ? 0 : ++tag.selectionType} : tag
		))
    }
    
    const [tags, setTags] = useState([
		{
		  id: 1,
		  title: "Women's Rights",
		  selectionType: 0
		},
		{
		  id: 2,
		  title: 'Education',
		  selectionType: 0
		},
		{
		  id: 3,
		  title: 'Clean Water',
		  selectionType: 0
		},
		{
		  id: 4,
		  title: 'Human Rights',
		  selectionType: 0
		}
	])
	
    
	return (
		<section className="section bubble-container">
		<Bubbles className="" tags={tags} toggleSelected={toggleSelected}/>
	  </section>
	);
}

export default OldBubblePage;