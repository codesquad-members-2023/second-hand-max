const OAuthLoadingPage: React.FC = () => {
  const search = new URLSearchParams(window.location.search);

  const code = search.get('code');
  const action = search.get('state');

  window.opener.postMessage({ action, code }, window.location.origin);
  window.close();

  return <div>리다이렉트 중...</div>;
};

export default OAuthLoadingPage;
