
export interface ICoordinate {
  x: number,
  y: number,
}

export interface IDrawing {
  id: string;
  tool: string;
  color: string;
  size: number;
}

export interface IShape extends IDrawing {
  fillColor: string;
  start: ICoordinate;
  end: ICoordinate | null;
}

export interface IStroke extends IDrawing {
  points: ICoordinate[];
}

export interface ITool {

  draw(item: IDrawing, animate: boolean): void;

  onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IDrawing[],

  onMouseMove(x: number, y: number): IDrawing[] | undefined;

  onMouseUp(x: number, y: number): IDrawing[] | undefined;

}

export abstract class Tool implements ITool {

  constructor(protected readonly context: CanvasRenderingContext2D) {}
  
  abstract draw(item: IDrawing, animate?: boolean): void;

  abstract onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IDrawing[];

  abstract onMouseMove(x: number, y: number): IDrawing[] | undefined;

  abstract onMouseUp(x: number, y: number): IDrawing[] | undefined;

}
