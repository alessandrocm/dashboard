import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/components';
import { PencilIcon } from 'shared/components/Icons/Pencil';
import { SquareIcon } from 'shared/components/Icons/Square';
import { CircleIcon } from 'shared/components/Icons/Circle';
import { Tools } from 'core/tools';

import './Toolbar.scss';

export interface ToolbarProps {
  selected?: string;
  onSelect: (tool: Tools) => void;
}

export function Toolbar(props: ToolbarProps) {

  const { selected = '' } = props;

  const handleSelect = (tool: Tools) => {
    return () => props.onSelect(tool);
  }

  const isTool = (selected: string, tool: string) => {
    return selected === tool;
  }

  const buttonClass = {'Toolbar-button': true}
  const pencilClass = classNames(buttonClass, {'selected': isTool(selected, Tools.MARKER)});
  const ellipseClass = classNames(buttonClass, {'selected': isTool(selected, Tools.ELLIPSE)});
  const rectangleClass = classNames(buttonClass, {'selected': isTool(selected, Tools.RECTANGLE)});

  return (
    <div className="Toolbar">
      <div className="Toolbar-item">
        <Button
          className={pencilClass}
          onClick={handleSelect(Tools.MARKER)}>
          <PencilIcon />
        </Button>
      </div>
      <div className="Toolbar-item">
        <Button
          className={rectangleClass}
          onClick={handleSelect(Tools.RECTANGLE)}>
          <SquareIcon />
        </Button>
      </div>
      <div className="Toolbar-item">
        <Button
          className={ellipseClass}
          onClick={handleSelect(Tools.ELLIPSE)}>
          <CircleIcon />
        </Button>
      </div>
    </div>
  );

}
