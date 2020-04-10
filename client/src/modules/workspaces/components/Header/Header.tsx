import React, { ReactNode } from 'react';

import './Header.scss';

export interface HeaderProps {
  children?: ReactNode;
}

export function Header(props: HeaderProps) {

  return (
    <div className="Header">
      <h1>Workspaces</h1>
      <div className="Header-items">
        {props.children}
      </div>
    </div>
  );

}
