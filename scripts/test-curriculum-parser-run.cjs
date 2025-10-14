const XLSX = require('xlsx');

function parseFromCsvString(csv) {
  const workbook = XLSX.read(csv, { type: 'string' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const aggregated = new Map();
  for (const row of rows) {
    if (!row || row.length === 0) continue;
    const term = String(row[0] ?? '').trim();
    if (!term) continue;
    const topics = row.slice(1).map((c) => String(c ?? '').trim()).filter(Boolean);
    if (!aggregated.has(term)) aggregated.set(term, []);
    aggregated.set(term, aggregated.get(term).concat(topics));
  }
  return Array.from(aggregated.entries()).map(([term, topics]) => ({ term, topics }));
}

const csv = `Term 1,Topic A,Topic B\nTerm 2,Topic C\nTerm 1,Topic D`;
console.log(parseFromCsvString(csv));
