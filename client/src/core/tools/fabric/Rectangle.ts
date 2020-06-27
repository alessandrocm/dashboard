import { generate } from 'shortid';
import { FabricTool, IFabricToolOptions, IFabricShape } from "./FabricTool";
import { fabric } from "fabric";
import { MouseEvents, ToolEvents } from "./FabricEvents";
import { Tools } from "../enum";

export class Rectangle extends FabricTool {

  private shapeData: IFabricShape | null = null;

  constructor(canvas: fabric.Canvas, options: Partial<IFabricToolOptions>) {
    super(canvas, options);

    this.selectionStatus(false);
    this.canvas.defaultCursor = 'crosshair';
    this.canvas.hoverCursor = 'crosshair';
    this.canvas.on(MouseEvents.MOUSE_DOWN, this.onMouseDown);
    this.canvas.on(MouseEvents.MOUSE_UP, this.onMouseUp);
    this.canvas.on(MouseEvents.MOUSE_MOVE, this.onMouseMove);
  }

  get toolType() {
    return Tools.RECTANGLE;
  }

  onMouseDown = (event: fabric.IEvent) => {

    const pointer = this.canvas.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;
    const id = generate();
    const rectangle = new fabric.Rect({
        name: id,
        left: x,
        top: y,
        originX: 'left',
        originY: 'top',
        width: 0,
        height: 0,
        angle: 0,
        strokeWidth: this.options.lineSize || 1,
        stroke: this.options.color || 'black',
        fill: this.options.fillColor,
        transparentCorners: false,
        selectable: true
    });

    this.shapeData = {
      id,
      start: new fabric.Point(x, y),
      fillColor: this.options.fillColor,
      tool: Tools.RECTANGLE,
      color: this.options.color || 'black',
      size: this.options.lineSize || 1,
      object: rectangle,
    }

    this.canvas.add(rectangle);
    this.canvas.renderAll();

  }

  onMouseUp = (event: fabric.IEvent) => {
    
    if (this.shapeData) {
      const pointer = this.canvas.getPointer(event.e);
      const rectangle = this.shapeData.object as fabric.Rect;
      rectangle.setCoords();
      rectangle.selectable = false;
      this.shapeData.end = new fabric.Point(pointer.x, pointer.y);
      this.emit(ToolEvents.TOOL_DRAWING, this.shapeData);
      this.shapeData = null;
    }

  }

  onMouseMove = (event: fabric.IEvent) => {

    if (this.shapeData) {

      const pointer = this.canvas.getPointer(event.e);
      const rectangle = this.shapeData.object as fabric.Rect;
      const originX = this.shapeData.start.x;
      const originY = this.shapeData.start.y;
      
      if(originX! > pointer.x){
          rectangle.set({ left: Math.abs(pointer.x) });
      }

      if(originY ! > pointer.y){
          rectangle.set({ top: Math.abs(pointer.y) });
      }
      
      rectangle.set({ width: Math.abs(originX! - pointer.x) });
      rectangle.set({ height: Math.abs(originY! - pointer.y) });
      
      
      this.canvas.renderAll();
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
