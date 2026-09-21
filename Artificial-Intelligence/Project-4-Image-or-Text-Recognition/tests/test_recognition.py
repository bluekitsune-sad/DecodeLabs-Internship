"""Tests for the OCR pipeline (AI Project 4).

Runs the full pipeline over the bundled sample image and asserts that
the expected text is recognized and the processed image is produced.
"""

import os
import unittest

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAMPLE = os.path.join(PROJECT_ROOT, "input", "sample.jpg")


class TestOcrPipeline(unittest.TestCase):

    def test_pipeline_extracts_expected_text(self):
        import sys

        sys.path.insert(0, os.path.join(PROJECT_ROOT, "src"))
        from main import run_pipeline

        result = run_pipeline(SAMPLE, output_dir=os.path.join(PROJECT_ROOT, "output", "test"))

        self.assertTrue(os.path.isfile(result["processed_image"]))

        with open(result["extracted_text"], encoding="utf-8") as f:
            text = f.read()
        for expected in ("DecodeLabs", "OCR", "Tesseract"):
            self.assertIn(expected, text, f"expected {expected!r} in extracted text")


if __name__ == "__main__":
    unittest.main()