import React from 'react';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
 

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') ||
    location.pathname.includes('signup');
    return (
        <div>
            
        { noHeaderFooter || <Navbar /> }   

        <Outlet/>          

        { noHeaderFooter || <Footer/> }   
      
            
        </div>
    );
};

export default Main;