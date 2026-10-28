import fs from 'node:fs';

const html = fs.readFileSync('.next/server/app/index.html', 'utf8');

function extractMeta(html, attr, val) {
  // matches <meta name="attr" content="val"> or <meta content="val" name="attr">
  const r1 = new RegExp(`<meta[^>]*${attr}=["']${val}["'][^>]*content=["']([^"']+)["']`, 'i');
  const r2 = new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*${attr}=["']${val}["']`, 'i');
  const m1 = html.match(r1);
  if (m1) return m1[1];
  const m2 = html.match(r2);
  if (m2) return m2[1];
  return null;
}

const desc = extractMeta(html, 'name', 'description');
const ogDesc = extractMeta(html, 'property', 'og:description');
const twDesc = extractMeta(html, 'name', 'twitter:description');

console.log('=== RENDERED HOMEPAGE META TAGS ===');
console.log('1. <meta name="description">');
console.log('   Content:', desc);
console.log('   Length :', desc ? desc.length : 0);

console.log('2. <meta property="og:description">');
console.log('   Content:', ogDesc);
console.log('   Length :', ogDesc ? ogDesc.length : 0);

console.log('3. <meta name="twitter:description">');
console.log('   Content:', twDesc);
console.log('   Length :', twDesc ? twDesc.length : 0);

console.log('\nMatch check:');
console.log('   desc === ogDesc :', desc === ogDesc);
console.log('   desc === twDesc :', desc === twDesc);
console.log('   Length <= 155   :', desc && desc.length <= 155);

// Check JSON-LD
const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
console.log('\n=== HOMEPAGE JSON-LD BLOCKS ===');
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  try {
    const data = JSON.parse(match[1]);
    const types = data['@graph'] ? data['@graph'].map(g => g['@type']).join(', ') : data['@type'];
    console.log(`Block #${count} [@type: ${types}]:`);
    if (data.description) {
      console.log(`   data.description: "${data.description}" (${data.description.length} chars)`);
    }
    if (data['@graph']) {
      data['@graph'].forEach((node, i) => {
        if (node.description) {
          console.log(`   node[${node['@type']}].description: "${node.description}" (${node.description.length} chars)`);
        }
      });
    }
  } catch (err) {
    console.log(`Block #${count} parse error: ${err.message}`);
  }
}

// Check llms.txt generated body
if (fs.existsSync('.next/server/app/llms.txt.body')) {
  const llmsTxt = fs.readFileSync('.next/server/app/llms.txt.body', 'utf8');
  const lines = llmsTxt.split('\n');
  const summaryLine = lines.find(l => l.startsWith('> '));
  console.log('\n=== GENERATED /llms.txt SUMMARY LINE ===');
  console.log('Line  :', summaryLine);
  console.log('Length:', summaryLine ? summaryLine.replace(/^>\s*/, '').length : 0);
  console.log('Match :', summaryLine ? summaryLine.replace(/^>\s*/, '') === desc : false);
}
