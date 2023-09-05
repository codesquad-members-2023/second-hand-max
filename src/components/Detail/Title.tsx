import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

const Title: React.FC = () => {
  return (
    <Container>
      <button>
        <Icons.ChevronLeft />
        <span>닫기</span>
      </button>
    </Container>
  );
};

const Container = styled.h1`
  ${({ theme: { dimensions, fonts } }) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: ${dimensions.topBarHeight};
    width: 100%;
    position: absolute;
    top: 0;
    background: black;
    mix-blend-mode: difference;
    & > button {
      display: flex;
      align-items: center;
      padding: 8px;
      & > svg {
        stroke: white;
      }
      & > span {
        color: white;
        ${fonts.available.strong16}
        padding: 0 8px;
      }
    }
  `}
`;

export default Title;
