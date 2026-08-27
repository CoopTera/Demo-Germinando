import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';

try {
  console.log(renderToString(<App />));
} catch (e) {
  console.error("ERROR:", e);
}
