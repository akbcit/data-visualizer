import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface AxisProps {
    scale: d3.ScaleLinear<number, number>;
    axisType: 'x' | 'y';
    transform?: string;
}

const Axis: React.FC<AxisProps> = ({ scale, axisType, transform }) => {
    const axisRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        if (axisRef.current) {
            const axis = axisType === 'x' ? d3.axisBottom(scale) : d3.axisLeft(scale);
            d3.select(axisRef.current).call(axis);
        }
    }, [scale, axisType]);

    return <g ref={axisRef} transform={transform} />;
};

export default Axis;
