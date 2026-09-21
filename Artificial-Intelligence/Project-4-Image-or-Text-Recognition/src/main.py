"""Image or Text Recognition — OCR pipeline entry point.

Pipeline:
    input image
        -> grayscale -> Gaussian blur -> adaptive thresholding
        -> Tesseract OCR (pytesseract)
        -> extracted text

Outputs:
    output/processed_image.jpg   preprocessed image (visual confirmation)
    output/extracted_text.txt    recognized text
"""

import os

from ocr import extract_text
from preprocessing import preprocess

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def run_pipeline(image_path, output_dir=None):
    """Run the full OCR pipeline on the given image.

    Returns a dict with the processed image path and extracted text.
    """
    output_dir = output_dir or os.path.join(PROJECT_ROOT, "output")
    os.makedirs(output_dir, exist_ok=True)

    processed_path = os.path.join(output_dir, "processed_image.jpg")
    text_path = os.path.join(output_dir, "extracted_text.txt")

    print(f"[1/3] Preprocessing image: {image_path}")
    preprocess(image_path, processed_path)
    print(f"      -> processed image saved to {processed_path}")

    print(f"[2/3] Running Tesseract OCR on {processed_path}")
    text = extract_text(processed_path)
    print(f"      -> {len(text)} characters recognized")

    print(f"[3/3] Saving extracted text to {text_path}")
    with open(text_path, "w", encoding="utf-8") as f:
        f.write(text + "\n")

    return {"processed_image": processed_path, "extracted_text": text_path}


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="OCR pipeline: preprocess an image and extract its text."
    )
    parser.add_argument(
        "image",
        nargs="?",
        default=os.path.join(PROJECT_ROOT, "input", "sample.jpg"),
        help="Path to the input image (default: input/sample.jpg)",
    )
    args = parser.parse_args()

    result = run_pipeline(args.image)

    print("\n=== Extracted text ===")
    with open(result["extracted_text"], encoding="utf-8") as f:
        print(f.read())
    print("======================")


if __name__ == "__main__":
    main()