const fs = require('fs');
let content = fs.readFileSync('src/pages/TalleresPage.jsx', 'utf8');

if (!content.includes('useLocation')) {
  content = content.replace(/import \{ useNavigate \} from 'react-router-dom';/, "import { useNavigate, useLocation } from 'react-router-dom';");
}
content = content.replace(/const navigate = useNavigate\(\);/, "const navigate = useNavigate();\n  const location = useLocation();");
content = content.replace(/const \[searchTerm, setSearchTerm\] = useState\(''\);/, "const [searchTerm, setSearchTerm] = useState(location.state?.filterOrg || location.state?.search || '');");

fs.writeFileSync('src/pages/TalleresPage.jsx', content, 'utf8');
