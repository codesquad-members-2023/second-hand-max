import Button from '@components/Button';
import TopBar from '@components/TopBar';
import PATH from '@constants/PATH';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

type Props = {
  canSubmit: boolean;
  onSubmit: () => void;
};

export const SignUpFormTitle: React.FC<Props> = ({ canSubmit, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <Title aria-label="내 계정">
      <Button
        className="cancel-button"
        $flexible="Flexible"
        $type="Ghost"
        onClick={() => {
          navigate(`/${PATH.MY_ACCOUNT}`);
        }}
      >
        닫기
      </Button>
      <span>회원가입</span>
      <Button
        $flexible="Flexible"
        $type="Ghost"
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        완료
      </Button>
    </Title>
  );
};

const Title = styled(TopBar)`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.strong16};
    justify-content: space-between;
    background-color: ${colors.neutral.background};
    position: absolute;
    top: 0;
    overflow: hidden;

    button {
      ${fonts.available.strong16};
    }
  `};
`;
