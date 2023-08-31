import { useState } from 'react';
import { css, styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@components/Button';
import Field from '@components/Field';
import PATH from '@constants/PATH';
import { signInUser } from 'apis/fetchApi';

const SignInForm: React.FC = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const onChangeId = (id: string) => {
    setId(id);
  };

  const onSignIn = async () => {
    const data = await signInUser(id, 'token');

    alert(data.message);
    navigate(PATH.BASE);
  };

  return (
    <ColumnLayout>
      <LoginForm
        onSubmit={(event) => {
          event.preventDefault();

          onSignIn();
        }}
      >
        <Field>
          <Field.Label id="id" text="아이디" />
          <Field.Input
            id="id"
            name="id"
            placeholder="내용을 입력하세요"
            onChange={({ target }) => {
              onChangeId(target.value);
            }}
          />
        </Field>

        <Button className="login-button" $flexible="Fixed" $type="Contained">
          로그인
        </Button>
      </LoginForm>

      <Link to={PATH.SIGN_UP}>
        <Button className="sign-up-button" $flexible="Flexible" $type="Ghost">
          회원가입
        </Button>
      </Link>
    </ColumnLayout>
  );
};

const ColumnLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sign-up-button {
    ${({ theme: { fonts, colors } }) => css`
      ${fonts.available.strong12};
      color: ${colors.neutral.text};
    `};
  }
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .login-button {
    width: 100%;
    ${({ theme: { fonts } }) => fonts.available.strong16};
  }
`;

export default SignInForm;
