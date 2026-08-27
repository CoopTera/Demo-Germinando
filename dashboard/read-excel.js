import * as xlsx from 'xlsx';
const wb = xlsx.readFile('D:/Programas/TERA/Germinando/Demo-Germinando/files/Organizaciones Prog. GERMINANDO.xlsx');
const sheetName = wb.SheetNames[0];
const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
console.log(data.slice(0, 2));
