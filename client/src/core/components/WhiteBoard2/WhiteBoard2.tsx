import React from 'react';
import { fabric } from 'fabric';
import { gridPattern } from 'core/helpers/grid.helper';

export interface WhiteBoard2Props {
    color: string;
    fillColor: string;
    height: number;
    lineSize: number;
    scale: number;
    tool: string;
    width: number;
    margins: number;
}

export interface WhiteBoard2State {
    position: "absolute";
    windowHeight: number;
    windowWidth: number;
    top: number;
    left: number;
}

export class WhiteBoard2 extends React.Component<WhiteBoard2Props, WhiteBoard2State> {

    private canvas?: fabric.Canvas;

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas-whiteboard');
        gridPattern(this.canvas);
    }

    render() {
        const {width, height, scale} = this.props;

        return (
            <canvas
                id="canvas-whiteboard"
                width={width}
                height={height}
            />
        )
    }
}
