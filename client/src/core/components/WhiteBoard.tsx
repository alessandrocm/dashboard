import React, { RefObject } from 'react'
import { ITool, Tool, ICoordinate } from './tools/Tool';
import { Pencil } from './tools/Pencil';
import { Tools } from './tools/enum';
import { Rectangle } from './tools/Rectangle';
import { Ellipse } from './tools/Ellipse';

const toolBox = (tool: string, context: CanvasRenderingContext2D): Tool => {
  switch (tool) {
    case Tools.RECTANGLE:
      return new Rectangle(context);
    case Tools.ELLIPSE:
      return new Ellipse(context);
    default:
      return new Pencil(context);
  }
}

export interface WhiteBoardProps {
  color: string;
  fillColor: string;
  height: number;
  size: number;
  tool: string;
  width: number;
}

export class WhiteBoard extends React.Component<WhiteBoardProps> {

  canvasRef: RefObject<HTMLCanvasElement> | undefined;
  context: CanvasRenderingContext2D | null | undefined;
  tool: ITool | undefined;

  private initTool(tool: string) {
    if (this.context) {
      this.tool = toolBox(tool, this.context);
    }
  }

  constructor(props: WhiteBoardProps) {
    super(props);

    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  componentDidMount() {
    this.context = this.canvasRef?.current?.getContext('2d');
    this.initTool(this.props.tool)
  }

  componentWillReceiveProps() {
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

  // Helper Functions
  getCursorPosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): ICoordinate => {
    const { top = 0, left = 0 } = this.canvasRef?.current?.getBoundingClientRect() || {};
    return {
      x: event.clientX - left,
      y: event.clientY - top,
    };
  }

  render() {
    const {width, height} = this.props;

    return (
      <canvas
        ref={this.canvasRef}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseUp}
        width={width}
        height={height}
      />
    );
  }

}