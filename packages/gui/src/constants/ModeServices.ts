import { ServiceName } from '@sea-network/api';
import { Mode } from '@sea-network/core';

export default {
  [Mode.WALLET]: [ServiceName.WALLET],
  [Mode.FARMING]: [ServiceName.WALLET, ServiceName.FULL_NODE, ServiceName.FARMER, ServiceName.HARVESTER],
};

export const SimulatorServices = [ServiceName.WALLET, ServiceName.SIMULATOR];
