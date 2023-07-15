import { WalletType } from '@sea-network/api';
import type { Wallet } from '@sea-network/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Sea';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
