import type { Wallet } from '@sea-network/api';
import { WalletType } from '@sea-network/api';
import { useGetCatListQuery } from '@sea-network/api-react';
import { Tooltip } from '@sea-network/core';
import { Trans } from '@lingui/macro';
import { VerifiedUser as VerifiedUserIcon, VerifiedUserProps } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';

const StyledSmallBadge = styled(VerifiedUserIcon)`
  font-size: 1rem;
`;

type Props = VerifiedUserProps & {
  wallet: Wallet;
};

export default function WalletBadge(props: Props) {
  const { wallet, tooltip, ...rest } = props;
  const { data: catList = [], isLoading } = useGetCatListQuery();

  if (!isLoading && wallet.type === WalletType.CAT) {
    const token = catList.find((tokenItem) => tokenItem.assetId === wallet.meta?.assetId);
    if (token) {
      return (
        <Tooltip title={<Trans>This access token is verified</Trans>}>
          <StyledSmallBadge {...rest} />
        </Tooltip>
      );
    }
  }

  return null;
}
