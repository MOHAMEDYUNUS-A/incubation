import os
import shutil
import fitz # PyMuPDF
from PIL import Image

workspace = r"c:\Users\niran\Downloads\Incubation"
public_dir = os.path.join(workspace, "public")
logos_dir = os.path.join(public_dir, "logos")
images_dir = os.path.join(public_dir, "images")

os.makedirs(logos_dir, exist_ok=True)
os.makedirs(images_dir, exist_ok=True)

# 1. Copy startup tn.jpg
src_startuptn = os.path.join(workspace, "startup tn.jpg")
if os.path.exists(src_startuptn):
    shutil.copy2(src_startuptn, os.path.join(logos_dir, "startuptn.jpg"))
    print("Copied startuptn.jpg")

# 2. Extract images from Graduation Step & Repeat (MASTeR Logo)
doc_logo = fitz.open(os.path.join(workspace, "Graduation Step & Repeat in Bright Blue Pink Yellow Bold, modern, playful Style.pdf"))
page = doc_logo[0]
pix = page.get_pixmap(dpi=300)
logo_path = os.path.join(logos_dir, "master-incubation-logo.png")
pix.save(logo_path)
print("Saved master-incubation-logo.png from Graduation Step & Repeat PDF")

# Also extract embedded images from the PDF if any
for i, img in enumerate(page.get_images()):
    xref = img[0]
    base_image = doc_logo.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    img_filename = f"master-logo-extracted.{image_ext}"
    with open(os.path.join(logos_dir, img_filename), "wb") as f:
        f.write(image_bytes)
    print(f"Extracted embedded logo: {img_filename}")

# 3. Extract photos and logos from Brochure
doc_brochure = fitz.open(os.path.join(workspace, "Red Black and White Modern Corporate Startup Brochure.pdf"))
for p_idx, page in enumerate(doc_brochure):
    pix = page.get_pixmap(dpi=200)
    page_img_path = os.path.join(images_dir, f"brochure-page-{p_idx + 1}.png")
    pix.save(page_img_path)
    print(f"Rendered brochure page {p_idx+1}")
    
    # Extract embedded images
    for i, img in enumerate(page.get_images()):
        xref = img[0]
        base_image = doc_brochure.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        img_name = f"brochure-p{p_idx+1}-img{i+1}.{image_ext}"
        with open(os.path.join(images_dir, img_name), "wb") as f:
            f.write(image_bytes)
        print(f"Extracted brochure image: {img_name} ({len(image_bytes)} bytes)")

# 4. Extract from Banner PDF
doc_banner = fitz.open(os.path.join(workspace, "App Development Startup Banner Banner in Blue Purple and White Corporate Geometric Style.pdf"))
for p_idx in range(min(2, len(doc_banner))):
    page = doc_banner[p_idx]
    pix = page.get_pixmap(dpi=200)
    pix.save(os.path.join(images_dir, f"banner-page-{p_idx+1}.png"))
    for i, img in enumerate(page.get_images()):
        xref = img[0]
        base_image = doc_banner.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        img_name = f"banner-p{p_idx+1}-img{i+1}.{image_ext}"
        with open(os.path.join(images_dir, img_name), "wb") as f:
            f.write(image_bytes)
        print(f"Extracted banner image: {img_name}")

print("All assets extracted successfully!")
