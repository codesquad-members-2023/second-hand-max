import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/PATH';
import { signInUser, signUpUser } from 'apis/fetchApi';

type Action = 'sign-up' | 'sign-in';

const useOAuth = (action: Action, id: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      window.removeEventListener('message', onMessageReceive);
    };
  }, []);

  const initOAuth = () => {
    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${action}`;

    window.open(oauthUrl, '_blank', 'popup');
    window.addEventListener('message', onMessageReceive);
  };

  const onMessageReceive = ({ origin, data }: MessageEvent) => {
    const isSameOrigin = origin === window.location.origin;
    const { status } = data;

    if (!isSameOrigin || status === 'error') {
      throw new Error('비정상적인 접근입니다.');
    }

    const { action, code } = data;

    if (action === 'sign-up' || action === 'sign-in') {
      onAuth(code, id, action);
    }
  };

  const onAuth = async (code: string, id: string, action: Action) => {
    const userData = await (action === 'sign-in' ? signInUser : signUpUser)(
      code,
      id,
    );

    alert(userData.message);
    navigate(`/${PATH.MY_ACCOUNT}`);
  };

  return { initOAuth };
};

export default useOAuth;
