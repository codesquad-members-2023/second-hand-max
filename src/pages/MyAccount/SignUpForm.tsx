import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@components/Button';
import Field from '@components/Field';
import Icons from '@design/Icons';
import TopBar from '@components/TopBar';
import ProfileImageButton from '@components/ProfileImageButton';
import PATH from '@constants/PATH';
import { signUpUser } from 'apis/fetchApi';

const SignUpForm: React.FC = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const onIdChange = (id: string) => {
    setId(id);
  };

  const onSignUpSubmit = async () => {
    const type = 'sign-up';
    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${type}`;

    window.open(oauthUrl, '_blank', 'popup');
    window.addEventListener('message', onMessageReceive);
  };

  const onMessageReceive = async ({ origin, data }: MessageEvent) => {
    const isSameOrigin = origin === window.location.origin;
    const { status } = data;

    if (!isSameOrigin || status === 'error') {
      throw new Error('비정상적인 접근입니다.');
    }

    const { type, code } = data;

    if (type === 'sign-up') {
      const data = await signUpUser(code, id);
      alert(data.message);
      navigate(`/${PATH.MY_ACCOUNT}`);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('message', onMessageReceive);
    };
  }, []);

  return (
    <ColumnLayout>
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
        <Button $flexible="Flexible" $type="Ghost" onClick={onSignUpSubmit}>
          완료
        </Button>
      </Title>

      <Form>
        <ProfileImageButton />

        <Field>
          <Field.Label id="id" text="아이디" />
          <Field.Input
            id="id"
            name="id"
            placeholder="내용을 입력하세요"
            value={id}
            onChange={({ target }) => {
              onIdChange(target.value);
            }}
          />
        </Field>

        <Button className="add-region-button" $flexible="Fixed" $type="Outline">
          <Icons.Plus />
          <span>위치 추가</span>
        </Button>
      </Form>
    </ColumnLayout>
  );
};

const ColumnLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(TopBar)`
  justify-content: space-between;
  ${({ theme: { fonts } }) => css`
    ${fonts.display.strong16};

    button {
      ${fonts.available.strong16};
    }
  `};
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .add-region-button {
    ${({ theme: { fonts, colors } }) => css`
      width: 100%;
      stroke: ${colors.neutral.textStrong};
      ${fonts.available.strong16};
    `};
  }
`;

export default SignUpForm;
