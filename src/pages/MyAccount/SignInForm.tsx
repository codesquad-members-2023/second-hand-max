import Field from '@components/Field';
import PATH from '@constants/PATH';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const SignInForm: React.FC = () => {
  return (
    <Container>
      <Field>
        <Field.Label id="id" text="아이디" />
        <Field.Input id="id" name="id" placeholder="내용을 입력하세요" />
      </Field>

      {/* <input type="text" id="name" /> */}

      <button type="submit">로그인</button>
      <Link to={PATH.SIGN_UP}>회원가입</Link>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
`;

export default SignInForm;
