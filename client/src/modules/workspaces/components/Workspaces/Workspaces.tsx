import React, { useState, useEffect } from 'react';
import { WhiteBoard } from 'core';
import { toolShortcut } from 'modules/workspaces/hooks/keys';
import { Header, Footer, Toolbar, Navigation } from '..';
import './Workspaces.scss';

export function Workspaces() {

  const boardWidth = 3000;
  const boardHeight = 1000;
  const [tool, setTool] = useState('PENCIL');

  useEffect(toolShortcut(setTool), []);

  const handleSelectTool = (newTool: string) => {
    setTool(newTool);
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
          size={1}
          tool={tool}
          width={boardWidth}
        />
        <Footer />
      </section>
    </div>
  );
}
