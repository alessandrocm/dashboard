import { generate } from 'shortid';
import { Tool, IShape, IDrawing } from './Tool';
import { Tools } from './enum';

export class Ellipse extends Tool {
  
  private ellipse: IShape | null = null;
  private imageData: ImageData | null = null;

  private drawEllipse(item: IShape, x: number, y: number) {
    const startX = x < item.start.x ? x : item.start.x;
    const startY = y < item.start.y ? y : item.start.y;
    const endX = x >= item.start.x ? x : item.start.x;
    const endY = y >= item.start.y ? y : item.start.y;
    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = item.size;
    this.context.strokeStyle = item.color;
    this.context.fillStyle = item.fillColor;

    if (typeof this.context.ellipse === 'function') {
      this.context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {
      this.ellipsePolyfill(centerX, centerY, radiusX, radiusY);
    }

    this.context.stroke();
    if (item.fillColor) {
      this.context.fill();
    }

    this.context.closePath();
    this.context.restore();
  }

  private ellipsePolyfill(centerX: number, centerY: number, radiusX: number, radiusY: number) {
    let [index, xPos, yPos] = [0, 0, 0];
    for(index; index < 2 * Math.PI; index += 0.0) {
      xPos = centerX - (radiusY * Math.sin(index)) * Math.sin(0) + (radiusX * Math.cos(index)) * Math.cos(0);
      yPos = centerY + (radiusX * Math.cos(index)) * Math.sin(0) + (radiusY * Math.sin(index)) * Math.cos(0);

      if (index === 0) {
        this.context.moveTo(xPos, yPos);
      } else {
        this.context.lineTo(xPos, yPos);
      }
    }
  }

  draw(item: IShape, animate: boolean): void {
    this.drawEllipse(item, item.end?.x || 0, item.end?.y || 0);
  }

  onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IDrawing[] {
    this.ellipse = {
      id: generate(),
      tool: Tools.ELLIPSE,
      color,
      size,
      fillColor,
      start: {x, y},
      end: null,
    };
    const {
      canvas: {
        clientWidth,
        clientHeight,
      }
    } = this.context;
    this.imageData = this.context.getImageData(0, 0, clientWidth, clientHeight);
    return [this.ellipse];
  }

  onMouseMove(x: number, y: number): IDrawing[] | undefined {
    if (this.ellipse) {
      this.context.putImageData(this.imageData!, 0, 0);
      this.drawEllipse(this.ellipse, x, y);

      return [this.ellipse];
    }
  }

  onMouseUp(x: number, y: number): IDrawing[] | undefined {
    if (this.ellipse) {
      this.onMouseMove(x, y);
      const item = this.ellipse;
      this.imageData = null;
      this.ellipse = null;
      item.end = {x, y};
      return [item];
    }
  }

}
