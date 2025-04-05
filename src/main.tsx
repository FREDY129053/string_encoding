import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import FirstHWApp from './Huffman_Fano_HW/App';
// import CiphersHWApp from './Ciphers_HW/App';
// import NotFoundPage from './404';
import React from 'react';

const FirstHW = () => import('./Huffman_Fano_HW/App');
const CiphersHW = () => import('./Ciphers_HW/App');
const NotFound = () => import('./404');
const FirstHWAppl = React.lazy(FirstHW);
const CiphersHWAppl = React.lazy(CiphersHW);
const NotFoundPagel = React.lazy(NotFound);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/string_encoding" element={<FirstHWAppl />} />
        <Route path="/ciphers" element={<CiphersHWAppl />} />
        <Route path="*" element={<NotFoundPagel />} />
        {/* <Route path="/string_encoding" element={<FirstHWApp />} />
        <Route path="/ciphers" element={<CiphersHWApp />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
);