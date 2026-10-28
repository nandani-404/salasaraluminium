import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scratch/audit-summary.json', 'utf8'));
console.log('Total Scanned:', data.totalScanned);
console.log('Total Indexable:', data.totalIndexable);
console.log('Missing:', data.missingCount);
console.log('Duplicates:', data.duplicatesCount);
console.log('Too short (<70 chars):', data.tooShortCount);
console.log('Too long (>155 chars):', data.tooLongCount);

const byGroup = {};
for (const item of data.tooLong) {
  let group = 'Other Landing Pages';
  if (item.url.startsWith('/blog/')) group = 'Blog Posts';
  else if (item.url.startsWith('/hi/')) group = 'Hindi Pages (/hi)';
  else if (item.url.startsWith('/locations/')) group = 'City Location Pages';
  else if (item.url.startsWith('/products/')) group = 'Category Pages';
  else if (item.url === '/products') group = 'Products Hub';
  else if (item.url.startsWith('/product/')) group = 'Product Pages';
  byGroup[group] = (byGroup[group] || 0) + 1;
}
console.log('\nBreakdown of >155 chars by section:');
console.table(byGroup);

console.log('\nMax length:', Math.max(...data.tooLong.map(i => i.length)));
console.log('Min length in tooLong:', Math.min(...data.tooLong.map(i => i.length)));
