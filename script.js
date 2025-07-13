const maxImagesPerLoad = 30; // Load 30 images at a time per category
const loadedImages = {
  haldi: 0,
  marriage: 0,
  reception: 0
};

let manifest = {};

// Load the manifest.json containing Cloudinary image URLs
async function loadManifest() {
  try {
    const response = await fetch('manifest.json');
    manifest = await response.json();
  } catch (error) {
    console.error('❌ Failed to load manifest.json:', error);
  }
}

// Load a batch of images for a given category
function loadImages(category) {
  const container = document.getElementById(`${category}Grid`);
  if (!container || !manifest[category]) return;

  const start = loadedImages[category];
  const end = start + maxImagesPerLoad;
  const imagesToLoad = manifest[category].slice(start, end);

  imagesToLoad.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = `${category} photo`;
    img.loading = "lazy";
    img.className = "gallery-image";
    container.appendChild(img);
  });

  loadedImages[category] = end;

  if (loadedImages[category] >= manifest[category].length) {
    const btn = container.parentElement.querySelector('.load-more');
    if (btn) btn.style.display = 'none';
  }
}

// Scroll from intro to gallery
function scrollToGallery() {
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.scrollIntoView({ behavior: 'smooth' });
  }
}

// Load initial batch when page loads
window.onload = async () => {
  await loadManifest();
  loadImages('haldi');
  loadImages('marriage');
  loadImages('reception');
};

// Attach load more buttons
document.addEventListener("DOMContentLoaded", () => {
  ['haldi', 'marriage', 'reception'].forEach(category => {
    const btn = document.querySelector(`#${category}Section .load-more`);
    if (btn) {
      btn.addEventListener('click', () => loadImages(category));
    }
  });

  const startBtn = document.getElementById('startGallery');
  if (startBtn) {
    startBtn.addEventListener('click', scrollToGallery);
  }
});
