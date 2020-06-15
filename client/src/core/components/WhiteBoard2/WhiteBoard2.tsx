import React, { WheelEvent } from 'react';
import { fabric } from 'fabric';
import { gridPattern } from 'core/helpers/grid.helper';
import { ICoordinate } from 'core/tools/Tool';
import { getWidth, getHeight } from 'core/helpers/window.helper';

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
    position: "fixed";
    windowHeight: number;
    windowWidth: number;
    top: number;
    left: number;
}

export class WhiteBoard2 extends React.Component<WhiteBoard2Props, WhiteBoard2State> {

    private canvas?: fabric.Canvas;

    constructor(props: WhiteBoard2Props) {
        super(props);
        this.state = this.calculateState();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas-whiteboard');
        this.canvas.backgroundColor = '#eee';
        gridPattern(this.canvas);
    }

    componentDidUpdate(prevProps: WhiteBoard2Props) {
        const { scale, height, width } = this.props;
        this.canvas?.setZoom(scale);
        if (height !== prevProps.height || width !== prevProps.width) {
            this.canvas?.setWidth(width);
            this.canvas?.setHeight(width);
            this.canvas?.calcOffset();
        }
    }

    calculateState() {
        this.canvas?.setZoom(0);

        const position: "fixed" = "fixed";
        const windowHeight = getHeight();
        const windowWidth = getWidth();
        return {
            position,
            windowHeight,
            windowWidth,
            top: 0,
            left: 0
        };
    }

    updatePosition(state: WhiteBoard2State, deltaX: number, deltaY: number, scale: number, boardDimensions: ICoordinate) {
        const boardX = (boardDimensions.x * scale);
        const boardY = (boardDimensions.y * scale);
        // If shift values are larger than board width or height, revert back to previous values
        // If previous values are larger than board (due to zooming), revert to board height or width
        const left = (Math.abs(state.left + deltaX) < boardX) ? state.left + deltaX : (Math.abs(state.left) < boardX) ? state.left : (boardX - 10);
        const top = (Math.abs(state.top + deltaY) < boardY) ? state.top + deltaY: (Math.abs(state.top) < boardY) ? state.top : (boardY - 10);

        return {
            ...state,
            left,
            top,
        };
    }

    handleScroll = (event: WheelEvent<HTMLDivElement>) => {
        const newState = this.updatePosition(this.state, event.deltaX, event.deltaY, this.props.scale, {x: this.props.width, y: this.props.height});
        this.setState(newState);
        this.canvas?.absolutePan(new fabric.Point(newState.left, newState.top));
    }

    render() {
        const {width, height} = this.props;

        return (
            <div className="WhiteBoard-viewport" onWheel={this.handleScroll}>
                <canvas
                    id="canvas-whiteboard"
                    width={width}
                    height={height}
                />
            </div>
        )
    }
}
