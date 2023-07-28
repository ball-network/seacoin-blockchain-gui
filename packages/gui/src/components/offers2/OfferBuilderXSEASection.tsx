import { Loading, seaToMojo, mojoToSeaLocaleString, useCurrencyCode } from '@sea-network/core';
import { Farming } from '@sea-network/icons';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import useOfferBuilderContext from '../../hooks/useOfferBuilderContext';
import useStandardWallet from '../../hooks/useStandardWallet';
import OfferBuilderSection from './OfferBuilderSection';
import OfferBuilderWalletAmount from './OfferBuilderWalletAmount';

export type OfferBuilderXSEASectionProps = {
  name: string;
  offering?: boolean;
  muted?: boolean;
};

export default function OfferBuilderXSEASection(props: OfferBuilderXSEASectionProps) {
  const { name, offering, muted = false } = props;
  const { wallet, loading: isLoadingWallet } = useStandardWallet();
  const currencyCode = useCurrencyCode();
  const { fields, append, remove } = useFieldArray({
    name,
  });
  const amount =
    useWatch({
      name,
    })?.[0]?.amount ?? 0; // Assume there's only 1 XSEA field per trade side
  const { requestedRoyalties, offeredRoyalties, isCalculatingRoyalties } = useOfferBuilderContext();

  // Yes, this is correct. Fungible (XSEA) assets used to pay royalties are from the opposite side of the trade.
  const allRoyalties = offering ? requestedRoyalties : offeredRoyalties;

  const loading = isLoadingWallet || isCalculatingRoyalties;

  const [amountWithRoyalties, royaltyPayments] = useMemo(() => {
    if (!allRoyalties) {
      return [];
    }

    let amountWithRoyaltiesLocal = seaToMojo(amount);
    const rows: Record<string, any>[] = [];
    Object.entries(allRoyalties).forEach(([nftId, royaltyPaymentsLocal]) => {
      const matchingPayment = royaltyPaymentsLocal?.find((payment) => payment.asset === 'xsea');
      if (matchingPayment) {
        amountWithRoyaltiesLocal = amountWithRoyaltiesLocal.plus(matchingPayment.amount);
        rows.push({
          nftId,
          payment: {
            ...matchingPayment,
            displayAmount: mojoToSeaLocaleString(matchingPayment.amount),
          },
        });
      }
    });

    return [mojoToSeaLocaleString(amountWithRoyaltiesLocal), rows];
  }, [allRoyalties, amount]);

  function handleAdd() {
    if (!fields.length) {
      append({
        amount: '',
      });
    }
  }

  function handleRemove(index: number) {
    remove(index);
  }

  return (
    <OfferBuilderSection
      icon={<Farming color="info" />}
      title={currencyCode}
      subtitle={<Trans>Sea ({currencyCode}) is a digital currency that is secure and sustainable</Trans>}
      onAdd={!fields.length ? handleAdd : undefined}
      expanded={!!fields.length}
      muted={muted}
    >
      {loading ? (
        <Loading />
      ) : (
        fields.map((field, index) => (
          <OfferBuilderWalletAmount
            key={field.id}
            walletId={wallet.id}
            name={`${name}.${index}.amount`}
            onRemove={() => handleRemove(index)}
            hideBalance={!offering}
            amountWithRoyalties={amountWithRoyalties}
            royaltyPayments={royaltyPayments}
          />
        ))
      )}
    </OfferBuilderSection>
  );
}
