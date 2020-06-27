import { fabric } from 'fabric';

export interface ICanvasGridOptions {
  fill: string,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  backgroundColor: string,
  borderColor: string,
}

export const gridDefaults: ICanvasGridOptions = {
  fill: '#fff',
  width: 26,
  height: 26,
  stroke: '#eee',
  strokeWidth: 1,
  backgroundColor: '#fff',
  borderColor: 'fff',
}

export function gridPattern(canvas: fabric.Canvas, options: ICanvasGridOptions = gridDefaults) {

  const rect = new fabric.Rect(options);
  const pattern = new fabric.Pattern({source: rect.toDataURL({format: 'jpeg', quality: 10, width: (options.width - 1), height: (options.height - 1)}), repeat: 'repeat'});
  canvas.setBackgroundColor(pattern, () => {
    setTimeout(() => { canvas.renderAll() }, 100); // HACK: to prevent the background from rendering all black at first
  });

}
