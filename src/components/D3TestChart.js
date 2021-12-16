import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './D3TestChart.css'

//SEE https://www.youtube.com/watch?v=AhD-oziq53w for tutorial

const D3TestChart = () => {
	const d3Chart = useRef() //Reference to the HTML object returned in this component
	const parseDate = d3.timeParse('%Y-%m-%d')

	useEffect(() => {
		fetch('https://data.cityofnewyork.us/resource/tg4x-b46p.json')
			.then(response => response.json())
			.then(data => {
				//Transform data
				console.log(data);
				const permits = data.filter(event => {
					return event.eventtype === 'Shooting Permit'
				})
				console.log(permits);

				const dates = [...new Set(permits.map(each => each.enteredon.slice(0, 10)))]

				let countsByDate = []

				dates.map(time => {
					let date = time
					let count = 0
					permits.map(each=>{
						let timestamp = each.enteredon.slice(0,10)
						if(timestamp === date) {count+= 1}
					})
					const counts = {date: parseDate(date), count: count}
					countsByDate.push(counts)
				})

				const margin = {top: 50, right: 30, bottom: 30, left: 30 }
				const width = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
				const height = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom

				const svg = d3.select(d3Chart.current)
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append('g')
						.attr('transform', `translate(${margin.left}, ${margin.top})`)
				const x = d3.scaleTime()
							.domain(d3.extent(countsByDate, function(d){return d.date}))
							.range([0, width])
				svg.append('g')
					.attr('transform', `translate(0, ${height})`)
					.call(d3.axisBottom(x))

				const max = d3.max(countsByDate, function(d){return d.count})
				const y = d3.scaleLinear()
					.domain([0, max])
					.range([height, 0])
				svg.append('g')
					.call(d3.axisLeft(y))
				
				svg.append('path')
					.datum(countsByDate)
					.attr('fill', 'none')
					.attr('stroke', 'white')
					.attr('stroke-width', 3)
					.attr('d', d3.line()
						.x(function(d){return x(d.date)})
						.y(function(d){return y(d.count)}))

				svg.append('text')
					.attr('x', (width/2))
					.attr('y', (margin.top/5 - 10))
					.attr('text-anchor', 'middle')
					.attr('font-size', '16px')
					.attr('stroke', 'white')
					.text('New York City Film permits entered in 2020 - Shooting permit')
			})
  	})

	return (
    	<div id='d3demo'>
			<svg ref={d3Chart}></svg>
    	</div>
	)
}

export default D3TestChart
