import { styled } from 'styled-components';
import TopBar from '@components/TopBar';
import { Routes, Link, Route, Outlet } from 'react-router-dom';
import PATH from '@constants/PATH';

const MyAccount: React.FC = () => {
  return (
    <>
      <Title aria-label="내 계정">내 계정</Title>
      <Container>
        <Routes>
          <Route path="" element={<Inner />}>
            <Route
              path=""
              element={
                localStorage.getItem('accessToken') ? (
                  <article>
                    <h2 className="blind">프로필</h2>
                    {/* 프로필 */}
                  </article>
                ) : (
                  <form>
                    <fieldset>
                      <legend>아이디</legend>
                      <input type="text" id="name" />
                    </fieldset>
                    <button type="submit">로그인</button>
                    <Link to={PATH.SIGN_UP}>회원가입</Link>
                  </form>
                )
              }
            />
            <Route
              path={PATH.SIGN_UP}
              element={
                <form>
                  <fieldset>
                    <legend>아이디</legend>
                    <input type="text" id="name" />
                  </fieldset>
                </form>
              }
            />
          </Route>
        </Routes>
      </Container>
    </>
  );
};

const Inner: React.FC = () => {
  return <Outlet />;
};

const Title = styled(TopBar)`
  justify-content: center;
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

const Container = styled.div`
  height: 100%;
  padding-top: ${({ theme: { dimensions } }) => dimensions.topBarHeight};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MyAccount;
