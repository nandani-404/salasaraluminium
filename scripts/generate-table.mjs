import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scratch/audit-summary.json', 'utf8'));

// Sort by URL
data.tooLong.sort((a, b) => a.url.localeCompare(b.url));

let md = '| URL | Length | Meta Description |\n|---|---|---|\n';
for (const item of data.tooLong) {
  // Escape pipes in text
  const cleanText = item.text.replace(/\|/g, '\\|');
  md += `| \`${item.url}\` | ${item.length} | ${cleanText} |\n`;
}

fs.writeFileSync('scratch/audit-table.md', md, 'utf8');
console.log(`Generated table with ${data.tooLong.length} rows.`);
