const fs = require('fs');
let content = fs.readFileSync('src/pages/OrganizacionesPage.jsx', 'utf8');

const target = /<div className="bg-canvas rounded border border-borde" style=\{\{ padding: '16px' \}\}>\s*<div className="flex items-center text-xs font-bold text-pizarra\/50 uppercase mb-1" style=\{\{ gap: '4px' \}\}><Hammer style=\{\{ width: '14px', height: '14px' \}\} \/> Talleres<\/div>\s*<p className="text-base font-semibold text-texto">\{org\.talleres\}<\/p>\s*<\/div>/;

const replacement = `<div 
            className="group bg-canvas rounded border border-borde cursor-pointer hover:border-primario hover:bg-primario/5 transition-colors" 
            style={{ padding: '16px' }}
            onClick={() => navigate('/talleres', { state: { filterOrg: org.nombre } })}
            title={\`Ver talleres de \${org.nombre}\`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-pizarra/50 uppercase mb-1">
              <div className="flex items-center" style={{ gap: '4px' }}>
                <Hammer style={{ width: '14px', height: '14px' }} /> Talleres
              </div>
              <span className="text-[10px] text-primario group-hover:underline">VER TODOS &rarr;</span>
            </div>
            <p className="text-base font-bold text-texto">{org.talleres}</p>
          </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/pages/OrganizacionesPage.jsx', content, 'utf8');
console.log("Done");
