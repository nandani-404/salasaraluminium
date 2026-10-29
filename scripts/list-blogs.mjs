import fs from 'fs';

function extractPosts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const posts = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    const startIndex = match.index;
    const block = content.slice(startIndex, startIndex + 3000);
    const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
    const imageMatch = block.match(/image:\s*['"]([^'"]+)['"]/);
    const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
    const excerptMatch = block.match(/excerpt:\s*['"]([^'"]+)['"]/);
    
    // Only include if it's a real blog post (has title and excerpt)
    if (titleMatch && excerptMatch) {
      posts.push({
        file: filePath,
        slug,
        title: titleMatch[1],
        image: imageMatch ? imageMatch[1] : 'N/A',
        category: categoryMatch ? categoryMatch[1] : 'N/A',
        excerpt: excerptMatch[1]
      });
    }
  }
  return posts;
}

const files = [
  'src/lib/data/guides3.ts',
  'src/lib/data/guides2.ts',
  'src/lib/data/guides.ts',
  'src/lib/data.ts'
];

let counter = 1;
for (const f of files) {
  const posts = extractPosts(f);
  for (const p of posts) {
    console.log(`[${counter++}] (${f})`);
    console.log(`Slug: ${p.slug}`);
    console.log(`Title: ${p.title}`);
    console.log(`Image: ${p.image}`);
    console.log(`Excerpt: ${p.excerpt.slice(0, 100)}...`);
    console.log('---');
  }
}
