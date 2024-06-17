export interface Margin{
    top: number,
    right: number,
    bottom: number,
    left: number,
}

export class GraphDimensions {
    width: number;
    height: number;
    margin: Margin;
    innerWidth: number;
    innerHeight: number;

    constructor(width: number, height: number, margin:Margin) {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    }

    // Method to update dimensions
    updateDimensions(width: number, height: number, margin:Margin): void {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    }

    // Method to get the SVG dimensions as an object
    getSvgDimensions(): { width: number; height: number } {
        return {
            width: this.width,
            height: this.height,
        };
    }

    // Method to get the inner dimensions for the chart content
    getInnerDimensions(): { width: number; height: number } {
        return {
            width: this.innerWidth,
            height: this.innerHeight,
        };
    }

    // Method to get the margin
    getMargin(): Margin {
        return this.margin;
    }

    // Method to get the x range
    getXRange(): [number, number] {
        return [0, this.innerWidth];
    }

    // Method to get the y range
    getYRange(): [number, number] {
        return [this.innerHeight, 0];  
    }
}
