#!/usr/bin/env python3
"""
Hero Image Optimization Script
Converts downloaded images to 720x360px WebP format (<150KB)
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("❌ Pillow not installed. Install with: pip install Pillow")
    sys.exit(1)

# Configuration
SCRIPT_DIR = Path(__file__).parent.parent
INPUT_DIR = SCRIPT_DIR / "downloaded_images"
OUTPUT_DIR = SCRIPT_DIR / "public" / "images" / "blog"
TARGET_SIZE = (720, 360)
QUALITY = 80

# Map of downloaded filenames to output slugs
ARTICLES = {
    "essentiels-outils-tech-finance": "essentiels-outils-tech-finance",
    "ia-automatisation-finance": "ia-et-automatisation-des-taches-repetitives",
    "organiser-direction-financiere": "organiser-sa-direction-financiere",
    "daf-externalise-vs-salarie": "daf-externalise-vs-daf-salarie",
    "flux-de-tresorerie": "flux-de-tresorerie",
    "tarifs-daf-2026": "cout-daf-externalise-tarifs-prix-2026",
    "modernisation-cfo": "la-modernisation-du-role-de-cfo",
    "10-outils-cfos-startup": "les-10-outils-pour-cfos-startup",
    "due-diligence-checklist": "checklist-due-diligence-levee-de-fonds",
    "daf-drh-synergie": "daf-drh-externalises-synergie",
}

def find_input_file(base_name):
    """Find input file with any common image extension."""
    for ext in ['.png', '.jpg', '.jpeg']:
        path = INPUT_DIR / f"{base_name}{ext}"
        if path.exists():
            return path
    return None

def optimize_image(input_path, output_path):
    """Resize and convert image to WebP format."""
    try:
        # Open image
        img = Image.open(input_path)

        # Convert RGBA to RGB if necessary (WebP needs RGB)
        if img.mode == 'RGBA':
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3] if len(img.split()) == 4 else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Resize to target dimensions
        img = img.resize(TARGET_SIZE, Image.Resampling.LANCZOS)

        # Save as WebP
        img.save(output_path, 'WEBP', quality=QUALITY, method=6)

        return True, None
    except Exception as e:
        return False, str(e)

def main():
    """Main optimization workflow."""
    print("🖼️  Hero Image Optimization Script")
    print(f"Input directory: {INPUT_DIR}")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Target size: {TARGET_SIZE[0]}×{TARGET_SIZE[1]}px")
    print(f"Quality: {QUALITY}")
    print()

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Check input directory
    if not INPUT_DIR.exists():
        print(f"❌ Input directory not found: {INPUT_DIR}")
        print(f"   Create it and add your downloaded images there")
        sys.exit(1)

    # Process each article
    success_count = 0
    error_count = 0

    for base_name, slug in ARTICLES.items():
        input_file = find_input_file(base_name)

        if not input_file:
            print(f"⚠️  {base_name}: Not found in {INPUT_DIR}")
            error_count += 1
            continue

        output_file = OUTPUT_DIR / f"{slug}.webp"

        # Optimize
        success, error = optimize_image(input_file, output_file)

        if success:
            size_kb = output_file.stat().st_size / 1024
            size_status = "✓" if size_kb < 150 else "⚠️ "
            print(f"{size_status} {slug}: {size_kb:.1f}KB")
            success_count += 1
        else:
            print(f"❌ {slug}: {error}")
            error_count += 1

    print()
    print(f"Results: {success_count} succeeded, {error_count} failed")

    if success_count == 10:
        print("✅ All 10 images optimized successfully!")
        print()
        print("Next steps:")
        print("1. Verify images in: ls -lh public/images/blog/*.webp")
        print("2. Commit: git add public/images/blog/*.webp")
        print("3. Deploy and test")
        return 0
    else:
        print("⚠️  Some images failed. Check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
