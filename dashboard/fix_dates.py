import os
import re

def fix(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    if 'formatDate' not in text:
        text = text.replace('import React', 'import { formatDate } from "../../utils/formatters";\nimport React')
    
    text = re.sub(r'row\.fechaFirma(?![\w)])', 'formatDate(row.fechaFirma)', text)
    text = re.sub(r'row\.fechaVencimiento(?![\w)])', 'formatDate(row.fechaVencimiento)', text)
    text = re.sub(r'row\.fechaInicio(?![\w)])', 'formatDate(row.fechaInicio)', text)
    text = re.sub(r'row\.fechaFin(?![\w)])', 'formatDate(row.fechaFin)', text)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)

fix('src/components/tables/ConveniosTable.jsx')
fix('src/components/tables/TalleresTable.jsx')
