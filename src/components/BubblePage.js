import React from 'react'
import BubbleChart from "./BubbleChart";
import { useState } from 'react'


const OldBubblePage = () => {
	const alterSelection = (tag) => {
		console.log('sType before:' + tag.selectionType)
		if(tag.selectionType === 2){
			tag.selectionType = 0;
		} else {
			++tag.selectionType
		}
		console.log('sType after:' + tag.selectionType)
	}
    const toggleSelected = (id) => {
		const actualId = id.target.__data__.id
		setTags(tags.map((tag) =>
			tag.id === actualId ? {...tag, selectionType:
			alterSelection(tag)} : tag
		))
		console.log(id.target.__data__)
		console.log("Should change selection of id: " + id.target.__data__.id)
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
		  title: 'Clean Water',
		  selectionType: 0
		},
		{
		  id: 5,
		  title: 'Clean Water',
		  selectionType: 0
		},
		{
		  id: 6,
		  title: 'Clean Water',
		  selectionType: 0
		},
		{
		  id: 7,
		  title: 'Clean Water',
		  selectionType: 0
		},
		{
		  id: 8,
		  title: 'Human Rights',
		  selectionType: 0
		}

	])
	
    
	return (
		<section className="section bubble-container">
			<BubbleChart setSelected={toggleSelected} tagsData={tags}/>
	  	</section>
	);
}

export default OldBubblePage;