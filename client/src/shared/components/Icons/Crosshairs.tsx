import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faCrosshairs);

export function CrosshairsIcon() {

  return (
    <FontAwesomeIcon icon='crosshairs' />
  );

}
