import * as d3 from "d3";
import { GraphDimensions } from "../clientModels/GraphDimensions.model";
import { AxisDomain } from "../clientModels/Axis.model";

export class Graph {
    svgRef: SVGSVGElement;
    graphDimensions: GraphDimensions;
    defaultDomain: { x: AxisDomain; y: AxisDomain };

    constructor(
        svgRef: SVGSVGElement,
        graphDimensions: GraphDimensions,
        defaultDomain: { x: AxisDomain; y: AxisDomain }
    ) {
        this.svgRef = svgRef;
        this.graphDimensions = graphDimensions;
        this.defaultDomain = defaultDomain;
    }

    // Method to return the xScale with an optional domain parameter
    getXScale(domain: AxisDomain = this.defaultDomain.x) {
        return d3.scaleLinear()
            .domain(domain)
            .range(this.graphDimensions.getXRange());
    }

    // Method to return the yScale with an optional domain parameter
    getYScale(domain: AxisDomain = this.defaultDomain.y) {
        return d3.scaleLinear()
            .domain(domain)
            .range(this.graphDimensions.getYRange());
    }

    // Method to render the SVG element
    renderGraphSVG() {
        d3.select(this.svgRef)
            .attr("width", this.graphDimensions.width)
            .attr("height", this.graphDimensions.height);
    }

    // Method to create zoom behavior
    createZoomBehavior(handleZoom: (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => void) {
        return d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 20])
            .on("zoom", handleZoom);
    }
}
