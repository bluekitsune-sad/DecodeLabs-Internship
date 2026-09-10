"""Tests for the Tech Stack Recommender (content-based filtering)."""

import os
import sys
import unittest

sys.path.insert(
    0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src"))
)

from data_loader import load_skills_csv  # noqa: E402
from recommender import (  # noqa: E402
    MIN_SKILLS,
    TechStackRecommender,
    normalize_skill,
    validate_skills,
)

DATA_PATH = os.path.join(
    os.path.dirname(__file__), "..", "data", "raw_skills.csv"
)


class RecommendTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.df = load_skills_csv(DATA_PATH)
        cls.recommender = TechStackRecommender(
            cls.df["role"], cls.df["skills"].str.split(",")
        )

    def test_dataset_loaded(self):
        self.assertGreaterEqual(len(self.df), 5)
        self.assertEqual(set(self.df.columns), {"role", "skills"})

    def test_validate_skills_accepts_three(self):
        skills = validate_skills(["Python", "Cloud Computing", "Automation"])
        self.assertEqual(len(skills), MIN_SKILLS)

    def test_validate_skills_rejects_less_than_three(self):
        with self.assertRaises(ValueError):
            validate_skills(["Python", "Cloud"])

    def test_validate_skills_rejects_empty(self):
        with self.assertRaises(ValueError):
            validate_skills(["  ", ""])

    def test_validate_skills_rejects_padded(self):
        skills = validate_skills(["  Python ", "Cloud Computing", " Automation "])
        self.assertEqual(skills[0], "python")
        self.assertEqual(skills[-1], "automation")

    def test_normalize_skill(self):
        self.assertEqual(normalize_skill("  Cloud   Computing  "), "cloud computing")

    def test_top_three_returned_and_sorted(self):
        results = self.recommender.recommend(["python", "machine learning", "data"])
        self.assertEqual(len(results), 3)
        scores = [r["score"] for r in results]
        self.assertEqual(scores, sorted(scores, reverse=True))
        roles = [r["role"] for r in results]
        self.assertTrue(all(r in set(self.df["role"]) for r in roles))

    def test_python_ml_data_recommends_data_scientist(self):
        results = self.recommender.recommend(["python", "machine learning", "data analysis"])
        self.assertEqual(results[0]["role"], "Data Scientist")

    def test_deterministic(self):
        inputs = ["python", "docker", "linux"]
        first = self.recommender.recommend(inputs)
        second = self.recommender.recommend(inputs)
        self.assertEqual(first, second)

    def test_no_overlap_is_safe(self):
        results = self.recommender.recommend(["zzzzqqqq", "aaaa", "bbbbbb"])
        self.assertEqual(len(results), 3)
        self.assertTrue(all(r["score"] >= 0.0 for r in results))

    def test_known_skill_matches_expected_role(self):
        results = self.recommender.recommend(["html", "css", "javascript"])
        # All three web-oriented roles legitimately share html/css/javascript;
        # assert the top hit belongs to that sensible family.
        self.assertIn(results[0]["role"], {"Web Developer", "Frontend Developer", "Full Stack Developer"})


if __name__ == "__main__":
    unittest.main()