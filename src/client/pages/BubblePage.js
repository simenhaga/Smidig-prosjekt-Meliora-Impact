import React from 'react'
import BubbleChart from "../components/BubbleChart";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "../Footer/Footer"
import Header from "../components/Header"


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
		<div style={{width: "100%"}}>
			<div className='section'>
				<Header/>
			</div>
			<section className="section bubble-container" style={{height: "100%"}}>
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
			<Footer/>
		</div>
	);
}

export default OldBubblePage;