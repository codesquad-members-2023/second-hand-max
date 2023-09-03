import { styled } from 'styled-components';

const FieldBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default FieldBody;
