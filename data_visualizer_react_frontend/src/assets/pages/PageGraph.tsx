import { GraphDimensions } from "../../clientModels/GraphDimensions.model";
import Graph from "../components/Graph";
import { AxisDomain } from "../../clientModels/Axis.model";

// Define the default domain constant
const DEFAULT_DOMAIN: { x: AxisDomain, y: AxisDomain } = { x: [-100, 100], y: [-100, 100] };

const PageVis = () => {
    const graphDimensions = new GraphDimensions(600, 600, { top: 30, left: 30, bottom: 30, right: 30 });

    return (
        <div className="page">
            <Graph graphDimensions={graphDimensions} defaultDomain={DEFAULT_DOMAIN} />
        </div>
    );
}

export default PageVis;
