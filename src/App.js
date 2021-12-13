import 'bulma/css/bulma.min.css'
import React from 'react'
import { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sandbox from "./components/Sandbox" //This element HAS to be created locally on your machine to avoid merge conflicts
import Bubbles from "./components/Bubbles"

const OldBubblePage = ({tags, toggleSelected}) => {
	return (
		<section className="section bubble-container">
		<Bubbles className="" tags={tags} toggleSelected={toggleSelected}/>
	  </section>
	);
};

const App = () => {
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
	const toggleSelected = (id) => {
		setTags(tags.map((tag) =>
			tag.id === id ? {...tag, selectionType:
			tag.selectionType === 2 ? 0 : ++tag.selectionType} : tag
		))
	}
	
	return (

		<div className={"App"}>
			<Router>
				<Routes>
					< Route exact path="/" element={<Sandbox/>}/>

					< Route exact path="/bubbles" element={<OldBubblePage tags={tags} toggleSelected={toggleSelected}/>}/>
					< Route element={<Sandbox/>}/>
				</Routes>
			</Router>
		</div>
  	);
}

export default App;
