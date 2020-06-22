import React, { useState, useEffect } from 'react';
import { toolShortcut } from 'modules/workspaces/hooks/keys';
import { Header, Footer, Toolbar, Navigation } from '..';
import { Zoombar } from '../Zoombar/Zoombar';
import { WhiteBoard2 } from 'core/components/WhiteBoard2/WhiteBoard2';
import { windowSize } from 'core/helpers/window.helper';
import { windowResize } from 'modules/workspaces/hooks/window';
import { Tools } from 'core/tools';
import { zooming } from 'core/helpers/zoom.helper';

import './Workspaces.scss';

export function Workspaces() {

  const [boardSize, setBoardSize] = useState(windowSize());
  const [tool, setTool] = useState(Tools.SELECTOR);
  const [zoom, setZoom] = useState(1);
  const [step, min, max] = [.1, .5, 1.5];
  const calculateZoom = zooming({step, min, max});

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
        <WhiteBoard2
          color={'black'}
          fillColor={''}
          height={boardHeight}
          margins={0}
          lineSize={1}
          scale={zoom}
          onZoom={handleZoom}
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
