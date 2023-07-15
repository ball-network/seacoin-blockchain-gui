import BigNumber from 'bignumber.js';

import Unit from '../constants/Unit';
import seaFormatter from './seaFormatter';

export default function seaToMojo(sea: string | number | BigNumber): BigNumber {
  return seaFormatter(sea, Unit.SEA).to(Unit.MOJO).toBigNumber();
}
