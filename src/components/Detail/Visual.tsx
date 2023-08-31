import { styled } from 'styled-components';

const Visual: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Container>
      <img src={url} alt="" />
      <figcaption className="blind">더미</figcaption>
    </Container>
  );
};

const Container = styled.figure`
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  max-height: 300px;
  margin-bottom: 16px;
  img {
    width: 100%;
  }
  
`;

export default Visual;
