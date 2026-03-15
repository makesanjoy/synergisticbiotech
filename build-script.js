const fs = require('fs');
const path = require('path');

// Copy views directory to netlify functions directory
const srcViews = path.join(__dirname, 'views');
const destViews = path.join(__dirname, 'netlify', 'functions', 'views');

// Ensure destination directory exists
const destDir = path.join(__dirname, 'netlify', 'functions');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy views recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

if (fs.existsSync(srcViews)) {
  copyDir(srcViews, destViews);
  console.log('✓ Views copied to netlify/functions/views');
}

// Also copy public if needed
const srcPublic = path.join(__dirname, 'public');
const destPublic = path.join(__dirname, 'netlify', 'functions', 'public');
if (fs.existsSync(srcPublic)) {
  copyDir(srcPublic, destPublic);
  console.log('✓ Public copied to netlify/functions/public');
}
