import React, { WheelEvent, RefObject } from 'react'
import {
  ITool,
  ICoordinate,
  Tool,
} from 'core/tools/Tool';
import {
  Tools,
  Rectangle,
  Ellipse,
  Pencil
} from 'core/tools';
import { drawGrid } from 'core/helpers/grid.helper';
import { getWidth, getHeight } from 'core/helpers/window.helper';

import './WhiteBoard.scss';

export interface WhiteBoardProps {
  color: string;
  fillColor: string;
  height: number;
  size: number;
  tool: string;
  width: number;
  margins: number;
}

export interface WhiteBoardState {
  position: "absolute";
  windowHeight: number;
  windowWidth: number;
  top: number;
  left: number;
}

export class WhiteBoard extends React.Component<WhiteBoardProps, WhiteBoardState> {

  canvasRef: RefObject<HTMLCanvasElement> | undefined;
  context: CanvasRenderingContext2D | null | undefined;
  tool: ITool | undefined;

  private initTool(tool: string) {
    this.tool = this.selectTool(tool, this.context!);
  }

  private initCanvas() {
    if (this.context) {
      drawGrid(this.context, { height: this.props.height, width: this.props.width, margins: this.props.margins });
    }
  }

  constructor(props: WhiteBoardProps) {
    super(props);

    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.state = this.calcluateState();
  }

  componentDidMount() {
    this.context = this.canvasRef?.current?.getContext('2d');
    this.initCanvas();
    this.initTool(this.props.tool);
  }

  componentDidUpdate() {
    if (!this.context || Object.entries(this.context).length === 0) {
      this.context = this.canvasRef?.current?.getContext('2d');
    }
    this.initTool(this.props.tool);
  }

  // Events
  onMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.tool) {
      const {x, y} = this.getCursorPosition(event);
      const { color, size, fillColor } = this.props;
      const data = this.tool.onMouseDown(x, y, color, size, fillColor);
    }
  }

  onMouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const {x, y} = this.getCursorPosition(event);
    const data = this.tool?.onMouseUp(x, y);
  }

  onMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const {x, y} = this.getCursorPosition(event);
    const data = this.tool?.onMouseMove(x, y);
  }

  handleScroll = (event: WheelEvent<HTMLDivElement>) => {
    this.setState(this.updatePosition(this.state, event.deltaX, event.deltaY, {x: this.props.width, y: this.props.height}));
  }

  // Helper Functions
  getCursorPosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): ICoordinate => {
    const { top = 0, left = 0 } = this.canvasRef?.current?.getBoundingClientRect() || {};
    return {
      x: event.clientX - left,
      y: event.clientY - top,
    };
  }

  selectTool = (tool: string, context: CanvasRenderingContext2D): Tool => {
    switch (tool) {
      case Tools.RECTANGLE:
        return new Rectangle(context);
      case Tools.ELLIPSE:
        return new Ellipse(context);
      default:
        return new Pencil(context);
    }
  }

  calcluateState = () => {
    const position: "absolute" = "absolute";
    const windowHeight = getHeight();
    const windowWidth = getWidth();
    return {
      position,
      windowHeight,
      windowWidth,
      top: 100,
      left: 240
    };
  }

  updatePosition = (state: WhiteBoardState, deltaX: number, deltaY: number, boardDimensions: ICoordinate) => {
    const shiftX = (state.left - deltaX);
    const shiftY = (state.top - deltaY);
    const [lowerXBound, upperXBound] = [(-1 * (100 + (boardDimensions.x - getWidth()))), 300];
    const [lowerYBound, upperYBound] = [(-1 * (100 + (boardDimensions.y - getHeight()))), 300];
  
    const left = (boardDimensions.x > getWidth()) && (shiftX > lowerXBound && shiftX < upperXBound) ? shiftX : state.left;
    const top = (boardDimensions.y > getHeight()) && (shiftY > lowerYBound && shiftY < upperYBound) ? shiftY : state.top;
  
    return {
      ...state,
      left,
      top,
    };
  }

  render() {
    const {width, height} = this.props;
    const { position, left, top } = this.state;

    return (
      <div className="WhiteBoard-viewport" onWheel={this.handleScroll}>
        <div style={{position, left, top}}>
          <canvas
            ref={this.canvasRef}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            onMouseOut={this.onMouseUp}
            width={width}
            height={height}
          />
        </div>
      </div>
    );
  }

}