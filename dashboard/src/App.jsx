import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import OrganizacionesPage from './pages/OrganizacionesPage';
import BeneficiariosPage from './pages/BeneficiariosPage';
import GraficosPage from './pages/GraficosPage';
import GrafoPage from './pages/GrafoPage';
import OportunidadesPage from './pages/OportunidadesPage';
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
            <Route path="/oportunidades" element={<OportunidadesPage />} />
            <Route path="/graficos" element={<GraficosPage />} />
            <Route path="/grafo" element={<GrafoPage />} />
            <Route path="*" element={<div style={{padding: '50px', background: 'blue', color: 'white'}}>404 ROUTE NOT MATCHED</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
