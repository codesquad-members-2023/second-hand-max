import Button from '@components/Button';
import { css, styled } from 'styled-components';
import { Address } from 'types/region';

type Props = {
  regions?: Address[];
  onClick: (address: Address) => void;
};

export const RegionList: React.FC<Props> = ({ regions, onClick }) => {
  return (
    <Regions>
      {regions?.map((region) => (
        <Region key={region.addressId}>
          <RegionButton onClick={() => onClick(region)}>
            {region.fullAddressName}
          </RegionButton>
        </Region>
      ))}
    </Regions>
  );
};

const Regions = styled.ul`
  padding: 0 24px;
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
