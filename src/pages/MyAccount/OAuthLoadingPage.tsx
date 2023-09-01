const OAuthLoadingPage: React.FC = () => {
  const search = new URLSearchParams(window.location.search);

  if (!search.has('code') || !search.has('state')) {
    window.opener.postMessage(
      {
        status: 'error',
        message: '비정상적인 접근입니다.',
      },
      window.location.origin,
    );

    window.close();

    return;
  }

  const code = search.get('code');
  const action = search.get('state');

  window.opener.postMessage(
    {
      status: 'success',
      action,
      code,
    },
    window.location.origin,
  );

  window.close();

  return <div>리다이렉트 중...</div>;
};

export default OAuthLoadingPage;
