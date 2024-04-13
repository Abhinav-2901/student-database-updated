// src/utils/authUtils.js

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false; // Token does not exist
  }

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const { exp } = decodedToken; // Expiry time in seconds
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime < exp; // Return true if current time is less than expiry time
  } catch (error) {
    console.error('Error decoding or validating token:', error);
    return false; // Error occurred while decoding or validating token
  }
};
