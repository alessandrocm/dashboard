import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faSquare);

export function SquareIcon() {

  return (
    <FontAwesomeIcon icon='square' />
  );

}