import { Building2, Hammer, Users, ChevronRight } from 'lucide-react';
import { topOrganizaciones } from '../../data/mockData';

export default function TopOrgs({ organizaciones = topOrganizaciones }) {
  const list = organizaciones || topOrganizaciones;
  const maxBeneficiarios = Math.max(...list.map((o) => o.beneficiarios || 0), 1);

  return (
    <div className="bg-white rounded-md border border-borde h-full flex flex-col card-elevated animate-fade-in-up delay-5" style={{ padding: '24px' }}>
      {/* Title */}
      <div className="flex items-center" style={{ gap: '10px', marginBottom: '24px' }}>
        <Building2 className="w-5 h-5 text-pizarra" />
        <h2 className="font-semibold text-pizarra text-base">Top 5 Organizaciones</h2>
      </div>

      {/* List */}
      <div className="flex flex-col overflow-y-auto flex-1">
        {list.map((org, index) => (
          <div
            key={org.id || index}
            className="flex items-center justify-between border-b border-borde last:border-0 hover:bg-superficie-sec/50 transition-colors duration-150"
            style={{ padding: '16px 0', gap: '20px' }}
          >
            {/* Left side: Rank + Organization Name */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="rounded-md bg-superficie-sec text-pizarra font-bold text-xs flex items-center justify-center shrink-0 border border-borde" style={{ width: '28px', height: '28px' }}>
                {index + 1}
              </div>
              <span className="font-medium text-texto text-sm truncate">
                {org.nombre}
              </span>
            </div>

            {/* Right side: Stats & Mini Progress Bar */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-3 text-xs text-pizarra/70 font-medium">
                  <span className="flex items-center gap-1">
                    <Hammer className="w-3.5 h-3.5" aria-hidden="true" />
                    {org.talleresActivos}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" aria-hidden="true" />
                    {org.beneficiarios}
                  </span>
                </div>
                {/* Visual bar */}
                <div className="w-24 h-2.5 rounded-full bg-superficie-sec overflow-hidden mt-0.5">
                  <div 
                    className="h-full bg-primario rounded-full" 
                    style={{ width: `${(org.beneficiarios / maxBeneficiarios) * 100}%` }}
                  />
                </div>
              </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto" style={{ paddingTop: '16px' }}>
        <button type="button" className="text-xs text-primario font-medium hover:underline flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-primario rounded-sm">
          Ver ranking completo
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export { TopOrgs };
