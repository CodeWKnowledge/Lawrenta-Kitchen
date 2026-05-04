const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // Text sizes
      content = content.replace(/\btext-6xl\b/g, 'text-4xl');
      content = content.replace(/\btext-5xl\b/g, 'text-3xl');
      content = content.replace(/\btext-4xl\b/g, 'text-2xl');
      content = content.replace(/\btext-3xl\b/g, 'text-xl');
      content = content.replace(/\btext-2xl\b/g, 'text-lg');
      content = content.replace(/\btext-xl\b/g, 'text-base');
      content = content.replace(/\btext-lg\b/g, 'text-sm');

      // Roundness
      content = content.replace(/\brounded-3xl\b/g, 'rounded-lg');
      content = content.replace(/\brounded-2xl\b/g, 'rounded-md');
      content = content.replace(/\brounded-xl\b/g, 'rounded-md');
      content = content.replace(/\brounded-full\b/g, 'rounded-md');
      content = content.replace(/\brounded-large\b/g, 'rounded-sm');
      
      // Shadows
      content = content.replace(/\bshadow-2xl\b/g, 'shadow-sm');
      content = content.replace(/\bshadow-xl\b/g, 'shadow-sm');
      content = content.replace(/\bshadow-lg\b/g, 'shadow-sm');
      content = content.replace(/\bshadow-md\b/g, 'shadow-sm');

      // Padding / Margins / Gaps
      content = content.replace(/\bpy-24\b/g, 'py-12');
      content = content.replace(/\bpy-12\b/g, 'py-8');
      content = content.replace(/\bp-8\b/g, 'p-6');
      content = content.replace(/\bpx-8\b/g, 'px-6');
      content = content.replace(/\bp-6\b/g, 'p-4');
      content = content.replace(/\bpy-6\b/g, 'py-4');
      content = content.replace(/\bgap-12\b/g, 'gap-8');
      content = content.replace(/\bgap-8\b/g, 'gap-6');

      // Icons
      content = content.replace(/size=\{48\}/g, 'size={32}');
      content = content.replace(/size=\{40\}/g, 'size={28}');
      content = content.replace(/size=\{32\}/g, 'size={24}');
      content = content.replace(/size=\{24\}/g, 'size={18}');
      content = content.replace(/size=\{20\}/g, 'size={16}');
      content = content.replace(/size=\{18\}/g, 'size={14}');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, '../src'));
console.log('Minimalism styles applied.');
