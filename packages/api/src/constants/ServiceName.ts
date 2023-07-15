const ServiceName = {
  WALLET: 'sea_wallet',
  FULL_NODE: 'sea_full_node',
  FARMER: 'sea_farmer',
  HARVESTER: 'sea_harvester',
  SIMULATOR: 'sea_full_node_simulator',
  DAEMON: 'daemon',
  PLOTTER: 'chia_plotter',
  TIMELORD: 'sea_timelord',
  INTRODUCER: 'sea_introducer',
  EVENTS: 'wallet_ui',
  DATALAYER: 'sea_data_layer',
  DATALAYER_SERVER: 'sea_data_layer_http',
} as const;

type ObjectValues<T> = T[keyof T];

export type ServiceNameValue = ObjectValues<typeof ServiceName>;

export default ServiceName;
