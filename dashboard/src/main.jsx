import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import OrganizacionesPage from './pages/OrganizacionesPage';
import BeneficiariosPage from './pages/BeneficiariosPage';
import GraficosPage from './pages/GraficosPage';
import GrafoPage from './pages/GrafoPage';
import ProfilePage from './pages/ProfilePage';
import OportunidadesPage from './pages/OportunidadesPage';
import ConveniosPage from './pages/ConveniosPage';
import TalleresPage from './pages/TalleresPage';
import ArticulacionesPage from './pages/ArticulacionesPage';
import { DataProvider } from './context/DataContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="organizaciones" element={<OrganizacionesPage />} />
            <Route path="beneficiarios" element={<BeneficiariosPage />} />
            <Route path="oportunidades" element={<OportunidadesPage />} />
            <Route path="convenios" element={<ConveniosPage />} />
            <Route path="talleres" element={<TalleresPage />} />
            <Route path="articulaciones" element={<ArticulacionesPage />} />
            <Route path="graficos" element={<GraficosPage />} />
            <Route path="grafo" element={<GrafoPage />} />
            <Route path="perfil" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </StrictMode>,
);
