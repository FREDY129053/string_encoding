import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstHWApp from './Huffman_Fano_HW/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstHWApp />
  </StrictMode>,
)
