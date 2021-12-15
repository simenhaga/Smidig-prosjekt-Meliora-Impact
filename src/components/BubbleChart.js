import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import data from './Meliora-categories.csv'
import './BubbleChart.css'

const BubbleChart = () => {
	const d3Chart = useRef() //Reference to the HTML object returned in this component
	useEffect(() => {

		//Dimensions for the chart container. Make these dynamic in the future
		const margin = {top: 50, right: 30, bottom: 30, left: 30 }
		const width = parseInt(d3.select('#bubble-container').style('width')) - margin.left - margin.right
		const height = parseInt(d3.select('#bubble-container').style('height')) - margin.top - margin.bottom
		const circlesPadding = 1 //The amount of minimum spacing between the circles
		const circlesScaleFactor = 5

		const svg = d3.select(d3Chart.current)
			.attr('height', height)
			.attr('width', width)
			.append('g')
			.attr('transform', `translate(${height/2},${width/2})`)

		const gradient = svg.append("svg:defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		// Define the gradient colors
		gradient.append("svg:stop")
			.attr("offset", "0%")
			.attr("stop-color", "#EEAECAFF")
			.attr("stop-opacity", 1);

		gradient.append("svg:stop")
			.attr("offset", "100%")
			.attr("stop-color", "#94BBE9FF")
			.attr("stop-opacity", 1);

		const simulation = d3.forceSimulation()
			.force('x', d3.forceX().strength(0.005))
			.force('y', d3.forceY().strength(0.005))
			.force('collide', d3.forceCollide( (d) => radiusScale(d.selection) + circlesPadding ))

		d3.csv(data).then((data) => {
			ready(data)
			console.log(data)
			}).catch((error) => {console.log('Failed to load data')})

		// Function for setting the radius of the drawn circles to match
		// selection type. Domain is the range of values we enter in (we have three selection states),
		// and range is the radii that we map to
		const radiusScale = d3.scaleSqrt().domain([0,2]).range([10 * circlesScaleFactor,30 * circlesScaleFactor])

		//Function that is called after data has been loaded, responsible for
		const ready = (data) => {

			//This is the function that actually draws each circle
			const circles = svg.selectAll(".category")
				.data(data)
				.enter().append('circle')
				.attr('class', 'category bubble')
				.on('click', functionForChangingSize )
				.attr('fill', 'url(#gradient)')
				.attr('r', (d) => { return radiusScale(d.selection) } )

			//This is the function that moves the bubbles for us
			const ticked = () => {
				circles
					.attr('cx', (d) => {return d.x})
					.attr('cy', (d) => {return d.y})
			}

			simulation.nodes(data).on('tick', ticked)
		}
	})

	//This function should be replaced later to something that actually changes the data
	const functionForChangingSize = (element) => {
		console.log(element.target)
		console.log(element.target.__data__)
		console.log('In the future, this method will change selection type of data...')
	}

    return (
        <div id='bubble-container'>
			<svg ref={d3Chart}/>
    	</div>
    )
}

export default BubbleChart
