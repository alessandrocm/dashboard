
export const zoomSettings = {
  step: 0.1,
  min: .5,
  max: 1.5
};

export interface ZoomOptions {
  min?: number;
  max?: number;
  step?: number;
}

export function zooming(options: ZoomOptions) {
  const { step = 0.1, min = .5, max = 1.5 } = options;

  return (zoom: number, value: number) => {
    const change = step * value;
    const scale = Number.parseFloat((zoom + change).toPrecision(2));
    if (scale < min || scale > max) {
      return zoom;
    }

    return scale;
  }

}