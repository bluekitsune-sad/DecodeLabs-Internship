"""Content-based Tech Stack Recommender.

Pipeline:
  User Profile -> Feature Extraction -> TF-IDF Vector -> Cosine Similarity
  -> Scoring -> Sorting (descending) -> Filtering -> Top 3

Uses content-based filtering only (no collaborative filtering, no LLM).
"""

import re

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

MIN_SKILLS = 3
DEFAULT_TOP_N = 3


def normalize_skill(skill):
    """Normalize a single skill: lowercase and collapse internal whitespace."""
    return re.sub(r"\s+", " ", skill.strip().lower())


def validate_skills(skills):
    """Return a cleaned list of non-empty skills, or raise ValueError.

    The recommendation engine requires at least three meaningful inputs.
    """
    clean = [normalize_skill(s) for s in skills]
    clean = [s for s in clean if s]
    if len(clean) < MIN_SKILLS:
        raise ValueError(
            f"At least {MIN_SKILLS} non-empty skills/interests are required "
            f"(got {len(clean)})."
        )
    return clean


class TechStackRecommender:
    """Recommends job roles based on cosine similarity of TF-IDF vectors."""

    def __init__(self, roles, skill_sets, top_n=DEFAULT_TOP_N):
        self.roles = list(roles)
        self.top_n = top_n

        # Corpus: each job role becomes one document describing its skills.
        corpus = [
            " ".join(normalize_skill(s) for s in skills) for skills in skill_sets
        ]

        # Fit the TF-IDF vocabulary on the item corpus so that user input is
        # mapped into the SAME vector space as the recommendation items.
        self.vectorizer = TfidfVectorizer()
        self.item_matrix = self.vectorizer.fit_transform(corpus)

    def recommend(self, skills):
        """Return the top ``n`` job roles ranked by cosine similarity."""
        clean = validate_skills(skills)

        user_vector = self.vectorizer.transform([" ".join(clean)])

        # Cosine similarity between the user vector and every item vector.
        scores = cosine_similarity(user_vector, self.item_matrix).flatten()

        # Descending sort: highest similarity score first.
        order = scores.argsort()[::-1]

        results = [
            {
                "role": self.roles[index],
                "score": float(scores[index]),
            }
            for index in order[: self.top_n]
        ]
        return results