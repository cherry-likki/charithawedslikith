const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// ✅ Replace with your Cloudinary credentials
cloudinary.config({
  cloud_name: 'dsdqd6xoh',
  api_key: '931914844277555',
  api_secret: 'cNHzaulYKMiLMDcH3GYqVGUBVa8'
});

// These are the folders in your Cloudinary Media Library
const folders = ['haldi', 'marriage', 'reception'];
const manifest = {};

// Helper function to fetch images from one folder
async function getImagesFromFolder(folder) {
  let imageUrls = [];
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('public_id','asc')
      .max_results(500)
      .execute();

    imageUrls = result.resources.map((file) =>
      cloudinary.url(file.public_id, { format: file.format })
    );
  } catch (err) {
    console.error(`❌ Error fetching ${folder}:`, err.message);
  }
  return imageUrls;
}

// Main function to build manifest.json
async function generateManifest() {
  for (const folder of folders) {
    console.log(`📂 Fetching ${folder}...`);
    manifest[folder] = await getImagesFromFolder(folder);
  }

  fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
  console.log('✅ manifest.json generated successfully!');
}

generateManifest();
