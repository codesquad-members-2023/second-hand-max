const BASE_URL: string =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_APP_BASE_URL
    : '';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }
};

export const signUpUser = (code: string, id: string, file?: File) => {
  const formData = new FormData();

  if (file) {
    formData.append('profile', file);
  }

  const data = JSON.stringify({ loginId: id, addressNames: ['가락 1동'] });
  formData.append('signupData', new Blob([data], { type: 'application/json' }));

  return fetchData(`/auth/naver/signup?code=${code}`, {
    method: 'POST',
    body: formData,
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
