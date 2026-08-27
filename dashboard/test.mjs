import * as esbuild from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';

async function run() {
  await esbuild.build({
    entryPoints: ['src/pages/OportunidadesPage.jsx'],
    bundle: true,
    format: 'cjs',
    outfile: 'temp.cjs',
    external: ['react', 'react-dom/server', 'lucide-react', 'framer-motion', 'react-router-dom']
  });

  const mod = await import('./temp.cjs');
  console.log("mod keys:", Object.keys(mod), "default type:", typeof mod.default);
  const OportunidadesPage = typeof mod.default === 'function' ? mod.default : mod.default.default;
  console.log("Type of OportunidadesPage:", typeof OportunidadesPage);
  try {
    const html = renderToString(React.createElement(OportunidadesPage));
    console.log('SUCCESS, length:', html.length);
  } catch(e) {
    console.error('CRASH:', e);
  }
}
run();
