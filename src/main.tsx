import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstHWApp from './Huffman_Fano_HW/App';
import CiphersHWApp from './Ciphers_HW/App';
import NotFoundPage from './404';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/string_encoding" element={<FirstHWApp />} />
        <Route path="/ciphers" element={<CiphersHWApp />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Страница 404 */}
      </Routes>
    </Router>
  </StrictMode>,
);