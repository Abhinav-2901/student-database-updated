// Layout.js
import React from 'react';
import Navbar from './Navbar';

function Layout({ children, isAuthenticated }) {
  return (
    <div>
      {isAuthenticated && <Navbar />}
      <main>{children}</main>
    </div>
  );
}

export default Layout;
