"""OCR extraction using Tesseract (pytesseract).

Tesseract is configured with:
    --psm 6   assume a single uniform block of text

This works well for the clean, generated sample images shipped with the project.
"""

import os

import pytesseract

# Resolve the Tesseract binary. Prefer an explicit TESSERACT_CMD environment
# variable, then the system PATH, then the standard Windows install location.
_FALLBACK_PATHS = [
    r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
]


def tesseract_cmd():
    """Return the Tesseract executable path that pytesseract should use."""
    if os.environ.get("TESSERACT_CMD"):
        return os.environ["TESSERACT_CMD"]
    for candidate in _FALLBACK_PATHS:
        if os.path.isfile(candidate):
            return candidate
    return "tesseract"


def extract_text(image_path, psm=6):
    """Run Tesseract OCR on an image and return the extracted text."""
    pytesseract.pytesseract.tesseract_cmd = tesseract_cmd()
    config = f"--psm {psm}"
    text = pytesseract.image_to_string(image_path, config=config)
    return text.strip()


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Extract text from an image with Tesseract.")
    parser.add_argument("image", help="Path to the (processed) image to recognize")
    parser.add_argument(
        "-p",
        "--psm",
        type=int,
        default=6,
        help="Tesseract Page Segmentation Mode (default: 6)",
    )
    args = parser.parse_args()

    text = extract_text(args.image, psm=args.psm)
    print("Extracted text:")
    print("---")
    print(text)
    print("---")


if __name__ == "__main__":
    main()