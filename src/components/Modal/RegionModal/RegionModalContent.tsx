import Button from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';
import { AddedRegionItem } from '../AddedRegionBox';

export const RegionModalContent: React.FC = () => {
  return (
    <Content>
      <Notice>
        지역은 최소 1개,
        <br />
        최대 2개까지 설정 가능해요.
      </Notice>
      <AddedRegions>
        <AddedRegionItem />
        <AddRegion onClick={() => {}}>
          <Icons.Plus />
          <span>추가</span>
        </AddRegion>
      </AddedRegions>
    </Content>
  );
};

const Content = styled.div`
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Notice = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.default12};
    color: ${colors.neutral.text};
    text-align: center;
  `}
`;

const AddedRegions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddRegion = styled(Button)`
  ${({ theme: { fonts, colors, radius } }) => css`
    width: 100%;
    height: 100%;
    border-radius: ${radius.medium};
    border: 0.8px solid ${colors.neutral.border};
    padding: 16px;
    ${fonts.available.strong16};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    stroke: ${colors.neutral.text};
  `}
`;
