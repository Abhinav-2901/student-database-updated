import React from 'react';
import { isAuthenticated } from './authUtils'; // Importing the isAuthenticated function from authUtils

function ProtectedComponent() {
  // Check if the user is authenticated
  const authenticated = isAuthenticated();

  if (authenticated) {
    return <div>This is a protected component</div>;
  } else {
    return <div>You are not authenticated</div>;
  }
}

export default ProtectedComponent;
