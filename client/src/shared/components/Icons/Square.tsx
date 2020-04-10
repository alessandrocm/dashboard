import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

library.add(faSquare);

export function SquareIcon() {

  return (
    <FontAwesomeIcon icon={['far', 'square']} />
  );

}