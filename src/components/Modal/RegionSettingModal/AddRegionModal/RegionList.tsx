import Button from '@components/Button';
import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { GetRegionsResponse } from 'apis/region/types';
import { css, styled } from 'styled-components';
import { Address } from 'types/region';

type Props = {
  regions?: InfiniteData<GetRegionsResponse>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<GetRegionsResponse, unknown>>;
  onClick: (address: Address) => void;
};

export const RegionList: React.FC<Props> = ({
  regions,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onClick,
}) => {
  return (
    <Regions>
      {regions &&
        regions.pages.map((page) =>
          page.data.contents.map((region) => (
            <Region key={region.addressId}>
              <RegionButton onClick={() => onClick(region)}>
                {region.fullAddressName}
              </RegionButton>
            </Region>
          )),
        )}
      <InfiniteScrollTrigger
        {...{ hasNextPage, isFetchingNextPage, fetchNextPage }}
      />
    </Regions>
  );
};

const Regions = styled.ul`
  padding: 0 24px;
  flex-grow: 1;
  overflow: scroll;
`;

const Region = styled.li`
  ${({ theme: { colors } }) => css`
    &:not(:last-child) {
      border-bottom: 0.8px solid ${colors.neutral.border};
    }
  `}
`;

const RegionButton = styled(Button)`
  ${({ theme: { fonts, colors } }) => css`
    width: 100%;
    padding: 16px 0;
    justify-content: start;

    ${fonts.available.default16};
    color: ${colors.neutral.text};
  `}
`;
