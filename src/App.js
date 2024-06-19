import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/footer';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Footer />
      </div>
    </Router>
  );
}

export default App;