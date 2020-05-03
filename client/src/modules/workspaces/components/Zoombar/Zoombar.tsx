import './Zoombar.scss';
import React from 'react';
import { Button } from 'shared/components';
import { PlusIcon, MinusIcon } from 'shared/components';

export interface ZoombarProps {
  zoom: number;
  onZoom: (value: number) => void;
}

export function Zoombar(props: ZoombarProps) {

  const handleZoom = (value: number) =>
    () => {
      if (props.onZoom) {
        props.onZoom(value);
      }
    }

  return (
    <div className="Zoombar">
      <Button
        onClick={handleZoom(-1)}
        className="Zoombar-button">
        <MinusIcon />
      </Button>
      <Button
        onClick={handleZoom(1)}
        className="Zoombar-button">
        <PlusIcon />
      </Button>
    </div>
  );

}
