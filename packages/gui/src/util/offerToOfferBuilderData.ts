import { OfferSummaryRecord, type OfferSummaryCATInfo } from '@sea-network/api';
import { mojoToCAT, mojoToSea } from '@sea-network/core';
import BigNumber from 'bignumber.js';

import type OfferBuilderData from '../@types/OfferBuilderData';
import type OfferSummary from '../@types/OfferSummary';

import { launcherIdToNFTId } from './nfts';

export default function offerToOfferBuilderData(
  offerSummary: OfferSummary | OfferSummaryRecord,
  setDefaultOfferedFee?: boolean,
  defaultFee?: string // in mojos
): OfferBuilderData {
  const { fees, offered, requested, infos } = offerSummary;

  const defaultFeeXSEA = defaultFee ? mojoToSea(defaultFee).toFixed() : '';

  const offeredXSea: OfferBuilderData['offered']['xsea'] = [];
  const offeredTokens: OfferBuilderData['offered']['tokens'] = [];
  const offeredNfts: OfferBuilderData['offered']['nfts'] = [];
  const offeredFee: OfferBuilderData['offered']['fee'] = setDefaultOfferedFee ? [{ amount: defaultFeeXSEA }] : [];
  const requestedXSea: OfferBuilderData['requested']['xsea'] = [];
  const requestedTokens: OfferBuilderData['requested']['tokens'] = [];
  const requestedNfts: OfferBuilderData['requested']['nfts'] = [];

  // processing requested first because it's what you/we will give

  Object.keys(requested).forEach((id) => {
    const amount = new BigNumber(requested[id]);
    const info = infos[id];

    if (info?.type === 'CAT') {
      const crCat = extractCrCatData(info);
      offeredTokens.push({
        amount: mojoToCAT(amount).toFixed(),
        assetId: id,
        crCat,
      });
    } else if (info?.type === 'singleton') {
      offeredNfts.push({
        nftId: launcherIdToNFTId(info.launcherId),
      });
    } else if (id === 'xsea') {
      offeredXSea.push({
        amount: mojoToSea(amount).toFixed(),
      });
    }
  });

  Object.keys(offered).forEach((id) => {
    const amount = new BigNumber(offered[id]);
    const info = infos[id];

    if (info?.type === 'CAT') {
      const crCat = extractCrCatData(info);
      requestedTokens.push({
        amount: mojoToCAT(amount).toFixed(),
        assetId: id,
        crCat,
      });
    } else if (info?.type === 'singleton') {
      requestedNfts.push({
        nftId: launcherIdToNFTId(info.launcherId),
      });
    } else if (id === 'xsea') {
      requestedXSea.push({
        amount: mojoToSea(amount).toFixed(),
      });
    }
  });

  return {
    offered: {
      xsea: offeredXSea,
      tokens: offeredTokens,
      nfts: offeredNfts,
      fee: offeredFee,
    },
    requested: {
      xsea: requestedXSea,
      tokens: requestedTokens,
      nfts: requestedNfts,
      fee: [
        {
          amount: mojoToSea(fees).toFixed(),
        },
      ],
    },
  };
}

function extractCrCatData(info: OfferSummaryCATInfo) {
  if (!info.also) return undefined;
  if (info.also.type !== 'credential restricted') return undefined;
  const { flags, authorizedProviders } = info.also;
  return {
    flags,
    authorizedProviders,
  };
}
