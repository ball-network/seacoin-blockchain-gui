import { WalletType } from '@sea-network/api';

import createDefaultValues from './createDefaultValues';

describe('createDefaultValues', () => {
  describe('when no params are provided', () => {
    it('should return an object with empty value arrays', () => {
      expect(createDefaultValues()).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
  });
  describe('when empty params are provided', () => {
    it('should return an object with empty value arrays', () => {
      expect(createDefaultValues({})).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
  });
  describe('when an XSEA wallet type is provided', () => {
    it('should return an object with an XSEA entry', () => {
      expect(createDefaultValues({ walletType: WalletType.STANDARD_WALLET })).toEqual({
        offered: {
          xsea: [{ amount: '' }],
          tokens: [],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
  });
  describe('when a CAT wallet type is provided', () => {
    it('should return an object with a token entry only if an assetId is also provided', () => {
      expect(createDefaultValues({ walletType: WalletType.CAT })).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
      expect(createDefaultValues({ walletType: WalletType.CAT, assetId: '123' })).toEqual({
        offered: {
          xsea: [],
          tokens: [{ assetId: '123', amount: '' }],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
  });
  describe('when nftId is provided', () => {
    it('should return an object with a requested NFT entry only if nftWalletId is not provided', () => {
      expect(createDefaultValues({ nftId: '123' })).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [{ nftId: '123' }],
          fee: [],
        },
      });
    });
    it('should return an object with an offered NFT entry if nftWalletId is provided', () => {
      expect(createDefaultValues({ nftId: '123', nftWalletId: 1 })).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [{ nftId: '123' }],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
  });
  describe('when nftIds is provided', () => {
    it('should return an object with an offered NFT entry if nftWalletId is provided', () => {
      expect(createDefaultValues({ nftIds: ['123', '456'], nftWalletId: 1 })).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [{ nftId: '123' }, { nftId: '456' }],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
    it('should not return offered NFT entries if nftWalletId is omitted', () => {
      expect(createDefaultValues({ nftIds: ['123', '456'] })).toEqual({
        offered: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
        requested: {
          xsea: [],
          tokens: [],
          nfts: [],
          fee: [],
        },
      });
    });
  });
  describe('when the returned data is modified', () => {
    it('the original data is not modified', () => {
      const values = createDefaultValues();
      values.offered.xsea = [{ amount: '1' }];
      values.requested.xsea = [{ amount: '2' }];
      const values2 = createDefaultValues();
      expect(values2.offered.xsea).toStrictEqual([]);
    });
  });
});
