import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import data from './Meliora-categories.csv'

const BubbleChart = () => {
	const d3Chart = useRef() //Reference to the HTML object returned in this component
	useEffect(() => {

		//Dimensions for the chart container
		const height = 500;
		const width = 500;
		const svg = d3.select(d3Chart.current)
			.attr('height', height)
			.attr('width', width)
			.attr('style', `background-color: grey`)
			.append('g')
			.attr('transform', `translate(${height/2},${width/2})`)

		d3.csv(data).then((data) => {
			ready(data)
			console.log(data)
			}).catch((error) => {console.log('Failed to load data')})

		var simulation = d3.forceSimulation()

		const ready = (data) => {
			var circles = svg.selectAll(".category")
				.data(data)
				.enter().append('circle')
				.attr('class', 'category')
				.attr('r', 10)
				.attr('fill', 'lightblue')
			/*simulation.data
				.on('tick', ticked)
			const ticked = () => {
				circles
					.attr("cx", function (d){
						return d.x
					})
					.attr("cy", function (d){
						return d.y
					})
			}*/

		}


	})

    return (
        <div id='wrapper'>
			<svg ref={d3Chart}/>
    	</div>
    )
}

export default BubbleChart
