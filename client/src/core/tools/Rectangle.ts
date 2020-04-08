import { generate } from 'shortid';
import { Tool, IDrawing, IShape } from './Tool';
import { Tools } from './enum';

export class Rectangle extends Tool {

  private rectangle: IShape | null = null;
  private imageData: ImageData | null = null;

  private drawRectangle(item: IShape, x: number, y: number) {
    const startX = x < item.start.x ? x : item.start.x;
    const startY = y < item.start.y ? y : item.start.y;
    const widthX = Math.abs(item.start.x - x);
    const widthY = Math.abs(item.start.y - y);

    this.context.beginPath();
    this.context.lineWidth = item.size;
    this.context.strokeStyle = item.color;
    this.context.fillStyle = item.fillColor;
    this.context.rect(startX, startY, widthX, widthY);
    this.context.stroke();

    if(item.fillColor) {
      this.context.fill();
    }
  }

  draw(item: IShape, animate?: boolean): void {
    this.drawRectangle(item, item.end?.x || 0, item.end!.y || 0);
  }

  onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IDrawing[] {
    this.rectangle = {
      id: generate(),
      tool: Tools.RECTANGLE,
      color,
      size,
      fillColor,
      start: {x, y},
      end: null,
    };
    const {
      canvas : {
        clientWidth,
        clientHeight,
      }
    } = this.context;
    this.imageData = this.context.getImageData(0, 0, clientWidth, clientHeight);
    return [this.rectangle];
  }

  onMouseMove(x: number, y: number): IDrawing[] | undefined {
    if (this.rectangle) {
      this.context.putImageData(this.imageData!, 0, 0);
      this.context.save();
      this.drawRectangle(this.rectangle, x, y);
      this.context.restore();
      return [this.rectangle];
    }
  }

  onMouseUp(x: number, y: number): IDrawing[] | undefined {
    if (this.rectangle) {
      this.onMouseMove(x, y);
      const shape = this.rectangle;
      this.imageData = null;
      this.rectangle = null;
      shape.end = {x, y};
      return [shape];
    }
  }

}