import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faMinus);

export function MinusIcon() {

  return (
    <FontAwesomeIcon icon={'minus'} />
  );

}
