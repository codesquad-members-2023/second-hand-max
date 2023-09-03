import { styled } from 'styled-components';

const Panel = styled.div`
  flex-grow: 1;
  height: ${({ theme: { dimensions } }) => dimensions.bottomBarHeight};
`;

export default Panel;
