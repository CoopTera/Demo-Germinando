import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import OrganizacionesPage from './pages/OrganizacionesPage';
import BeneficiariosPage from './pages/BeneficiariosPage';
import ConveniosPage from './pages/ConveniosPage';
import TalleresPage from './pages/TalleresPage';
import ArticulacionesPage from './pages/ArticulacionesPage';
import GraficosPage from './pages/GraficosPage';
import OportunidadesPage from './pages/OportunidadesPage';
import PerfilPage from './pages/PerfilPage';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/organizaciones" element={<OrganizacionesPage />} />
            <Route path="/beneficiarios" element={<BeneficiariosPage />} />
            <Route path="/convenios" element={<ConveniosPage />} />
            <Route path="/talleres" element={<TalleresPage />} />
            <Route path="/articulaciones" element={<ArticulacionesPage />} />
            <Route path="/oportunidades" element={<OportunidadesPage />} />
            <Route path="/graficos" element={<GraficosPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/grafo" element={<Navigate to="/graficos" replace />} />
            <Route path="*" element={<div style={{padding: '50px', background: 'blue', color: 'white'}}>404 ROUTE NOT MATCHED</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
