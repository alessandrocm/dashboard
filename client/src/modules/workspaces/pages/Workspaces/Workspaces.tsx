import React, { useState, useEffect } from 'react';
import { toolShortcut } from 'modules/workspaces/hooks/keys';
import { Header, Footer, Toolbar, Navigation, WhiteBoard, Zoombar } from '../../components';
import { windowSize } from 'core/helpers/window.helper';
import { windowResize } from 'modules/workspaces/hooks/window';
import { Tools } from 'core/tools';
import { zooming, zoomSettings } from 'core/helpers/zoom.helper';

import './Workspaces.scss';

export function Workspaces() {

  const [boardSize, setBoardSize] = useState(windowSize());
  const [tool, setTool] = useState(Tools.SELECTOR);
  const [zoom, setZoom] = useState(1);
  const calculateZoom = zooming(zoomSettings);

  useEffect(windowResize(() => setBoardSize(windowSize())));
  useEffect(toolShortcut(setTool), []);

  const handleSelectTool = (newTool: Tools) => {
    setTool(newTool);
  }

  const handleZoom = (value: number) => {
    setZoom(calculateZoom(zoom, value));
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
        <WhiteBoard
          color={'black'}
          fillColor={''}
          height={boardHeight}
          margins={0}
          lineSize={1}
          scale={zoom}
          tool={tool}
          width={boardWidth}
          onZoom={handleZoom}
          onToolSelect={handleSelectTool}
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
