import React, { useState, useEffect } from 'react';
import { WhiteBoard } from 'core';
import { toolShortcut } from 'modules/workspaces/hooks/keys';
import { Header, Footer, Toolbar, Navigation } from '..';
import { Zoombar } from '../Zoombar/Zoombar';
import { WhiteBoard2 } from 'core/components/WhiteBoard2/WhiteBoard2';
import { windowSize } from 'core/helpers/window.helper';
import { windowResize } from 'modules/workspaces/hooks/window';
import './Workspaces.scss';
import { Tools } from 'core/tools';

export function Workspaces() {

  const [boardSize, setBoardSize] = useState(windowSize());
  const [tool, setTool] = useState(Tools.MARKER);
  const [zoom, setZoom] = useState(1);

  useEffect(windowResize(() => setBoardSize(windowSize())));
  useEffect(toolShortcut(setTool), []);

  const handleSelectTool = (newTool: Tools) => {
    setTool(newTool);
  }

  const handleZoom = (scale: number) => {
    setZoom(scale);
  }

  const boardWidth = boardSize.width;
  const boardHeight = boardSize.height;

  return (
    <div className="Workspaces">
      <Navigation />
      <section className="Workspaces-main">
        <Header>
          <Toolbar selected={tool} onSelect={handleSelectTool} />
        </Header>
        <WhiteBoard2
          color={'black'}
          fillColor={''}
          height={boardHeight}
          margins={0}
          lineSize={1}
          scale={zoom}
          tool={tool}
          width={boardWidth}
        />
        <Footer>
          <Zoombar
            onZoom={handleZoom}
            zoom={zoom}
          />
        </Footer>
      </section>
    </div>
  );
}
