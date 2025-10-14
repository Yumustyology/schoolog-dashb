const XLSX = require('xlsx');
const fs = require('fs');

const data = [
  ['Term 1', 'Topic A', 'Topic B'],
  ['Term 2', 'Topic C'],
  ['Term 1', 'Topic D'],
];

const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Curriculum');
XLSX.writeFile(wb, './assets/sample-curriculum.xlsx');
console.log('Wrote ./assets/sample-curriculum.xlsx');
