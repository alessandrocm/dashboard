import './Zoombar.scss';
import React from 'react';
import { Button } from 'shared/components';
import { PlusIcon, MinusIcon, Slider } from 'shared/components';

export interface ZoombarProps {
  zoom: number;
  min?: number;
  max?: number;
  step?: number;
  onZoom?: (value: number) => void;
}

const defaultProps: ZoombarProps = {
  zoom: 1,
  min: .5,
  max: 1.5,
  step: .1
}

export function Zoombar(zoomProps: ZoombarProps) {

  const props = Object.assign({}, defaultProps, zoomProps);

  const handleZoomStep = (value: number) =>
    () => {
      if (zoomProps.onZoom) {
        zoomProps.onZoom(value);
      }
    }
  
    const handleZoom = (value: number) => {
      if (zoomProps.onZoom) {
        const zoom = (zoomProps.zoom === value) ? 0 : ((zoomProps.zoom > value) ? -1 : 1);
        zoomProps.onZoom(zoom);
      }
    }

  return (
    <div className="Zoombar">
      <Button
        onClick={handleZoomStep(-1)}
        className="Zoombar-button">
        <MinusIcon />
      </Button>
      <Slider
        onChange={handleZoom}
        min={.5}
        max={1.5}
        step={.1}
        value={zoomProps.zoom} />
      <Button
        onClick={handleZoomStep(1)}
        className="Zoombar-button">
        <PlusIcon />
      </Button>
    </div>
  );

}
