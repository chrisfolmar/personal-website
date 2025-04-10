/**
 * Sitemap XML Generator Script
 * 
 * This script generates a sitemap.xml file based on the data in client/src/lib/data.ts
 * The sitemap.xml file is placed in the public folder and follows the sitemap protocol
 * at https://www.sitemaps.org/protocol.html
 * 
 * Run with: node scripts/sitemap-generator.js
 */

const fs = require('fs');
const path = require('path');

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Import data - you'll need to convert this to require when running with Node
// Here we're just mocking the data - normally we'd import from the project 
const mockProjects = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));
const mockBlogPosts = Array.from({ length: 5 }, (_, i) => ({ id: i + 1 }));

// Generate sitemap XML string
function generateSitemapXml() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage
  xml += '  <!-- Homepage -->\n';
  xml += '  <url>\n';
  xml += '    <loc>https://www.chrisfolmar.com/</loc>\n';
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';
  
  // Add alternate domain
  xml += '  \n';
  xml += '  <!-- Alternate domain -->\n';
  xml += '  <url>\n';
  xml += '    <loc>https://www.cfolmar.com/</loc>\n';
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';
  
  // Add blog posts
  xml += '  \n';
  xml += '  <!-- Blog posts -->\n';
  mockBlogPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>https://www.chrisfolmar.com/blog/${post.id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  // Add project details
  xml += '  \n';
  xml += '  <!-- Project details -->\n';
  mockProjects.forEach(project => {
    xml += '  <url>\n';
    xml += `    <loc>https://www.chrisfolmar.com/projects/${project.id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Write sitemap to file
const sitemap = generateSitemapXml();
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap written to ${outputPath}`);

// Update robots.txt to point to sitemap
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.chrisfolmar.com/sitemap.xml
`;

fs.writeFileSync(robotsPath, robotsContent);
console.log(`robots.txt updated at ${robotsPath}`);