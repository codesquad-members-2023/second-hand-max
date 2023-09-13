import Button from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

type Props = {
  onAddRegionModalOpen: () => void;
};

export const RegionModalContent: React.FC<Props> = ({
  onAddRegionModalOpen,
}) => {
  return (
    <Content>
      <Notice>
        지역은 최소 1개,
        <br />
        최대 2개까지 설정 가능해요.
      </Notice>
      <Regions>
        <Region>
          <span>역삼 1동</span>
          <DeleteButton>
            <Icons.CircleXFilled />
          </DeleteButton>
        </Region>
        <AddRegion onClick={onAddRegionModalOpen}>
          <Icons.Plus />
          <span>추가</span>
        </AddRegion>
      </Regions>
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

const Regions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Region = styled.li`
  ${({ theme: { fonts, colors, radius } }) => css`
    padding: 16px;
    border-radius: ${radius.medium};
    background-color: ${colors.accent.primary};
    box-sizing: border-box;
    color: ${colors.accent.text};
    ${fonts.available.strong16};
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      fill: ${colors.accent.text};
      stroke: ${colors.accent.text};
      cursor: pointer;
    }
  `}
`;

const DeleteButton = styled(Button)`
  padding: 0;
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
