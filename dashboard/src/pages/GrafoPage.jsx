import { Graph } from '@phosphor-icons/react';
import GrafoVinculos from '../components/graph/GrafoVinculos';

export default function GrafoPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="animate-fade-in-up delay-0">
        <h1 className="text-2xl font-bold text-pizarra flex items-center gap-2">
          <Graph className="w-6 h-6" />
          Grafo de Vínculos
        </h1>
        <p className="text-sm text-pizarra/50 mt-1">
          Visualización interactiva de relaciones entre entidades del programa.
          Arrastrá los nodos para explorar las conexiones.
        </p>
      </div>

      {/* Graph */}
      <div className="animate-fade-in-up delay-1">
        <GrafoVinculos />
      </div>
    </div>
  );
}

