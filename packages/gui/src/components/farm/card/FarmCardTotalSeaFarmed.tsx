import { useGetFarmedAmountQuery } from '@sea-network/api-react';
import { useCurrencyCode, mojoToSeaLocaleString, CardSimple, useLocale } from '@sea-network/core';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';

export default function FarmCardTotalSeaFarmed() {
  const currencyCode = useCurrencyCode();
  const [locale] = useLocale();
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalSeaFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {mojoToSeaLocaleString(farmedAmount, locale)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
    return undefined;
  }, [farmedAmount, locale, currencyCode]);

  return (
    <CardSimple title={<Trans>Total Sea Farmed</Trans>} value={totalSeaFarmed} loading={isLoading} error={error} />
  );
}
