import React from 'react';
import ReactDOM from 'react-dom/client';
import WhyMizuhaApp from './WhyMizuhaApp';
import '../styles/main.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<WhyMizuhaApp initialSection="product" />);
}

