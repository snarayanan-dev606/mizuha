import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactApp from './ContactApp';
import '../styles/main.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<ContactApp />);
}

