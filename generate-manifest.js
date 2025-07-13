const fs = require('fs');
const path = require('path');

// 🔧 Your Cloudinary cloud name
const CLOUDINARY_CLOUD_NAME = 'dsdqd6xoh'; // e.g., 'likithcloud'
const BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// 🔍 Folders to read from
const CATEGORIES = ['haldi', 'marriage', 'reception'];
const GALLERY_DIR = path.join(__dirname, 'assets', 'gallery');

const manifest = {};

CATEGORIES.forEach(category => {
  const categoryPath = path.join(GALLERY_DIR, category);

  if (!fs.existsSync(categoryPath)) {
    console.warn(`⚠️ Folder not found: ${categoryPath}`);
    return;
  }

  const files = fs.readdirSync(categoryPath).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });

  manifest[category] = files.map(filename =>
    `${BASE_URL}/${category}/${filename}`
  );
});

// 💾 Write to manifest.json
fs.writeFileSync(
  path.join(__dirname, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('✅ manifest.json generated successfully!');
