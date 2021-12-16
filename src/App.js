import 'bulma/css/bulma.min.css'
import React from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sandbox from "./components/Sandbox" //This element HAS to be created locally on your machine to avoid merge conflicts

import OldBubblePage from './pages/BubblePage';


const App = () => {
	return (
		<div className={"App"}>
			<Router>
				<Routes>
					< Route exact path="/" element={<Sandbox/>}/>

					< Route exact path="/bubbles" element={<OldBubblePage/>}/>
				</Routes>
			</Router>
		</div>
  	);
}

export default App;
