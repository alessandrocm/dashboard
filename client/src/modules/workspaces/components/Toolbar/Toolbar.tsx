import React from 'react';
import { Button } from '../../../../shared/components';
import { PencilIcon } from '../../../../shared/components/Icons/Pencil';
import { SquareIcon } from '../../../../shared/components/Icons/Square';
import { CircleIcon } from '../../../../shared/components/Icons/Circle';
import { Tools } from '../../../../core/tools';

import './Toolbar.scss';

export interface ToolbarProps {
  onSelect: (tool: string) => void;
}

export function Toolbar(props: ToolbarProps) {

  const handleSelect = (tool: string) => {
    return () => props.onSelect(tool);
  }

  return (
    <div className="Toolbar">
      <div className="Toolbar-item">
        <Button
          className="Toolbar-button"
          onClick={handleSelect(Tools.PENCIL)}
          >
          <PencilIcon />
        </Button>
      </div>
      <div className="Toolbar-item">
        <Button
          className="Toolbar-button"
          onClick={handleSelect(Tools.RECTANGLE)}>
          <SquareIcon />
        </Button>
      </div>
      <div className="Toolbar-item">
        <Button
          className="Toolbar-button"
          onClick={handleSelect(Tools.ELLIPSE)}>
          <CircleIcon />
        </Button>
      </div>
    </div>
  );

}
