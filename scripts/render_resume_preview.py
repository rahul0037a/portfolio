"""Render the original resume for browsers without an embedded PDF viewer.

Requires pypdfium2 and Pillow. Run from any directory after replacing the PDF.
The rendered pages are static web assets; the original PDF remains unchanged.
"""
import json
from pathlib import Path

import pypdfium2 as pdfium

root = Path(__file__).resolve().parent.parent
public = root / "public"
document = pdfium.PdfDocument(public / "Rahul_Rathi_Resume_v4.pdf")
pages = []

for index in range(len(document)):
    page = document[index]
    bitmap = page.render(scale=2.4)
    picture = bitmap.to_pil()
    filename = "resume-preview.webp" if index == 0 else f"resume-preview-page{index + 1}.webp"
    picture.save(public / filename, "WEBP", quality=92, method=6)
    pages.append({"src": f"/{filename}", "width": picture.width, "height": picture.height})
    picture.close()
    bitmap.close()
    page.close()

document.close()
(root / "src" / "data" / "resumePreview.json").write_text(json.dumps(pages, indent=2) + "\n", encoding="utf-8")
print(f"Rendered {len(pages)} resume pages.")
