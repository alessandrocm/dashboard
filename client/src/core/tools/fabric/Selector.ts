import { fabric } from "fabric";
import { FabricTool, IFabricToolOptions } from "./FabricTool"
import { MouseEvents } from "./FabricEvents";

export class Selector extends FabricTool {

  private isPanning: boolean = false;

  constructor(canvas: fabric.Canvas, options: Partial<IFabricToolOptions>) {
    super(canvas, options);

    this.selectionStatus(true);
    
    const element = canvas.getElement();
    element.addEventListener('keydown', this.onKeyDown);
    element.addEventListener('keyup', this.onKeyUp);
    
  }

  onKeyDown = (event: KeyboardEvent) => {
    console.log('SHIFT', event.shiftKey);
    this.isPanning = event.shiftKey;
  }

  onKeyUp = (event: KeyboardEvent) => {
    this.isPanning = false;
  }

  onMouseDown(event: fabric.IEvent): void {
    throw new Error("Method not implemented.");
  }

  onMouseMove(event: fabric.IEvent): void {
    if (this.isPanning) {
      const pointer = this.canvas.getPointer(event.e);
      this.canvas?.absolutePan(new fabric.Point(pointer.x, pointer.y));
    }
  }

  onMouseUp(event: fabric.IEvent): void {
    throw new Error("Method not implemented.");
  }

  discard(): void {
    const element = this.canvas.getElement();
    element.removeEventListener('keydown', this.onKeyDown);
    element.removeEventListener('keyup', this.onKeyUp);
  }

}
