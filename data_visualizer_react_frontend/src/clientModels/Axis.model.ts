import * as d3 from "d3";

export type AxisType = 'x' | 'y';
export type AxisDomain = [number, number];

export class Axis {
    axisType: AxisType;
    axisScale: d3.ScaleLinear<number, number>;
    axisGRef: SVGGElement | null = null;

    constructor(axisType: AxisType, axisScale: d3.ScaleLinear<number, number>) {
        this.axisType = axisType;
        this.axisScale = axisScale;
    }

    render() {
        if (!this.axisGRef) return;
        const axis = this.axisType === 'x' ? d3.axisBottom(this.axisScale) : d3.axisLeft(this.axisScale);
        d3.select(this.axisGRef).call(axis);
    }

    setAxisGRef(axisGRef: SVGGElement) {
        this.axisGRef = axisGRef;
        this.render();
    }
}
