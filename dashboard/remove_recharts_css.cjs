const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// Remove the recharts smooth resize transitions
const oldAnim = `
/* Recharts Smooth Resize Transitions */
.recharts-layer path, 
.recharts-layer rect,
.recharts-layer circle {
  transition: d 0.15s ease-out, x 0.15s ease-out, y 0.15s ease-out, cx 0.15s ease-out, cy 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out !important;
}
`;

css = css.replace(oldAnim.trim(), '');

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Removed recharts CSS transitions completely');
