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

      // >${val.toFixed(2)}
      content = content.replace(/>\$\{([^}]+)\.toFixed\(2\)\}/g, '>₦{$1.toLocaleString()}');
      // >+${val.toFixed(2)}
      content = content.replace(/>\+\$\{([^}]+)\.toFixed\(2\)\}/g, '>+₦{$1.toLocaleString()}');
      // `$${val.toFixed(2)}`
      content = content.replace(/`\$\$\{([^}]+)\.toFixed\(2\)\}`/g, '`₦$${$1.toLocaleString()}`');
      // {val.toFixed(2)} without $ (like dashboard) -> ₦{val.toLocaleString()}
      content = content.replace(/>\{([^}]+)\.price\.toFixed\(2\)\}/g, '>₦{$1.price.toLocaleString()}'); // Wait, Dashboard is {p.price.toFixed(2)}
      // generic $ before {
      content = content.replace(/\$\{([^}]+)\.toFixed\(2\)\}/g, '₦{$1.toLocaleString()}');
      // some might be without the wrapper:
      // like `• ${order.total.toFixed(2)}`
      
      // Let's do a simpler global replacement:
      // Replace `\${(.*?).toFixed(2)}` with `₦{$1.toLocaleString()}`
      // BUT if it was in a template string, `\`$${` became `\`$₦{`. We must fix that.
      // Actually, let's just use simple replaces:
      
      content = originalContent;
      
      // 1. Template literal: `$${val.toFixed(2)}` -> `₦${val.toLocaleString()}`
      content = content.replace(/`\$\$\{([^}]+)\.toFixed\(\d\)\}`/g, '`₦$${$1.toLocaleString()}`');
      
      // 2. Text node literal: `${val.toFixed(2)}` -> `₦{val.toLocaleString()}`
      // Note: this will match <span>${val.toFixed(2)}</span> -> <span>₦{val.toLocaleString()}</span>
      // Wait, in JSX text, it's written as `${val}` literally. The parser sees it as `{val}` and literal `$`.
      // So it's literally `$` followed by `{val.toFixed(2)}`.
      content = content.replace(/\$\{([^}]+)\.toFixed\(\d\)\}/g, '₦{$1.toLocaleString()}');
      
      // 3. For Dashboard.jsx: `{p.price.toFixed(2)}` -> `₦{p.price.toLocaleString()}`
      content = content.replace(/\{p\.price\.toFixed\(\d\)\}/g, '₦{p.price.toLocaleString()}');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Done.');
