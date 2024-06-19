// Mainlayout Page 
import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/footer';
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;