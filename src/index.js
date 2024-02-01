import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<ConfigProvider  direction="rtl">
    <App />
</ConfigProvider>
  </React.StrictMode>
);

// reportWebVitals();
