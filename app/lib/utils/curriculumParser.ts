import * as XLSX from 'xlsx';

export type ParsedCurriculum = Array<{ term: string; topics: string[] }>;

/**
 * Parse an uploaded .xlsx or .csv File/Blob into a simple curriculum shape.
 * Accepts files where each row is: Term | Topic1 | Topic2 | ...
 * Or rows like: Term | Topic (aggregates same term rows)
 */
export async function parseCurriculumFile(file: File | Blob): Promise<ParsedCurriculum> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const aggregated = new Map<string, string[]>();

  for (const row of rows) {
    if (!row || row.length === 0) continue;
    const term = String(row[0] ?? '').trim();
    if (!term) continue;
    const topics = row.slice(1).map((c: any) => String(c ?? '').trim()).filter(Boolean);
    if (!aggregated.has(term)) aggregated.set(term, []);
    aggregated.set(term, aggregated.get(term)!.concat(topics));
  }

  const result: ParsedCurriculum = Array.from(aggregated.entries()).map(([term, topics]) => ({ term, topics }));
  return result;
}
