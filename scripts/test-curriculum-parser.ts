import fs from 'fs';
import path from 'path';
import { parseCurriculumFile } from '../app/lib/utils/curriculumParser';

async function run() {
  const csv = `Term 1,Topic A,Topic B
Term 2,Topic C
Term 1,Topic D`;
  const blob = new Blob([csv], { type: 'text/csv' });
  const result = await parseCurriculumFile(blob as any);
  console.log('Parsed curriculum:', JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
