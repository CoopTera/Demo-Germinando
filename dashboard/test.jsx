import { renderToString } from 'react-dom/server';
import React from 'react';
import OportunidadesPage from './src/pages/OportunidadesPage.jsx';

try {
  console.log(renderToString(<OportunidadesPage />));
} catch (e) {
  console.error("ERROR:", e);
}
