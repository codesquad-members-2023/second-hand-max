import { useNavigate } from 'react-router-dom';
import PATH from '@constants/PATH';
import { useUserStore } from 'stores/useUserStore';
import { useTokenStore } from 'stores/useTokenStore';
import { signInUser, signUpUser } from 'apis/auth';

type Action = 'sign-up' | 'sign-in';

type InitOAuthParams = {
  action: Action;
  id: string;
  file?: File;
};

export type InitOAuthType = (params: InitOAuthParams) => void;

const useOAuth = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const tokenStore = useTokenStore();

  const initOAuth = ({ action, id, file }: InitOAuthParams) => {
    const onMessageReceive = ({ origin, data }: MessageEvent) => {
      const isSameOrigin = origin === window.location.origin;
      const { status, code } = data;

      if (!isSameOrigin || status === 'error' || !id) {
        throw new Error('비정상적인 접근입니다.');
      }

      if (action === 'sign-up') {
        onSignUp(code, id, file);

        return;
      }

      if (action === 'sign-in') {
        onSignIn(code, id);

        return;
      }
    };

    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${action}`;

    window.addEventListener('message', onMessageReceive, { once: true });
    window.open(oauthUrl, '_blank', 'popup');
  };

  const onSignIn = async (code: string, id: string) => {
    const userData = await signInUser({ code, id });
    const isSuccess = userData.statusCode === 200;

    if (isSuccess) {
      const { jwt: tokens, user } = userData.data;

      tokenStore.setTokens(tokens);
      userStore.setUser(user);

      navigate(`${PATH.BASE}`);
    }

    alert(userData.message);
  };

  const onSignUp = async (code: string, id: string, file?: File) => {
    const userData = await signUpUser({ code, id, file });
    const isSuccess = userData.statusCode === 201;

    if (isSuccess) {
      navigate(`/${PATH.MY_ACCOUNT}`);
    }

    alert(userData.message);
  };

  return { initOAuth };
};

export default useOAuth;
