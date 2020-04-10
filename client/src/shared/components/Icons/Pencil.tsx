import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faPencilAlt);

export function PencilIcon() {

  return (
    <FontAwesomeIcon icon='pencil-alt' />
  );

}
