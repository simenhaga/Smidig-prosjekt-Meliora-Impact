import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'

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

		d3.csv('./Meliora-categories.csv')
			.then((data) => {
				console.log(data)
			}).catch((error) => {console.log('Failed to load data')})

		const ready = (datapoints) => {
			var circles = svg.selectAll(".category")
				.data(datapoints)
				.enter().append('circle')
				.attr('class', 'category')
				.attr('r', 10)
				.attr('fill', 'lightblue')
		}

	})

    return (
        <div id='wrapper'>
			<svg ref={d3Chart}></svg>
    	</div>
    )
}

export default BubbleChart
