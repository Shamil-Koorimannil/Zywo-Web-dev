const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'Zywo web', 'pages');
const outputDir = path.join(__dirname, 'standalone_detailed_pages');
const stylePath = path.join(__dirname, 'Zywo web', 'style.css');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const cssContent = fs.readFileSync(stylePath, 'utf8');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
    // Only process service detailed pages and similar straightforward ones.
    const filePath = path.join(pagesDir, file);
    let htmlContent = fs.readFileSync(filePath, 'utf8');
    
    // Check if it's a detail page (has service-details-page class or link to style.css)
    if (htmlContent.includes('<link rel="stylesheet" href="../style.css">') || htmlContent.includes('<link rel="stylesheet" href="style.css">')) {
        
        // Inline the CSS
        const inlineStyle = `<style>
/* =========================================
   Inlined styles from style.css
   ========================================= */
${cssContent}
</style>`;

        // Replace stylesheet link
        htmlContent = htmlContent.replace(/<link\s+rel=["']stylesheet["']\s+href=["']\.\.\/style\.css["']\s*\/?>/ig, inlineStyle);
        htmlContent = htmlContent.replace(/<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*\/?>/ig, inlineStyle);

        // Also fix any font imports
        htmlContent = htmlContent.replace(/<link href="https:\/\/fonts\.googleapis\.com.*?">/g, match => {
            return `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n${match}`;
        });

        // Add Changa and Roboto if missing and needed
        if (!htmlContent.includes('fonts.googleapis.com/css2?family=Changa')) {
            htmlContent = htmlContent.replace('</head>', `  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Changa:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">\n</head>`);
        }

        // Adjust back button links to point anywhere or stay same
        // They can change it themselves.

        fs.writeFileSync(path.join(outputDir, file), htmlContent);
        count++;
    }
}

console.log(`Successfully converted ${count} pages into standalone HTML files in /standalone_detailed_pages/ folder.`);
