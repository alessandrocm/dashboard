import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faCircle);

export function CircleIcon() {

  return (
    <FontAwesomeIcon icon={['far', 'circle']} />
  );

}
