import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import OrganizacionesPage from './pages/OrganizacionesPage';
import BeneficiariosPage from './pages/BeneficiariosPage';
import GraficosPage from './pages/GraficosPage';
import GrafoPage from './pages/GrafoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/organizaciones" element={<OrganizacionesPage />} />
          <Route path="/beneficiarios" element={<BeneficiariosPage />} />
          <Route path="/graficos" element={<GraficosPage />} />
          <Route path="/grafo" element={<GrafoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
