import { EventEmitter } from "events";
import { Tools } from "../enum";

export interface IFabricDrawing {
  id: string;
  tool: string;
  color: string;
  size: number;
}

export interface IFabricShape extends IFabricDrawing {
  fillColor?: string;
  start: fabric.Point;
  end?: fabric.Point;
  object?: fabric.Object;
}

export interface IFabricStroke extends IFabricDrawing {
  path?: fabric.Path;
}

export interface IFabricToolOptions {
  x: number;
  y: number;
  color: string;
  lineSize: number;
  fillColor: string;
}

export interface IFabricTool {

  toolType: Tools;

  onMouseDown(event: fabric.IEvent): void;

  onMouseMove(event: fabric.IEvent): void;

  onMouseUp(event: fabric.IEvent): void;

  discard(): void;

}

export abstract class FabricTool extends EventEmitter implements IFabricTool{

  constructor(
    protected readonly canvas: fabric.Canvas,
    protected options: Partial<IFabricToolOptions>) {
    super();
  }

  get toolOptions(): Partial<IFabricToolOptions> {
    return this.options;
  }

  set toolOptions(options: Partial<IFabricToolOptions>) {
    this.options = {...this.options, ...options};
    this.canvas.freeDrawingBrush.color = this.options.color || 'black';
    this.canvas.freeDrawingBrush.width = this.options.lineSize || 1;
  }

  selectionStatus(status: boolean) {
    this.canvas.selection = status;
    this.canvas.forEachObject(
      (object) => object.selectable = (object.name !== '@@background') && status
    );
  }

  abstract get toolType(): Tools;

  abstract onMouseDown(event: fabric.IEvent): void;

  abstract onMouseMove(event: fabric.IEvent): void;

  abstract onMouseUp(event: fabric.IEvent): void;

  abstract discard(): void;

}
