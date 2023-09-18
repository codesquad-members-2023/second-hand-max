import { useNavigate } from 'react-router-dom';
import PATH from '@constants/PATH';
import { signInUser, signUpUser } from 'apis/auth';
import { useUserStore } from 'stores/useUserStore';
import { ERROR_MESSAGE } from '@constants/ERROR_MESSAGE';
import { useRef } from 'react';

type Action = 'sign-up' | 'sign-in';

type InitOAuthParams = {
  action: Action;
  id: string;
  file?: File;
  addressIds?: number[];
};

export type InitOAuthType = (params: InitOAuthParams) => void;

const useOAuth = () => {
  const navigate = useNavigate();
  const setUserAuth = useUserStore(({ setUserAuth }) => setUserAuth);
  const oauthWindowRef = useRef<Window | null>(null);

  const onSignIn = async ({ code, id }: { code: string; id: string }) => {
    const userData = await signInUser({ code, id });
    const isSuccess = userData.statusCode === 200;

    if (isSuccess) {
      const { jwt: tokens, user } = userData.data;
      setUserAuth({ user, tokens });

      navigate(`${PATH.BASE}`);
    }

    alert(userData.message);
  };

  const onSignUp = async ({
    code,
    id,
    file,
    addressIds,
  }: {
    code: string;
    id: string;
    file?: File;
    addressIds?: number[];
  }) => {
    const userData = await signUpUser({
      code,
      id,
      file,
      addressIds: addressIds!,
    });
    const isSuccess = userData.statusCode === 201;

    if (isSuccess) {
      navigate(`/${PATH.MY_ACCOUNT}`);
    }

    alert(userData.message);
  };

  const actionHandlerMap: Record<
    Action,
    (params: {
      code: string;
      id: string;
      file?: File;
      addressIds?: number[];
    }) => void
  > = {
    'sign-up': (params) => onSignUp(params),
    'sign-in': ({ code, id }) => onSignIn({ code, id }),
  };

  const initOAuth = ({ action, id, file, addressIds }: InitOAuthParams) => {
    const onMessageReceive = ({ origin, data }: MessageEvent) => {
      try {
        const isSameOrigin = origin === window.location.origin;
        const { status, code } = data;

        if (!isSameOrigin || status === 'error' || !id) {
          throw new Error(ERROR_MESSAGE.INVALID_ACCESS);
        }

        actionHandlerMap[action]({ code, id, file, addressIds });
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };

    // 이미 oauth 팝업이 떠 있는 경우
    if (oauthWindowRef.current && !oauthWindowRef.current.closed) {
      oauthWindowRef.current.focus();
      return;
    }

    window.removeEventListener('message', onMessageReceive);
    window.addEventListener('message', onMessageReceive, { once: true });

    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${action}`;
    oauthWindowRef.current = window.open(oauthUrl, '_blank', 'popup');
  };

  return { initOAuth };
};

export default useOAuth;
