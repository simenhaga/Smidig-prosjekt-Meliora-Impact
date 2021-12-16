import React from 'react'
import BubbleChart from "./BubbleChart";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'




const OldBubblePage = () => {
    const toggleSelected = (id) => {
		const actualId = id.target.__data__.id
		setTags(tags.map((tag) =>
			tag.id === actualId ? {...tag, selectionType:
			tag.selectionType === 2 ? 0 : ++tag.selectionType} : tag
		))
		console.log(actualId)
		console.log("Should change selection of id: " + id.target.__data__.id)
    }
    
    const [tags, setTags] = useState([])
	
	useEffect (() => {
		const getCategories = async ()=> {
			const categoriesFromServer = await fetchCategories()
			setTags(categoriesFromServer)
		}

		getCategories()
	}, [])

	//Fetches all categories
	const fetchCategories = async () => {
		const result = await fetch('http://localhost:5000/categories')
		const data = await result.json()

		return data
	}

	const fetchCategoryById = async (id) => {
		const result = await fetch(`http://localhost:5000/categories/${id}`)
		const data = await result.json()

		return data
	}

    
	return (
		<section className="section bubble-container">
			<Routes>
                <Route
                    path='/'
                    element={
                        <div>
                            {tags.length > 0 ? (
                                <BubbleChart
                                    tagsData = {tags}
                                    setSelected={toggleSelected}
                                />
                            ) : (
                                'No categories to show'
                            )}
                        </div>
                    }
                />
			</Routes>
	  	</section>
	);
}

export default OldBubblePage;