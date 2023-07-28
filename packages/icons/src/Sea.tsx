import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

import SeaBlackIcon from './images/sea-black.svg';
import SeaIcon from './images/sea.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SeaIcon} viewBox="0 0 152 152" {...props} />;
}

export function SeaBlack(props: SvgIconProps) {
  return <SvgIcon component={SeaBlackIcon} viewBox="0 0 152 152" sx={{ width: '100px', height: '39px' }} {...props} />;
}
