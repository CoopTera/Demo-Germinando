import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import Sidebar from './Sidebar';
import Header from './Header';
import ImportModal from '../import/ImportModal';
import { parseExcelFile } from '../../lib/excelParser';

export default function MainLayout() {
  const [importOpen, setImportOpen] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const content = mainRef.current.firstElementChild;
    const lenis = new Lenis({ 
      wrapper: mainRef.current, 
      content: content,
      autoRaf: true 
    });
    return () => lenis.destroy();
  }, []);

  const handleImport = async (tipo, file) => {
    try {
      const result = await parseExcelFile(file);
      setImportResult({ tipo, ...result });
      setImportOpen(false);
      alert(`✅ Se importaron ${result.totalRows} registros de "${tipo}" correctamente.`);
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-canvas overflow-hidden">
        <Header 
          onImportClick={() => setImportOpen(true)} 
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main ref={mainRef} className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-[1600px] mx-auto w-full" style={{ padding: 'clamp(24px, 8vw, 80px)' }}>
            <Outlet context={{ importResult }} />
          </div>
        </main>
      </div>
      <ImportModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
