// Environment configuration
const getAPIUrl = () => {
  // In production, API is served from same origin (backend serves frontend)
  if (import.meta.env.PROD) {
    return ''; // Same origin - backend serves the static files
  }
  // In development, use localhost backend
  return 'http://localhost:5000';
};

export const API_URL = getAPIUrl();
export const COCKTAIL_API_URL = `${API_URL}/api/cocktails`;
