import React from 'react';
import { Button } from 'shared/components';
import { PlusIcon, MinusIcon, Slider } from 'shared/components';
import { zoomSettings } from 'core/helpers/zoom.helper';

import './Zoombar.scss';

export interface ZoombarProps {
  zoom: number;
  min?: number;
  max?: number;
  step?: number;
  onZoom?: (value: number) => void;
}

const defaultProps: ZoombarProps = {
  zoom: 1,
  ...zoomSettings
}

export function Zoombar(zoomProps: ZoombarProps) {

  const props = Object.assign({}, defaultProps, zoomProps);

  const handleZoomStep = (value: number) =>
    () => {
      if (props.onZoom) {
        props.onZoom(value);
      }
    }
  
    const handleZoom = (value: number) => {
      if (props.onZoom) {
        const zoom = (props.zoom === value) ? 0 : ((props.zoom > value) ? -1 : 1);
        props.onZoom(zoom);
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
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.zoom} />
      <Button
        onClick={handleZoomStep(1)}
        className="Zoombar-button">
        <PlusIcon />
      </Button>
    </div>
  );

}
