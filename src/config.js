// Environment configuration
const getAPIUrl = () => {
  // In production, API is served from same origin
  if (import.meta.env.PROD) {
    return '';
  }
  // In development, use localhost
  return 'http://localhost:5000';
};

export const API_URL = getAPIUrl();
export const COCKTAIL_API_URL = `${API_URL}/api/cocktails`;
