import React, { WheelEvent } from 'react';
import { fabric } from 'fabric';
import { gridPattern } from 'core/helpers/grid.helper';
import { IFabricTool } from 'core/tools/fabric/FabricTool';
import { Tools } from 'core/tools';
import { Marker } from 'core/tools/fabric/Marker';
import { Rectangle } from 'core/tools/fabric/Rectangle';
import { Ellipse } from 'core/tools/fabric/Ellipse';
import { Selector } from 'core/tools/fabric/Selector';

import './WhiteBoard.scss';

export interface WhiteBoardProps {
    color: string;
    fillColor: string;
    height: number;
    lineSize: number;
    scale: number;
    tool: Tools;
    width: number;
    margins: number;
    onZoom: (value: number) => void;
    onToolSelect: (tool: Tools) => void;
}

export interface WhiteBoardState {
    top: number;
    left: number;
}

export class WhiteBoard extends React.Component<WhiteBoardProps, WhiteBoardState> {

    private canvas?: fabric.Canvas;
    private tool: IFabricTool | null = null;

    constructor(props: WhiteBoardProps) {
        super(props);
        this.state = this.calculateState();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas-whiteboard');
        this.canvas.hoverCursor = 'default';
        this.canvas.backgroundColor = '#fff';
        this.canvas.centeredScaling = true;
        this.canvas.renderAll();
        gridPattern(this.canvas);
        this.selectTool(this.props.tool, this.canvas);
    }

    componentDidUpdate(prevProps: WhiteBoardProps, prevState: WhiteBoardState) {
        const { scale, height, width, tool } = this.props;
        const { top, left } = this.state;
        if (scale !== prevProps.scale) {
            this.zoomCanvas(scale);
        }
        if (height !== prevProps.height || width !== prevProps.width) {
            this.canvas?.setWidth(width);
            this.canvas?.setHeight(width);
            this.canvas?.calcOffset();
        }
        if (prevProps.tool !== tool) {
            this.selectTool(tool, this.canvas!);
        }
        if (prevState.top !== top || prevState.left !== left) {
            this.canvas?.absolutePan(new fabric.Point(left, top));
        }
    }

    // Helper Functions

    zoomCanvas(scale: number) {
        const {top = 0, left = 0} = this.canvas?.getCenter() || {};
        this.canvas?.zoomToPoint(new fabric.Point(top, left), scale);
    }

    selectTool(tool: Tools, canvas: fabric.Canvas) {

        const prevTool = this.tool?.toolType || Tools.SELECTOR;
        this.tool?.discard();
        this.tool = null;


        switch (tool) {
            case Tools.RECTANGLE:
                this.tool = new Rectangle(canvas, this.props);
                break;
            case Tools.MARKER:
                this.tool = new Marker(canvas, this.props);
                break;
            case Tools.ELLIPSE:
                this.tool = new Ellipse(canvas, this.props);
                break;
            case Tools.CROSSHAIR:
                this.centerCanvas();
                this.props.onToolSelect(prevTool);
                break;
            default:
                this.tool = new Selector(canvas, this.props);
        }

    }

    calculateState() {
        this.canvas?.setZoom(this.props.scale);
        return {
            top: 0,
            left: 0
        };
    }

    updatePosition(state: WhiteBoardState, deltaX: number, deltaY: number, scale: number, boardDimensions: {x: number, y: number}) {
        const left = state.left + deltaX;
        const top = state.top + deltaY;

        this.setState({
            ...state,
            left,
            top,
        });
    }

    centerCanvas() {
        if (this.canvas) {
            const [left, top] = [0, 0];
            this.setState({...this.state, left, top});
        }
    }

    // Event Handlers

    handleWheel = (event: WheelEvent<HTMLDivElement>) => {
        if (!event.shiftKey) {
            this.updatePosition(this.state, event.deltaX, event.deltaY, this.props.scale, {x: this.props.width, y: this.props.height});
        }

        if (event.shiftKey) {
            if (event.deltaY < 0) {
                this.props.onZoom(1);
            }
            else {
                this.props.onZoom(-1);
            }
        }
    }

    handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'c') {
            this.centerCanvas();
        }
    }

    render() {
        const {width, height} = this.props;

        return (
            <div className="WhiteBoard-viewport" tabIndex={0} onKeyPress={this.handleKeyPress} onWheel={this.handleWheel}>
                <canvas
                    id="canvas-whiteboard"
                    width={width}
                    height={height}
                />
            </div>
        )
    }
}
