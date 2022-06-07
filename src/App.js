import React from 'react'
import Home from './components/home/Wrapper';
import Brand from './components/brand/Wrapper';
import Influencer from './components/influencer/Wrapper';
import ScrollToTop from '../src/scrollToTop';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path="influencer" element={<Influencer />} />
      <Route path="brand" element={<Brand />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
