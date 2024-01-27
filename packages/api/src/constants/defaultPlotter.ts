import defaultsForPlotter from '../utils/defaultsForPlotter';
import optionsForPlotter from '../utils/optionsForPlotter';

import PlotterName from './PlotterName';

export default {
  displayName: 'Sea Proof of Space',
  options: optionsForPlotter(PlotterName.SEAPOS),
  defaults: defaultsForPlotter(PlotterName.SEAPOS),
  installInfo: { installed: true },
};
