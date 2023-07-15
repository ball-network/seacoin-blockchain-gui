import BigNumber from 'bignumber.js';
import React from 'react';

import useCurrencyCode from '../../hooks/useCurrencyCode';
import mojoToSea from '../../utils/mojoToSeaLocaleString';
import FormatLargeNumber from '../FormatLargeNumber';

export type MojoToSeaProps = {
  value: number | BigNumber;
};

export default function MojoToSea(props: MojoToSeaProps) {
  const { value } = props;
  const currencyCode = useCurrencyCode();
  const updatedValue = mojoToSea(value);

  return (
    <>
      <FormatLargeNumber value={updatedValue} />
      &nbsp;{currencyCode ?? ''}
    </>
  );
}
