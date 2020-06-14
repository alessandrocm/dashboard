import { fabric } from 'fabric';
import { getWidth, getHeight } from './window.helper';
import merge from 'lodash.merge';

export interface IGridOptions {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  lineMaxWidth: number;
  height: number;
  width: number;
  margins: number;
}

const defaults: IGridOptions = {
  fillStyle: '#fff',
  strokeStyle: '#eee',
  lineWidth: 0.5,
  lineMaxWidth: 1,
  height: 800,
  width: 1000,
  margins: 20,
}

export function drawGrid(context: CanvasRenderingContext2D, options: Partial<IGridOptions> = defaults) {

  const settings = Object.assign({}, defaults, options);
  const {
    height,
    width,
    margins
  } = settings;

  const gridWidth = width - margins;
  const gridHeight = height - margins;
  const startValue = margins + 0.5;

  context.beginPath();
  context.fillStyle = settings.fillStyle;
  context.rect(margins, margins, gridWidth - margins, gridHeight - margins);
  context.fillRect(margins, margins, gridWidth - margins, gridHeight - margins);

  for (let x = startValue; x < gridWidth; x += 10) {
    context.beginPath();
    context.strokeStyle = settings.strokeStyle;
    context.lineWidth = settings.lineWidth;
    if ((x - startValue) % 50 === 0) {
      context.lineWidth = settings.lineMaxWidth;
    }
    context.moveTo(x, margins);
    context.lineTo(x, gridHeight);
    context.stroke();
  }

  for (let y = startValue; y < gridHeight; y += 10) {
    context.beginPath();
    context.strokeStyle = settings.strokeStyle;
    context.lineWidth = settings.lineWidth;
    if ((y - startValue) % 50 === 0) {
      context.lineWidth = settings.lineMaxWidth;
    }
    context.moveTo(margins, y);
    context.lineTo(gridWidth, y);
    context.stroke();
  }

}

export interface ICanvasGridLinesOptions {
  stroke: string;
  strokeWidth: number;
  selectable?: false;
}

export interface ICanvasGridOptions {
  distance: number;
  width: number;
  height: number;
  lines: ICanvasGridLinesOptions;
}

export const gridDefaults: ICanvasGridOptions = {
  distance: 10,
  width: getWidth(),
  height: getHeight(),
  lines: {
    stroke: '#eee',
    strokeWidth: 1,
    selectable: false,
  }
}

export function gridPattern(canvas: fabric.Canvas, options?: ICanvasGridOptions) {
  const gridOptions = merge({}, gridDefaults, options);
  const gridLength = gridOptions.width /  gridOptions.distance;

  for (var i = 0; i < gridLength; i++) {
    var distance   = i * gridOptions.distance,
        horizontal = new fabric.Line([ distance, 0, distance, gridOptions.width], gridOptions.lines),
        vertical   = new fabric.Line([ 0, distance, gridOptions.width, distance], gridOptions.lines);
    canvas.add(horizontal);
    canvas.add(vertical);
    if(i%5 === 0){
      horizontal.set({stroke: '#cccccc'});
      vertical.set({stroke: '#cccccc'});
    };
  }
}
