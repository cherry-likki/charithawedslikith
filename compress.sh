#!/bin/bash

echo "🧼 Compressing wedding images..."

for folder in haldi marriage reception; do
  mkdir -p compressed/$folder
  for img in assets/gallery/$folder/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -e "$img" ] || continue
    magick "$img" -resize 1600x1200 -strip -interlace Plane -quality 70 "$img"
  done
done

echo "✅ Compression complete. Check 'compressed/' folder."
