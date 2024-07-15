import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { Toaster } from './components/ui/toaster.tsx';
import './index.css';
import { Router } from './router/Router.tsx';
import store from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
