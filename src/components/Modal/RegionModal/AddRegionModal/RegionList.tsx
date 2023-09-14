import Button from '@components/Button';
import { css, styled } from 'styled-components';
import { Address } from 'types/region';

type Props = {
  onClick: (address: Address) => void;
};

export const RegionList: React.FC<Props> = ({ onClick }) => {
  const dummys: Address[] = [
    {
      addressId: 1,
      fullAddressName: '부천시 소사구 괴안동',
      addressName: '괴안동',
    },
    {
      addressId: 2,
      fullAddressName: '부천시 소사구 범박동',
      addressName: '범박동',
    },
    {
      addressId: 3,
      fullAddressName: '부천시 소사구 옥길동',
      addressName: '옥길동',
    },
  ];

  return (
    <Regions>
      {dummys.map((region) => (
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
