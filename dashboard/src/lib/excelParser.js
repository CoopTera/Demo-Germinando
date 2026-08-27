import * as XLSX from 'xlsx';

export async function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve({
          sheetName: firstSheet,
          totalRows: jsonData.length,
          headers: jsonData.length > 0 ? Object.keys(jsonData[0]) : [],
          data: jsonData,
          preview: jsonData.slice(0, 5),
        });
      } catch (error) {
        reject(new Error('Error al procesar el archivo: ' + error.message));
      }
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsArrayBuffer(file);
  });
}
