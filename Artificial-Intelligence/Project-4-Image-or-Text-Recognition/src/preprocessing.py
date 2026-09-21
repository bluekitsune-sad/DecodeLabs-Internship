"""Image preprocessing for the OCR pipeline.

Pipeline step: grayscale -> Gaussian blur -> adaptive thresholding.
The processed image is saved so the transformation can be visually confirmed.
"""

import cv2


def preprocess(image_path, output_path):
    """Load an image, apply the preprocessing pipeline, and save the result.

    Returns the processed image (BGR ndarray) for further use.
    """
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Could not read image: {image_path}")

    # Step 1 — Grayscale: simplify the image and discard color information.
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Step 2 — Gaussian blur: reduce noise before thresholding/OCR.
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Step 3 — Adaptive thresholding: separate foreground text from background.
    # Gaussian adaptive threshold with a neighborhood of 31 pixels.
    binary = cv2.adaptiveThreshold(
        blurred,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        11,
    )

    cv2.imwrite(output_path, binary)
    return binary


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Preprocess an image for OCR.")
    parser.add_argument("image", help="Path to the input image")
    parser.add_argument(
        "-o",
        "--output",
        default="output/processed_image.jpg",
        help="Path for the processed image",
    )
    args = parser.parse_args()

    processed = preprocess(args.image, args.output)
    print(f"Processed image saved to: {args.output} ({processed.shape[1]}x{processed.shape[0]})")


if __name__ == "__main__":
    main()