# AI Project 4 — Image or Text Recognition (OCR)

Recognizes text from images using an **OCR** pipeline built on OpenCV and
Tesseract (via `pytesseract`).

## Why OCR (not object detection)

The task allows either of two paths:

| Path                  | Libraries                                    |
| --------------------- | -------------------------------------------- |
| **OCR** (chosen)      | `pytesseract` + OpenCV                       |
| Object Detection      | OpenCV DNN + MobileNet-SSD model files       |

OCR was chosen because the uploaded task PDFs are image-based scans, and the
core outcome — turning pixels of text into usable words — is exactly what this
path delivers. It also requires no model download, uses only Python packages
plus a single well-known system binary (Tesseract), and is fully verifiable
against the bundled sample image.

## Pipeline

```text
input/sample.jpg
        |
        v
grayscale  (retain luminance only)
        |
        v
Gaussian blur  (reduce noise, kernel 5x5)
        |
        v
adaptive thresholding  (Gaussian, block 31, C 11 -> black/white)
        |
        v
Tesseract OCR  (pytesseract, --psm 6: single uniform text block)
        |
        v
output/extracted_text.txt
```

## Prerequisites

- Python 3.10+
- [Tesseract OCR 5](https://github.com/UB-Mannheim/tesseract) installed on the
  system (Windows: `C:\Program Files\Tesseract-OCR\tesseract.exe`). Point
  `pytesseract` at a custom location via the `TESSERACT_CMD` environment
  variable if needed.

Install Python dependencies:

```bash
pip install -r requirements.txt
```

## Usage

```bash
python src/main.py input/sample.jpg
```

Or run the stages individually:

```bash
python src/preprocessing.py input/sample.jpg -o output/processed_image.jpg
python src/ocr.py output/processed_image.jpg
```

Outputs:

- `output/processed_image.jpg` — the thresholded image (visual confirmation)
- `output/extracted_text.txt` — the recognized text

## Tests

```bash
python -m unittest discover -s tests -p "test_*.py"
```

## Sample output (bundled `input/sample.jpg`)

| Input                        | Extracted text                                 |
| ---------------------------- | ---------------------------------------------- |
| 3 lines of rendered text     | `DecodeLabs Internship` / `Project 4 - OCR Demo` / `Hello Tesseract, extract me!` |

## Files

```text
Project-4-Image-or-Text-Recognition/
├── input/
│   └── sample.jpg
├── src/
│   ├── main.py          # full pipeline + CLI
│   ├── preprocessing.py # grayscale -> blur -> threshold
│   └── ocr.py           # pytesseract wrapper
├── tests/
│   └── test_recognition.py
├── output/              # generated: processed_image.jpg, extracted_text.txt
├── requirements.txt
└── README.md
```