// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(path, options);
  // const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }
};

export const signUpUser = (code: string, id: string) => {
  return fetchData(`/auth/naver/signup?code=${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId: id,
      addrName: '가락 1동',
    }),
  });
};

export const signInUser = (code: string, id: string) => {
  return fetchData(`/auth/naver/login?code=${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loginId: id,
    }),
  });
};

export const signOutUser = () => {
  return fetchData('/auth/logout');
};

export const getRegions = () => {
  return fetchData('/auth/regions');
};
