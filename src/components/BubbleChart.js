import React, {useEffect, useRef, useState} from 'react'
import * as d3 from 'd3'
import './BubbleChart.css'
import D3Component from "./D3Component";

let vis

const BubbleChart = ({ tagsData, setSelected }) => {
	const d3Bubbles = useRef() //Reference to the svg element returned in this component

	const [height, setHeight] = useState(600)
	const [width, setWidth] = useState(600)
	let tutorial = false;

	const updateVisOnResize = () => {
		vis && vis.resize(width, height)
	}

	const handleResizeEvent = () => {
		let resizeTimer
		const handleResize = ()	 => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				setWidth(window.innerWidth)
				setHeight(window.innerHeight)
			}, 300)
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}

	const initVis = () => {
		if(tagsData && tagsData.length){
			const d3Props = {
				tagsData,
				width,
				height,
				setSelected
			}
			vis = new D3Component(d3Bubbles.current, d3Props)
		}
	}

	useEffect(handleResizeEvent, [])
	useEffect(updateVisOnResize, [width, height])
	useEffect(initVis, [ tagsData ])

	//Hook that runs once on page load and every subsequent state change
	useEffect(() => {
		const width = parseInt(d3.select('#bubble-container').style('width'))
		const height = parseInt(d3.select('#bubble-container').style('height'))

		const circlesPadding = 4 //The amount of minimum spacing between the circles
		const circlesScaleFactor = 6 //Used for setting the scale of the circles
		const forceStrength = 0.05

		const svg = d3.select(d3Bubbles.current)
			.attr('height', height)
			.attr('width', width)
			.append('g')
			.attr('transform', `translate(${height/2},${width/2})`) //Sets the position of the g-tag

		//GRADIENT STUFF
		configureGradient(svg);

		/*
		Function for setting the radius of the drawn circles to match selection type. scaleLinear()
		means that a bubble clicked once is exactly 2x the size of the smallest bubble. scaleSqrt()
		would make it >2x the size
		*/
		const minRadius = 10 * circlesScaleFactor
		const radiusScale = d3.scaleLinear().domain([0,2]).range([minRadius, minRadius*3])

		//Function that applies the forces to the elements
		const centerSimulation = d3.forceSimulation()
			.force('x', d3.forceX().strength(forceStrength))
			.force('y', d3.forceY().strength(forceStrength))
			.force('collide', d3.forceCollide( (d) => radiusScale(d.selectionType) + circlesPadding ))

		const radialSimulation = d3.forceSimulation()
			.force("charge", d3.forceCollide().radius(5))
			.force("r", d3.forceRadial((d) => { return 300 }))
			.force('collide', d3.forceCollide( (d) => radiusScale(d.selectionType) + circlesPadding ))

		//Loading the data, and rendering the bubbles afterwards
		const ready = () => {
			//This is the function that actually draws each circle
			const g = svg.selectAll(null)
				.data(tagsData)
				.enter()
				.append('g')

			g.append("circle")
				.attr('class', 'bubble')
				.on('click', (d) => {setSelected(d)} )
				.attr('fill', 'url(#gradient)')
				.attr('r', (d) => { return radiusScale(d.selectionType) } )

			g.append("text")
				.text((d) => d.title)
				.style('text-anchor', 'middle')

			//This is the function that moves the bubbles for us
			const ticked = () => {
				//g.attr('cx', (d) => {return d.x}).attr('cy', (d) => {return d.y})
				g.attr('transform', (d) => { return `translate(${d.x},${d.y})`})
			}

			if(tutorial){
				radialSimulation.nodes(tagsData).on('tick', ticked)
			} else {
				centerSimulation.nodes(tagsData).on('tick', ticked)
			}
		}

		ready(tagsData)
	},[])

	//Helper for configuring the gradient
	const configureGradient = (svg) => {
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
	}

	return (
        <div id='bubble-container'>
			<svg ref={d3Bubbles}/>
    	</div>
    )
}

export default BubbleChart
