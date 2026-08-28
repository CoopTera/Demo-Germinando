const fs = require('fs');
const path = require('path');

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
  // Check if file has the í signature.
  // The signature is that roughly half the file is 'í'.
  // Actually, we can just check if index 1 is 'í' and index 3 is 'í'.
  if (content.length > 3 && content[1] === 'í' && content[3] === 'í') {
    let restored = '';
    for (let i = 0; i < content.length; i += 2) {
      restored += content[i];
    }
    fs.writeFileSync(file, restored, 'utf8');
    console.log('Restored', file);
  }
});
