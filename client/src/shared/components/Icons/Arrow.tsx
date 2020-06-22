import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMousePointer } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faMousePointer);

export function MousePointerIcon() {

  return (
    <FontAwesomeIcon icon='mouse-pointer' />
  );

}
