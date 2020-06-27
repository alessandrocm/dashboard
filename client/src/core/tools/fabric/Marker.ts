import { FabricTool, IFabricStroke, IFabricToolOptions } from "./FabricTool";
import { fabric } from 'fabric';
import { PathEvents, IFabricEvent, ToolEvents, MouseEvents } from './FabricEvents';
import { generate } from "shortid";
import { Tools } from "../enum";

export class Marker extends FabricTool {

  private stroke: IFabricStroke | null = null;

  constructor(canvas: fabric.Canvas, options: Partial<IFabricToolOptions>) {
    super(canvas, options);

    this.canvas.isDrawingMode = true;
    this.canvas.on(MouseEvents.MOUSE_DOWN, this.onMouseDown);
    this.canvas.on(MouseEvents.MOUSE_UP, this.onMouseUp);
    this.canvas.on(MouseEvents.MOUSE_MOVE, this.onMouseMove);
  }

  private handlePathCreated = (event: IFabricEvent) => {
    if (event.path && this.stroke) {
      this.stroke.path = event.path;
      this.emit(ToolEvents.TOOL_DRAWING, this.stroke);
    }
  }

  get toolType() {
    return Tools.MARKER;
  }

  onMouseDown = (event: fabric.IEvent) => {

    this.stroke = {
      id: generate(),
      tool: Tools.MARKER,
      color: this.options.color || 'black',
      size: this.options.lineSize || 1,
    };
    
    this.canvas.renderAll();

    this.canvas.on(PathEvents.PATH_CREATED, this.handlePathCreated);

  }

  onMouseMove = (event: IFabricEvent) => {

    if(this.stroke && event.path) {
      this.stroke.path = event.path;
    }
  }

  onMouseUp = (event: fabric.IEvent) => {

    if (this.stroke) {
      this.canvas.off(PathEvents.PATH_CREATED, this.handlePathCreated);
      this.stroke = null;
    }

  }

  discard() {
    this.canvas.isDrawingMode = false;
    this.canvas.off(MouseEvents.MOUSE_DOWN, this.onMouseDown);
    this.canvas.off(MouseEvents.MOUSE_UP, this.onMouseUp);
    this.canvas.off(MouseEvents.MOUSE_MOVE, this.onMouseMove);
  }

}
