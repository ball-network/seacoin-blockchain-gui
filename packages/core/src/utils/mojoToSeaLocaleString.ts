import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';

import seaFormatter from './seaFormatter';

export default function mojoToSeaLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return seaFormatter(mojo, Unit.MOJO).to(Unit.SEA).toLocaleString(locale);
}
