import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faCircle);

export function CircleIcon() {

  return (
    <FontAwesomeIcon icon='circle' />
  );

}
