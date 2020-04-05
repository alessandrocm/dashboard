
export interface ICoordinate {
  x: number,
  y: number,
}

export interface IStroke {
  id: string;
  tool: string;
  color: string;
  size: number;
  points: ICoordinate[];
}

export interface ITool {

  draw(item: IStroke, animate: boolean): void;

  onDebounceMouseMove(): [IStroke | null, ICoordinate[]]

  onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IStroke[],

  onMouseMove(x: number, y: number): IStroke[];

  onMouseUp(x: number, y: number): IStroke[] | undefined;

}

export abstract class Tool implements ITool {

  protected stroke: IStroke | null = null;
  protected points: ICoordinate[] = [];

  constructor(protected readonly context: CanvasRenderingContext2D) {}
  
  abstract draw(item: IStroke, animate: boolean): void;

  abstract onDebounceMouseMove(): [IStroke | null, ICoordinate[]];

  abstract onMouseDown(x: number, y: number, color: string, size: number, fillColor: string): IStroke[];

  abstract onMouseMove(x: number, y: number): IStroke[];

  abstract onMouseUp(x: number, y: number): IStroke[] | undefined;

}
