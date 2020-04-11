import React, { ReactNode } from 'react';

import './Footer.scss';

export interface FooterProps {
  children?: ReactNode;
}

export function Footer(props: FooterProps) {

  return (
    <div className="Footer">
      <div className="Footer-items">
        {props.children}
      </div>
    </div>
  );

}
