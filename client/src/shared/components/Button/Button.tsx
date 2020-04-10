import React, { ReactNode } from 'react';
import './Button.scss';

export interface ButtonProps {
  className: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {

  return (
    <button
      type='button'
      className={props.className}
      disabled={!!props.disabled}>{props.children}</button>
  );

}
