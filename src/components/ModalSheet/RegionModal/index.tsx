import { css, styled } from 'styled-components';
import Header from './Header';
import Icons from '@design/Icons';

const RegionModal: React.FC = () => {
  return (
    <>
      <Header />
      <Message>
        지역은 최소 1개,
        <br />
        최대 2개까지 설정 가능해요.
      </Message>
      <form method="dialog">
        <RegionList>
          <ListItem>
            <Region>
              <span>역삼 1동</span>
              <Delete>
                <span className="blind">제거</span>
                <Icons.CircleXFilled />
              </Delete>
            </Region>
          </ListItem>
          <ListItem>
            <AddRegion>
              <Icons.Plus />
              <span>추가</span>
            </AddRegion>
          </ListItem>
        </RegionList>
      </form>
    </>
  );
};

const Message = styled.p`
  text-align: center;
  padding: 40px 0;
  ${({ theme }) => theme.fonts.display.default12}
`;

const RegionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
`;

const Region = styled.div`
  ${({ theme: { fonts, colors, radius } }) => css`
    border-radius: ${radius.medium};
    background-color: ${colors.accent.primary};
    display: flex;
    box-sizing: border-box;
    padding: 0 24px;
    justify-content: space-between;
    color: ${colors.accent.text};
    ${fonts.available.strong16}
    align-items: center;
    width: 100%;
  `}
`;

const Delete = styled.button`
  ${({ theme: { colors } }) => css`
    fill: ${colors.accent.text};
    stroke: ${colors.accent.text};
  `}
  line-height: 0;
`;

const AddRegion = styled.button`
  ${({ theme: { fonts, colors, radius } }) => css`
    width: 100%;
    height: 100%;
    stroke: ${colors.neutral.text};
    border-radius: ${radius.medium};
    border: 0.8px solid ${colors.neutral.border};
    ${fonts.available.strong16}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `}
`;

export default RegionModal;
