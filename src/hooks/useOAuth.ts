import { useNavigate } from 'react-router-dom';
import PATH from '@constants/PATH';
import { signInUser, signUpUser } from 'apis/auth';
import { useUserStore } from 'stores/useUserStore';
import { useEffect, useRef, useState } from 'react';
import { ERROR_MESSAGE } from '@constants/ERROR_MESSAGE';

type Action = 'sign-up' | 'sign-in';

type MessageData = {
  status: string;
  action: Action;
  code: string;
};

type InitOAuthParams = {
  action: Action;
  id: string;
  file?: File;
  addressIds?: number[];
};

export type InitOAuthType = (params: InitOAuthParams) => void;

type AuthState = {
  id: string;
  file?: File;
  addressIds?: number[];
};

const useOAuth = () => {
  const [authState, setAuthState] = useState<AuthState>();
  const navigate = useNavigate();
  const setUserAuth = useUserStore(({ setUserAuth }) => setUserAuth);
  const setCurrentRegion = useUserStore(
    ({ setCurrentRegion }) => setCurrentRegion,
  );
  const oauthWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    const onMessageReceive = ({ origin, data }: MessageEvent<MessageData>) => {
      const isSameOrigin = origin === window.location.origin;
      const { action, code } = data;

      if (isSameOrigin && action && code) {
        actionHandlerMap[action](code);
      }
    };

    window.addEventListener('message', onMessageReceive, { once: true });

    return () => {
      window.removeEventListener('message', onMessageReceive);
    };
  }, [authState]);

  const onSignIn = async (code: string) => {
    const userData = await signInUser({ code, id: authState!.id });
    const isSuccess = userData.statusCode === 200;

    if (isSuccess) {
      const { jwt: tokens, user } = userData.data;
      const currentRegion = user.addresses.find(
        (address) => address.isSelected,
      );

      setUserAuth({ user, tokens });
      setCurrentRegion(currentRegion!);
      navigate(`${PATH.BASE}`);
    }

    alert(userData.message);
  };

  const onSignUp = async (code: string) => {
    if (!authState?.addressIds) {
      alert(ERROR_MESSAGE.REQUEST_REFRESH);
      return;
    }

    const userData = await signUpUser({
      code,
      id: authState.id,
      file: authState.file,
      addressIds: authState.addressIds,
    });
    const isSuccess = userData.statusCode === 201;

    if (isSuccess) {
      navigate(`/${PATH.MY_ACCOUNT}`);
    }

    alert(userData.message);
  };

  const actionHandlerMap: Record<Action, (code: string) => Promise<void>> = {
    'sign-up': onSignUp,
    'sign-in': onSignIn,
  };

  const initOAuth = ({ action, id, file, addressIds }: InitOAuthParams) => {
    setAuthState({ id, file, addressIds });

    // 이미 oauth 팝업이 떠 있는 경우
    if (oauthWindowRef.current && !oauthWindowRef.current.closed) {
      oauthWindowRef.current.focus();
      return;
    }

    const oauthUrl = `${import.meta.env.VITE_APP_OAUTH_URL}&state=${action}`;
    oauthWindowRef.current = window.open(oauthUrl, '_blank', 'popup');
  };

  return { initOAuth };
};

export default useOAuth;
