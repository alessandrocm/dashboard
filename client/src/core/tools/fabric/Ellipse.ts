import { FabricTool, IFabricShape, IFabricToolOptions } from "./FabricTool";
import { fabric } from "fabric";
import { MouseEvents, ToolEvents } from "./FabricEvents";
import { generate } from "shortid";
import { Circle, Rect } from "fabric/fabric-impl";
import { Tools } from "../enum";

export class Ellipse extends FabricTool {
  
  private shapeData: IFabricShape | null = null;

  constructor(canvas: fabric.Canvas, options: Partial<IFabricToolOptions>) {
    super(canvas, options);

    this.selectionStatus(false);
    this.canvas.on(MouseEvents.MOUSE_DOWN, this.onMouseDown);
    this.canvas.on(MouseEvents.MOUSE_UP, this.onMouseUp);
    this.canvas.on(MouseEvents.MOUSE_MOVE, this.onMouseMove);
  }

  onMouseDown = (event: fabric.IEvent) => {

    const pointer = this.canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    const id = generate();
    const ellipse = new fabric.Ellipse({
      name: id,
      left: x,
      top: y,
      originX: 'left',
      originY: 'top',
      rx: 0,
      ry: 0,
      angle: 0,
      strokeWidth: this.options.lineSize || 1,
      stroke: this.options.color || 'black',
      fill: this.options.fillColor,
      selectable: true
    });

    this.shapeData = {
      id,
      start: new fabric.Point(x, y),
      fillColor: this.options.fillColor,
      tool: Tools.ELLIPSE,
      color: this.options.color || 'black',
      size: this.options.lineSize || 1,
      object: ellipse,
    };

    this.canvas.add(ellipse);
    this.canvas.renderAll();

  }

  onMouseMove = (event: fabric.IEvent) => {

    if (this.shapeData) {
      
      const ellipse = this.shapeData.object as fabric.Ellipse;
      const pointer = this.canvas.getPointer(event.e);
      const originX = this.shapeData.start.x;
      const originY = this.shapeData.start.y;
      const [left, diffX] = (originX > pointer.x) ? [Math.abs(pointer.x), originX] : [originX, Math.abs(pointer.x)];
      const [top, diffY] = (originY > pointer.y) ? [Math.abs(pointer.y), originY] : [originY, Math.abs(pointer.y)];

      let rx = Math.abs(left - diffX) / 2;
      let ry = Math.abs(top - diffY) / 2;

      if (ellipse.strokeWidth) {
        if (rx > ellipse.strokeWidth) {
          rx -= ellipse.strokeWidth / 2;
        }
        if (ry > ellipse.strokeWidth) {
          ry -= ellipse.strokeWidth / 2;
        }
      }

      ellipse.set({ left, top, rx, ry });
      this.canvas.renderAll();

    }

  }

  onMouseUp = (event: fabric.IEvent) => {
    
    if (this.shapeData) {
      const pointer = this.canvas.getPointer(event.e);
      const ellipse = this.shapeData.object as fabric.Ellipse;
      ellipse.setCoords();
      ellipse.selectable = false;
      this.shapeData.end = new fabric.Point(pointer.x, pointer.y);
      this.emit(ToolEvents.TOOL_DRAWING, this.shapeData);
      this.shapeData = null;
    }

  }

  discard(): void {
    this.shapeData = null;
    this.canvas.off(MouseEvents.MOUSE_DOWN, this.onMouseDown);
    this.canvas.off(MouseEvents.MOUSE_UP, this.onMouseUp);
    this.canvas.off(MouseEvents.MOUSE_MOVE, this.onMouseMove);
    this.selectionStatus(true);
  }

}
