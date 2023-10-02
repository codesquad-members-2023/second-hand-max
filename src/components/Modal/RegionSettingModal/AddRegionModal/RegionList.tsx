import Button from '@components/Button';
import { InfiniteScrollTrigger } from '@components/InfiniteScrollTrigger';
import { useFlattenPages } from '@hooks/useFlattenPages';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { css, styled } from 'styled-components';
import { Address } from 'types/region';

type Props = {
  regionQueryResult: UseInfiniteQueryResult<Address[], unknown>;
  onRegionSelect: (address: Address) => void;
};

export const RegionList: React.FC<Props> = ({
  regionQueryResult,
  onRegionSelect,
}) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    regionQueryResult;
  const regions = useFlattenPages(data);

  return (
    <Regions>
      {regions.map((region) => (
        <Region key={region.addressId}>
          <RegionButton onClick={() => onRegionSelect(region)}>
            {region.fullAddressName}
          </RegionButton>
        </Region>
      ))}
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
