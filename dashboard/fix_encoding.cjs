const fs = require('fs');
let text = fs.readFileSync('src/data/mockData.js', 'utf8');

const fixes = {
  'â€”': '—',
  'Ã³': 'ó',
  'Ã\u00AD': 'í',
  'Ã©': 'é',
  'Ã¡': 'á',
  'Ã±': 'ñ',
  'Ãº': 'ú',
  'Ã\u0083Â³': 'ó', 
  'Ã\u0083Â\u00AD': 'í'
};

for (const [bad, good] of Object.entries(fixes)) {
  text = text.split(bad).join(good);
}

// Special case for missing ones in node buffer
text = text.replace(/Asociaci\uFFFDn/g, 'Asociación');
text = text.replace(/Ra\uFFFDces/g, 'Raíces');
text = text.replace(/Fundaci\uFFFDn/g, 'Fundación');
text = text.replace(/F\uFFFDr/g, 'Fér');
text = text.replace(/L\uFFFDr/g, 'Lóp');
text = text.replace(/G\uFFFDm/g, 'Góm');
text = text.replace(/S\uFFFDn/g, 'Sán');
text = text.replace(/P\uFFFDr/g, 'Pér');
text = text.replace(/Gonz\uFFFDl/g, 'Gonzál');
text = text.replace(/D\uFFFDaz/g, 'Díaz');
text = text.replace(/Garc\uFFFD/g, 'Garcí');
text = text.replace(/Rodr\uFFFD/g, 'Rodrí');
text = text.replace(/Mart\uFFFDn/g, 'Martín');
text = text.replace(/Alba\uFFFDil/g, 'Albañil');
text = text.replace(/dise\uFFFDo/g, 'diseño');

fs.writeFileSync('src/data/mockData.js', text, 'utf8');
console.log('Fixed file.');
