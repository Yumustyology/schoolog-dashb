/* eslint-disable */
// One-off generator for the static bulk-import sample files under public/samples/.
// Re-run (`node scripts/generate-bulk-import-samples.js`) whenever the bulk-import
// CSV columns change on the backend (src/staff/staff.service.ts / students.service.ts).
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const OUT_DIR = path.join(__dirname, '..', 'public', 'samples');

const STAFF_COLUMNS = [
  { header: 'firstName', example: 'John' },
  { header: 'lastName', example: 'Doe' },
  { header: 'email', example: 'john.doe@example.com' },
  { header: 'phone', example: '+2348123456789' },
  { header: 'role', example: 'Teacher' },
  { header: 'isTeachingStaff', example: 'true' },
  { header: 'payroll', example: 'PR-0001' },
];

const STUDENT_COLUMNS = [
  { header: 'firstName', example: 'Jane' },
  { header: 'lastName', example: 'Smith' },
  { header: 'email', example: 'jane.smith@example.com' },
  { header: 'gender', example: 'female' },
  { header: 'classGradeId', example: '65f89e8c4d9a420012345678' },
  { header: 'dob', example: '2010-05-12' },
  { header: 'guardianId', example: '' },
  { header: 'guardianFirstName', example: 'Mary' },
  { header: 'guardianLastName', example: 'Smith' },
  { header: 'guardianPhoneNumber', example: '+2348012345678' },
  { header: 'guardianRelationship', example: 'Mother' },
  { header: 'guardianEmail', example: 'mary.smith@example.com' },
  { header: 'guardianSecondaryPhoneNumber', example: '' },
  { header: 'guardianAddress', example: '123 Street, City, Country' },
];

function writeXlsx(columns, sheetName, outFile) {
  const headers = columns.map((c) => c.header);
  const exampleRow = columns.map((c) => c.example);
  const sheet = XLSX.utils.aoa_to_sheet([headers, exampleRow]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  XLSX.writeFile(workbook, outFile);
  console.log(`Wrote ${outFile}`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
writeXlsx(
  STAFF_COLUMNS,
  'Staff',
  path.join(OUT_DIR, 'staff-bulk-import-sample.xlsx')
);
writeXlsx(
  STUDENT_COLUMNS,
  'Students',
  path.join(OUT_DIR, 'students-bulk-import-sample.xlsx')
);
