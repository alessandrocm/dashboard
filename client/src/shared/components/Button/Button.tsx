import React, { ReactNode } from 'react';
import './Button.scss';

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      type='button'
      className={props.className}
      onClick={handleClick}
      disabled={!!props.disabled}>{props.children}</button>
  );

}
