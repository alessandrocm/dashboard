import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faPlus);

export function PlusIcon() {

  return (
    <FontAwesomeIcon icon={'plus'} />
  );

}
