export const BASE_URL: string =
  process.env.NODE_ENV !== 'development'
    ? import.meta.env.VITE_APP_BASE_URL
    : '';
