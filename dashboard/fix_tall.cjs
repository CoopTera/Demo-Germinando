const fs = require('fs');
let content = fs.readFileSync('src/pages/TalleresPage.jsx', 'utf8');

content = content.replace(/getOrgName\(t\.org_id\)\.toLowerCase\(\)\.includes\(searchTerm\.toLowerCase\(\)\)/g, '(t.org_ids || []).some(id => getOrgName(id).toLowerCase().includes(searchTerm.toLowerCase()))');

content = content.replace(/<td className="text-sm font-medium text-pizarra\/80 border-r border-borde" style=\{thStyle\(widths\.col2\)\} title=\{getOrgName\(taller\.org_id\)\}>\{getOrgName\(taller\.org_id\)\}<\/td>/g, 
  `<td className="text-sm font-medium text-pizarra/80 border-r border-borde" style={thStyle(widths.col2)}>
                      <div className="flex flex-wrap" style={{ gap: '4px' }}>
                        {(taller.org_ids || []).map((id, i) => (
                          <span key={i} className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate cursor-pointer hover:bg-primario/20 transition-colors" style={{ padding: '2px 8px', maxWidth: '100%' }} onClick={(e) => { e.stopPropagation(); navigate('/organizaciones', { state: { filterOrg: getOrgName(id) } }); }} title={getOrgName(id)}>
                            {getOrgName(id)}
                          </span>
                        ))}
                      </div>
                    </td>`);

content = content.replace(/<p className="text-sm font-medium text-texto">\{getOrgName\(selectedItem\.org_id\)\}<\/p>/g,
  `<div className="flex flex-wrap" style={{ gap: '6px' }}>
                  {(selectedItem.org_ids || []).map((id, i) => (
                    <span key={i} onClick={() => navigate('/organizaciones', { state: { openModalId: id } })} className="bg-primario/10 text-primario text-xs rounded-full inline-block font-medium truncate cursor-pointer hover:bg-primario/20 transition-colors" style={{ padding: '4px 10px', maxWidth: '100%' }} title={getOrgName(id)}>
                      {getOrgName(id)} &rarr;
                    </span>
                  ))}
                </div>`);

if (!content.includes('useNavigate')) {
  content = content.replace(/import \{ useState \} from 'react';/, "import { useState } from 'react';\nimport { useNavigate } from 'react-router-dom';");
  content = content.replace(/export default function TalleresPage\(\) \{/, "export default function TalleresPage() {\n  const navigate = useNavigate();");
}

fs.writeFileSync('src/pages/TalleresPage.jsx', content, 'utf8');
