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


export function extractClassId(classIdField: any, fallbackClassId: string | null): string {
  if (typeof classIdField === 'string') return classIdField;
  if (classIdField?._id) return classIdField._id;
  return fallbackClassId || '';
}

export function normalizeTopic(topic: any, itemId: string, index: number) {
  return {
    id: topic._id || topic.id || `${itemId}-${index}`,
    title: topic.topic || topic.title || topic.name || '',
    description: topic.description || '',
    week: typeof topic.week === 'number' ? topic.week : undefined,
  };
}

export function normalizeCurriculumData(
  rawData: any[],
  classGradeId: string | null
): any[] {
  if (!Array.isArray(rawData)) return [];

  return rawData.map((item: any) => ({
    termId: item.termSession?._id || '',
    termSession: item.termSession || null,
    classId: extractClassId(item.classId, classGradeId),
    topics: (item.topics || []).map((t: any, idx: number) =>
      normalizeTopic(t, item._id || 'term', idx)
    ),
  }));
}

function isValidTopic(topic: any): boolean {
  if (!topic) return false;
  if (String(topic.id).startsWith('draft-')) return false;
  if (!topic.title && !topic.topic) return false;
  return true;
}

function transformTopic(topic: any) {
  const transformed: Record<string, any> = {
    topic: topic.title || topic.topic || '',
    description: topic.description || '',
  };
  
  if (typeof topic.week === 'number') {
    transformed.week = topic.week;
  }
  
  return transformed;
}

export function transformCurriculumForSave(
  curriculum: any[],
  classGradeId: string
): any[] {
  const classTopicsMap = new Map<
    string,
    { termSession: string; classId: string; topics: any[] }
  >();

  curriculum
    .filter((entry) => entry.classId === classGradeId)
    .forEach((entry) => {
      const validTopics = (entry.topics || [])
        .filter(isValidTopic)
        .map(transformTopic);

      if (validTopics.length > 0) {
        classTopicsMap.set(entry.termId, {
          termSession: entry.termId,
          classId: entry.classId,
          topics: validTopics,
        });
      }
    });

  return Array.from(classTopicsMap.values());
}