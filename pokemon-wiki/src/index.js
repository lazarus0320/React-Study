import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
reportWebVitals();
