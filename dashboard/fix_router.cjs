const fs = require('fs');
let content = fs.readFileSync('src/pages/TalleresPage.jsx', 'utf8');

if (!content.includes('react-router-dom')) {
  content = content.replace(/import React, \{ useState \} from 'react';/, "import React, { useState } from 'react';\nimport { useNavigate, useLocation } from 'react-router-dom';");
}
fs.writeFileSync('src/pages/TalleresPage.jsx', content, 'utf8');
