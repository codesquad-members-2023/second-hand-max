import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PATH from '@constants/PATH';
import { signInUser, signUpUser } from 'apis/fetchApi';

type Action = 'sign-up' | 'sign-in';

type InitOAuthParams = {
  action: Action;
  id: string;
  file?: File;
};

export type InitOAuthType = (params: InitOAuthParams) => void;

const useOAuth = () => {
  const actionRef = useRef<Action>();
  const idRef = useRef<string>();
  const fileRef = useRef<File>();
  const navigate = useNavigate();

  const onAuth = useCallback(
    async (code: string, id: string, file?: File) => {
      const isSignUpAction = actionRef.current === 'sign-up';
      const userData = await (isSignUpAction
        ? signUpUser({ code, id, file })
        : signInUser({ code, id }));

      alert(userData.message);

      if (isSignUpAction) {
        navigate(`/${PATH.MY_ACCOUNT}`);

        return;
      }

      navigate(`${PATH.BASE}`);
    },
    [navigate],
  );

  const onMessageReceive = useCallback(
    ({ origin, data }: MessageEvent) => {
      const isSameOrigin = origin === window.location.origin;
      const { status, code } = data;

      if (!isSameOrigin || status === 'error' || !idRef.current) {
        throw new Error('비정상적인 접근입니다.');
      }

      onAuth(code, idRef.current, fileRef.current);
    },
    [onAuth],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('message', onMessageReceive);
    };
  }, [onMessageReceive]);

  const initOAuth = ({ action, id, file }: InitOAuthParams) => {
    actionRef.current = action;
    idRef.current = id;
    fileRef.current = file;

    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${action}`;

    window.addEventListener('message', onMessageReceive, { once: true });
    window.open(oauthUrl, '_blank', 'popup');
  };

  return { initOAuth };
};

export default useOAuth;
