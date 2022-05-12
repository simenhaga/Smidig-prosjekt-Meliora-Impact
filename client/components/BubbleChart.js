import React, { useEffect, useRef, useState } from "react";
import "../css/BubbleChart.css";
import D3Component from "./D3Component";

let vis;

const BubbleChart = ({ tagsData, setSelected }) => {
  const d3Bubbles = useRef(); //Reference to the svg element returned in this component

  const [height, setHeight] = useState(900);
  const [width, setWidth] = useState(900);

  const updateVisOnResize = () => {
    vis && vis.resize(width, height);
  };

  const handleResizeEvent = () => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  const initVis = () => {
    if (tagsData && tagsData.length) {
      const d3Props = {
        tagsData,
        width,
        height,
        setSelected,
      };
      vis = new D3Component(d3Bubbles.current, d3Props);
    }
  };
  const updateBubbles = () => {
    vis.updateBubbleSize();
  };

  useEffect(handleResizeEvent, []);
  useEffect(updateVisOnResize, [width, height]);
  useEffect(initVis, []);
  useEffect(updateBubbles, [tagsData]);

  return (
    <div id="bubble-container">
      <div ref={d3Bubbles} />
    </div>
  );
};

export default BubbleChart;
