export const getQueryString = (params: Record<string, string | number>) => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (key && value) {
      urlSearchParams.append(key, String(value));
    }
  });

  return urlSearchParams.toString();
};
