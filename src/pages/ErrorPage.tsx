import Button from '@components/Button';
import styled, { css } from 'styled-components';

type Props = {
  onClick?: () => void;
};

export const ErrorPage: React.FC<Props> = ({
  onClick = () => location.reload(),
}) => {
  return (
    <Container>
      <div>데이터를 가져오지 못했습니다.</div>
      <div>재시도 하여주시기 바랍니다.</div>
      <Button $flexible="Flexible" $type="Contained" onClick={onClick}>
        <div>재시도</div>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    position: absolute;
    background-color: ${colors.neutral.background};
  `}
`;
