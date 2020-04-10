import React from 'react';
import { Button } from '../../../../shared/components';
import { PencilIcon } from '../../../../shared/components/Icons/Pencil';
import { SquareIcon } from '../../../../shared/components/Icons/Square';
import { CircleIcon } from '../../../../shared/components/Icons/Circle';

import './Toolbar.scss';

export interface ToolbarProps {
  onSelect: () => void;
}

export function Toolbar(props: ToolbarProps) {

  return (
    <div className="Toolbar">
      <div className="Toolbar-item">
        <Button className="Toolbar-button">
          <PencilIcon />
        </Button>
      </div>
      <div className="Toolbar-item">
        <Button className="Toolbar-button">
          <SquareIcon />
        </Button>
      </div>
      <div className="Toolbar-item">
        <Button className="Toolbar-button">
          <CircleIcon />
        </Button>
      </div>
    </div>
  );

}
