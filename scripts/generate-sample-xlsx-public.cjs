const XLSX = require('xlsx');
const data = [
  ['Term 1','Numbers and Number Systems','Place Value','Comparing Numbers','Ordering Numbers','Rounding Numbers'],
  ['Term 1','Addition and Subtraction','Basic Addition','Carrying Over','Basic Subtraction','Borrowing'],
  ['Term 1','Multiplication and Division','Multiplication Tables','Long Multiplication','Division Concepts','Long Division'],
  ['Term 2','Fractions and Decimals','Equivalent Fractions','Adding Fractions','Decimal Basics','Converting Fractions to Decimals'],
  ['Term 2','Percentages and Ratios','Percentage Basics','Ratio Concepts','Simplifying Ratios','Percentage Increase/Decrease'],
  ['Term 2','Algebraic Thinking','Introduction to Variables','Simple Expressions','Solving Simple Equations'],
  ['Term 3','Geometry','Basic Shapes','Angles and Lines','Perimeter and Area','Symmetry'],
  ['Term 3','Measurement','Units of Length','Units of Mass','Time and Duration','Volume and Capacity'],
  ['Term 3','Data Handling','Collecting Data','Reading Charts and Tables','Introduction to Probability'],
  ['Term 3','Revision and Assessment','Past Questions Practice','Exam Techniques','Solved Examples'],
];
const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Curriculum');
XLSX.writeFile(wb, './public/assets/sample-curriculum.xlsx');
console.log('Wrote ./public/assets/sample-curriculum.xlsx');
