import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

export interface HomeProps {
  title: string;
}

export const Home: React.SFC<HomeProps> = (props: HomeProps) => {

  return (
    <div className="Home">
      <header className="Home-header">
        Welcome to {props.title}
        <Link className="Home-link" to="/workspaces">workspaces</Link>
      </header>
    </div>
  );
}
