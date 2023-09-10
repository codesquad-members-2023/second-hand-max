import { styled } from 'styled-components';

const ModalSheet: React.FC = () => {
  return <Container></Container>;
};

const Container = styled.dialog`
  position: absolute;
  top: 0;
  padding: 4px 24px;
  border: 0;
  box-sizing: border-box;
  & > form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 24px;
  }
`;

export default ModalSheet;
