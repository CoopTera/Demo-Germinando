const fs = require('fs');
const path = require('path');

const fixes = {
  'Ã¡': 'á',
  'Ã©': 'é',
  'Ã\u00AD': 'í',
  'Ã³': 'ó',
  'Ãº': 'ú',
  'Ã±': 'ñ',
  'Ã\u0081': 'Á',
  'Ã\u0089': 'É',
  'Ã\u008D': 'Í',
  'Ã\u0093': 'Ó',
  'Ã\u009A': 'Ú',
  'Ã\u0091': 'Ñ',
  // Some powershell specific corruptions
  'ǭ': 'á',
  '': 'í',
  'Vnculos': 'Vínculos',
  'Rǭpidas': 'Rápidas',
  'Asignacin': 'Asignación'
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walkDir(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const [bad, good] of Object.entries(fixes)) {
    content = content.split(bad).join(good);
  }
  
  // Extra specific fixes for BeneficiariosPage and Sidebar
  content = content.replace(/Gr\uFFFDficos/g, 'Gráficos');
  content = content.replace(/V\uFFFDnculos/g, 'Vínculos');
  content = content.replace(/R\uFFFDo/g, 'Rá'); // Rpidas
  content = content.replace(/R\uFFFDpidas/g, 'Rápidas');
  content = content.replace(/Asignaci\uFFFDn/g, 'Asignación');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
