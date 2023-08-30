import { styled } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import PATH from '@constants/PATH';
import TopBar from '@components/TopBar';
import Profile from './Profile';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const MyAccount: React.FC = () => {
  const isLogin = Boolean(localStorage.getItem('accessToken'));

  return (
    <>
      <Title aria-label="내 계정">내 계정</Title>
      <Contents>
        <Routes>
          <Route index element={isLogin ? <Profile /> : <SignInForm />} />
          <Route path={PATH.SIGN_UP} element={<SignUpForm />} />
        </Routes>
      </Contents>
    </>
  );
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme: { dimensions } }) => dimensions.topBarHeight} 32px 0;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MyAccount;
