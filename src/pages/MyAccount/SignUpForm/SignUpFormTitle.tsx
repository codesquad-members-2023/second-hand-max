import Button from '@components/Button';
import TopBar from '@components/TopBar';
import PATH from '@constants/PATH';
import { InitOAuthType } from '@hooks/useOAuth';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

type Props = {
  id: string;
  file?: File;
  initOAuth: InitOAuthType;
};

export const SignUpFormTitle: React.FC<Props> = ({ id, file, initOAuth }) => {
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
        disabled={!id}
        onClick={() => {
          initOAuth({ action: 'sign-up', id, file });
        }}
      >
        완료
      </Button>
    </Title>
  );
};

const Title = styled(TopBar)`
  justify-content: space-between;
  ${({ theme: { fonts } }) => css`
    ${fonts.display.strong16};

    button {
      ${fonts.available.strong16};
    }
  `};
`;
