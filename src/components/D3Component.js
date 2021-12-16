import * as d3 from 'd3';

class D3Component {

    containerEl;
    props;
    svg;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;
        const { width, height } = props;
        this.svg = d3.select(containerEl)
            .append('svg')
            .style('background-color', 'white')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${height/2},${width/2})`) //Sets the position of the g-tag

        this.circlesPadding = 4 //The amount of minimum spacing between the circles
        this.circlesScaleFactor = 6 //Used for setting the scale of the circles
        this.forceStrength = 0.05

        this.configureGradient(this.svg)
        this.updateData()
    }

    //Helper for configuring the gradient
    configureGradient = (svg) => {
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

    updateData = () => {
        const minRadius = 10 * this.circlesScaleFactor
        const radiusScale = d3.scaleLinear().domain([0,2]).range([minRadius, minRadius*3])

        //Function that applies the forces to the elements
        this.centerSimulation = d3.forceSimulation()
            .force('x', d3.forceX().strength(this.forceStrength))
            .force('y', d3.forceY().strength(this.forceStrength))
            .force('collide', d3.forceCollide( (d) => radiusScale(d.selectionType) + this.circlesPadding ))

        this.radialSimulation = d3.forceSimulation()
            .force("charge", d3.forceCollide().radius(5))
            .force("r", d3.forceRadial((d) => { return 300 }))
            .force('collide', d3.forceCollide( (d) => radiusScale(d.selectionType) + this.circlesPadding ))
        /*
		Function for setting the radius of the drawn circles to match selection type. scaleLinear()
		means that a bubble clicked once is exactly 2x the size of the smallest bubble. scaleSqrt()
		would make it >2x the size
		*/

        const { svg, props: { tagsData, width, height, setSelected } } = this;

        this.configureGradient(svg)
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

        if(false){
            this.radialSimulation.nodes(tagsData).on('tick', ticked)
        } else {
            this.centerSimulation.nodes(tagsData).on('tick', ticked)
        }
    }

    setActiveDatapoint = (d, node) => {
        d3.select(node).style('fill', 'yellow');
        this.props.onDatapointClick(d);
    }

    resize = (width, height) => {
        const { svg } = this;
        svg.attr('width', width)
            .attr('height', height);
        svg.selectAll('circle')
            .attr('cx', () => Math.random() * width)
            .attr('cy', () => Math.random() * height);
    }
}

export default D3Component;