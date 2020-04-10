import React, { WheelEvent, useState, useEffect } from 'react';
import { WhiteBoard } from '../../../../core';
import { getHeight, getWidth, windowResized } from '../../../../core/helpers/window.helper';
import { ICoordinate } from '../../../../core/tools/Tool';
import { Header } from '..';

import './Workspaces.scss';
import { Toolbar } from '../Toolbar/Toolbar';

function calcluateStyles({height, width}: {height: number, width: number}) {
  const position: "absolute" = "absolute";
  return {
    position,
    top: 100,
    left: 240,
    height: height,
    width: width,
  };
}

function updateStyles(styles: any, deltaX: number, deltaY: number, boardDimensions: ICoordinate) {
  const shiftX = (styles.left - deltaX);
  const shiftY = (styles.top - deltaY);
  const [lowerXBound, upperXBound] = [(-1 * (100 + (boardDimensions.x - getWidth()))), 300];
  const [lowerYBound, upperYBound] = [(-1 * (100 + (boardDimensions.y - getHeight()))), 300];

  const left = (boardDimensions.x > getWidth()) && (shiftX > lowerXBound && shiftX < upperXBound) ? shiftX : styles.left;
  const top = (boardDimensions.y > getHeight()) && (shiftY > lowerYBound && shiftY < upperYBound) ? shiftY : styles.top;

  return {
    ...styles,
    left,
    top,
  };
}

export function Workspaces() {

  const boardWidth = 3000;
  const boardHeight = 1000;

  const [dimensions, setDimensions] = useState({
    height: getHeight(),
    width: getWidth()
  });

  const [tool, setTool] = useState('PENCIL');
  const [viewPortStyle, setViewPortStyle] = useState(calcluateStyles(dimensions))

  useEffect(() => {
    
    const resized = () => {
      setDimensions(windowResized());
      setViewPortStyle(calcluateStyles(dimensions));
    };
    window.addEventListener('resize', resized);

    return () => window.removeEventListener('resize', resized);
    
  });

  const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
    setViewPortStyle(updateStyles(viewPortStyle, event.deltaX, event.deltaY, {x: boardWidth, y: boardHeight}));
  }

  const handleSelectTool = (newTool: string) => {
    setTool(newTool);
  }

  return (
    <div className="Workspaces">
      <nav className="Workspaces-nav">Nav</nav>
      <section className="Workspaces-main">
        <Header>
          <Toolbar onSelect={handleSelectTool} />
        </Header>
        <div className="Workspaces-viewport" onWheel={handleScroll}>
          <div style={viewPortStyle}>
            <WhiteBoard
              color={'black'}
              fillColor={''}
              height={boardHeight}
              margins={0}
              size={1}
              tool={tool}
              width={boardWidth}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
