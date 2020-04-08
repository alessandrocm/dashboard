
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
  strokeStyle: '#ddd',
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