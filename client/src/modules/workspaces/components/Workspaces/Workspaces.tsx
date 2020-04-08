import React from 'react';
import { WhiteBoard } from '../../../../core';

import './Workspaces.scss';

export function Workspaces() {
  return (
    <div className="Workspaces">
      <header className="Workspaces-main">
        <WhiteBoard
          color={'black'}
          fillColor={''}
          height={808}
          size={1}
          tool={'PENCIL'}
          width={1290}
        />
      </header>
    </div>
  );
}
