import React, { useState, useEffect } from 'react';
import { WhiteBoard } from 'core';
import { toolShortcut } from 'modules/workspaces/hooks/keys';
import { Header, Footer, Toolbar, Navigation } from '..';
import { Zoombar } from '../Zoombar/Zoombar';
import './Workspaces.scss';
import { WhiteBoard2 } from 'core/components/WhiteBoard2/WhiteBoard2';
import { getHeight, getWidth } from 'core/helpers/window.helper';

export function Workspaces() {

  const boardWidth = getWidth();
  const boardHeight = getHeight();
  const [tool, setTool] = useState('PENCIL');
  const [zoom, setZoom] = useState(1);

  useEffect(toolShortcut(setTool), []);

  const handleSelectTool = (newTool: string) => {
    setTool(newTool);
  }

  const handleZoom = (scale: number) => {
    setZoom(scale);
  }

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
