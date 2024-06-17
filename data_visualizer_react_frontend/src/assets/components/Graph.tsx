import React, { useRef, useEffect, useState } from "react";
import { GraphDimensions } from "../../clientModels/GraphDimensions.model";
import { AxisDomain } from "../../clientModels/Axis.model";
import { Graph } from "../../clientModels/Graph.model";
import Axis from "./GraphAxis";
import * as d3 from "d3";

interface GraphProps {
  graphDimensions: GraphDimensions;
  defaultDomain: { x: AxisDomain; y: AxisDomain };
}

const GraphComponent: React.FC<GraphProps> = ({ graphDimensions, defaultDomain }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [graph, setGraph] = useState<Graph | null>(null);

  // State for x and y domains
  const [xDomain, setXDomain] = useState<AxisDomain>(defaultDomain.x);
  const [yDomain, setYDomain] = useState<AxisDomain>(defaultDomain.y);

  // State for x and y scales, initially null
  const [xScale, setXScale] = useState<d3.ScaleLinear<number, number> | null>(null);
  const [yScale, setYScale] = useState<d3.ScaleLinear<number, number> | null>(null);

  // State to hold the current transform
  const [currentTransform, setCurrentTransform] = useState(d3.zoomIdentity);

  // State to control zoom and pan
  const [isZoomEnabled, setIsZoomEnabled] = useState(true);

  useEffect(() => {
    if (svgRef.current) {
      const newGraph = new Graph(svgRef.current, graphDimensions, defaultDomain);
      newGraph.renderGraphSVG();
      setGraph(newGraph);

      // Initialize scales using domains from state
      setXScale(newGraph.getXScale(xDomain));
      setYScale(newGraph.getYScale(yDomain));
    }
  }, [graphDimensions, defaultDomain, xDomain, yDomain]);

  useEffect(() => {
    if (svgRef.current && graph) {
      const svg = d3.select(svgRef.current);

      // Handle zoom event to update scales and transform
      const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        const transform = event.transform;

        // Ensure panning is handled incrementally
        setCurrentTransform(transform);

        const newXScale = transform.rescaleX(graph.getXScale(xDomain));
        const newYScale = transform.rescaleY(graph.getYScale(yDomain));

        setXScale(() => newXScale);
        setYScale(() => newYScale);
      };

      // Define zoom behavior using the Graph class method
      const zoom = graph.createZoomBehavior(handleZoom)
        .filter(event => {
          // Enable panning on mouse drag and zooming on scroll
          return isZoomEnabled && (event.type === 'wheel' || event.type === 'mousedown' || event.type === 'mousemove' || event.type === 'touchmove');
        });

      // Apply or remove zoom behavior based on isZoomEnabled state
      if (isZoomEnabled) {
        svg.call(zoom);
        svg.call(zoom.transform, currentTransform); // Apply the current transform to maintain state
      } else {
        svg.on(".zoom", null); // Disable zoom behavior
      }
    }
  }, [graph, xDomain, yDomain, currentTransform, isZoomEnabled]);

  const toggleZoom = () => {
    setIsZoomEnabled(!isZoomEnabled);
  };

  return (
    <div>
      <button onClick={toggleZoom}>
        {isZoomEnabled ? "Disable Zoom and Pan" : "Enable Zoom and Pan"}
      </button>
      <svg ref={svgRef} className="graph-container-svg">
        {xScale && graph && (
          <Axis
            scale={xScale}
            axisType="x"
            transform={`translate(${graph.graphDimensions.margin.left},${graph.graphDimensions.innerHeight + graph.graphDimensions.margin.top})`}
          />
        )}
        {yScale && graph && (
          <Axis
            scale={yScale}
            axisType="y"
            transform={`translate(${graph.graphDimensions.margin.left},${graph.graphDimensions.margin.top})`}
          />
        )}
      </svg>
    </div>
  );
};

export default GraphComponent;
