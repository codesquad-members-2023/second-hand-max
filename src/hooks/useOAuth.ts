import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PATH from '@constants/PATH';
import { signInUser, signUpUser } from 'apis/fetchApi';

type Action = 'sign-up' | 'sign-in';

const useOAuth = (action: Action, id: string, file?: File) => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      window.removeEventListener('message', onMessageReceive);
    };
  }, []);

  const initOAuth = () => {
    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${action}`;

    window.open(oauthUrl, '_blank', 'popup');
    window.addEventListener('message', onMessageReceive, { once: true });
  };

  const onMessageReceive = ({ origin, data }: MessageEvent) => {
    const isSameOrigin = origin === window.location.origin;
    const { status, code } = data;

    if (!isSameOrigin || status === 'error') {
      throw new Error('비정상적인 접근입니다.');
    }

    onAuth(code);
  };

  const onAuth = async (code: string) => {
    const userData = await (action === 'sign-in'
      ? signInUser(code, id)
      : signUpUser(code, id, file));

    alert(userData.message);
    navigate(`/${PATH.MY_ACCOUNT}`);
  };

  return { initOAuth };
};

export default useOAuth;
