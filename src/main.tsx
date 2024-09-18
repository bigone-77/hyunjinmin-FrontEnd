import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';

import App from '@/App.tsx';
import globalStyles from '@styles/globalStyles.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={globalStyles} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
