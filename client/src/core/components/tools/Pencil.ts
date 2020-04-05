import { generate } from 'shortid';
import { Tool, IStroke, ICoordinate } from './Tool';

export const PENCIL_TOOL = 'pencil';

export class Pencil extends Tool {
  
  draw(item: IStroke, animate: boolean): void {
    let [time, index] = [0, 1];
    const max = this.points.length;
    for (index; index < max; index++) {
      if (animate) {
        setTimeout(() => this.drawLine(item, item.points[index - 1], item.points[index]), time);
        time += 10;
      } else {
        this.drawLine(item, item.points[index - 1], item.points[index]);
      }
    }
  }

  onDebounceMouseMove(): [IStroke | null, ICoordinate[]] {
    const debouncedPoints = this.points;
    this.points = [];
    return [this.stroke, debouncedPoints];
  }

  onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IStroke[] {

    this.stroke = {
      id: generate(),
      tool: PENCIL_TOOL,
      color,
      size,
      points: [{x,y}]
    };

    return [this.stroke];
  
  }

  onMouseMove(x: number, y: number): IStroke[] {
    if (!this.stroke) return [];

    const coordinates = {x, y} as ICoordinate;
    const begin = this.stroke.points.slice(-1)[0];
    this.drawLine(this.stroke, begin, coordinates);
    this.stroke.points.push(coordinates);
    this.points.push(coordinates);

    return [this.stroke];
  }

  onMouseUp(x: number, y: number): IStroke[] | undefined {
    if (!this.stroke) return;

    this.onMouseMove(x, y);
    this.points = [];
    const items = this.stroke;
    this.stroke = null;

    return [items];
  }

  private drawLine = (item: IStroke, start: ICoordinate, end: ICoordinate) => {
    this.context.save();
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.beginPath();
    this.context.lineWidth = item.size;
    this.context.strokeStyle = item.color;
    this.context.globalCompositeOperation = 'source-over';
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
  }

}
