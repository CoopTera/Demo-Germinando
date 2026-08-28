import GrafoVinculos from '../components/graph/GrafoVinculos';

export default function GrafoPage() {
  return (
    <div className="w-full h-full flex flex-col flex-1" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <div className="flex-1 w-full animate-fade-in-up flex flex-col">
        <GrafoVinculos />
      </div>
    </div>
  );
}
