import React, { useState, useEffect } from 'react';
import { WhiteBoard } from 'core';
import { toolShortcut } from 'modules/workspaces/hooks/keys';
import { Header, Footer, Toolbar, Navigation } from '..';
import { Zoombar } from '../Zoombar/Zoombar';
import './Workspaces.scss';

export function Workspaces() {

  const boardWidth = 3000;
  const boardHeight = 1000;
  const [tool, setTool] = useState('PENCIL');
  const [zoom, setZoom] = useState(1);

  useEffect(toolShortcut(setTool), []);

  const handleSelectTool = (newTool: string) => {
    setTool(newTool);
  }

  const handleZoom = (value: number) => {
    const step = 0.1 * value;
    const scale = zoom + step;
    if (scale <= 0.5 || scale >= 1.5) {
      return;
    }
    setZoom(scale);
  }

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
        />
        <Footer>
          <Zoombar
            onZoom={handleZoom}
            zoom={1}
          />
        </Footer>
      </section>
    </div>
  );
}
