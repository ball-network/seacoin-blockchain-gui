import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import seaFormatter from './seaFormatter';

export default function mojoToSea(mojo: string | number | BigNumber): BigNumber {
  return seaFormatter(mojo, Unit.MOJO).to(Unit.SEA).toBigNumber();
}
