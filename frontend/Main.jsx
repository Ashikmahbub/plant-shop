import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './src/components/layout/Navbar';
import Footer from './src/components/layout/Footer';

const Main = () => {
  const location = useLocation();
  
  const hideLayout = location.pathname.includes('login') || 
                     location.pathname.includes('signup');

  return (
    <div>
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Main;