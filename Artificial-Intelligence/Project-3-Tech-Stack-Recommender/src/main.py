"""Tech Stack Recommender - command-line interface.

Asks the user for at least three skills/interests, validates the input,
runs the content-based recommendation engine and displays the Top 3
recommended job roles with their similarity scores.
"""

import os

from data_loader import load_skills_csv
from recommender import MIN_SKILLS, TechStackRecommender, validate_skills

DATA_PATH = os.path.join(
    os.path.dirname(__file__), "..", "data", "raw_skills.csv"
)


def ask_for_skills():
    """Prompt until the user provides at least three non-empty skills."""
    while True:
        raw = input(
            f"Enter at least {MIN_SKILLS} skills/interests, separated by commas: "
        )
        parts = [p for p in raw.split(",")]
        try:
            return validate_skills(parts)
        except ValueError as exc:
            print(f"  {exc}")


def print_results(results):
    print("\n" + "=" * 60)
    print("TOP 3 RECOMMENDED CAREER PATHS")
    print("=" * 60)
    print(f"{'Rank':<6}{'Recommendation':<26}{'Similarity'}")
    for rank, item in enumerate(results, start=1):
        score = item["score"]
        print(f"{rank:<6}{item['role']:<26}{score * 100:.1f}%  ({score:.3f})")


def main():
    print("=" * 60)
    print("TECH STACK RECOMMENDER")
    print("Content-based filtering | TF-IDF | Cosine Similarity")
    print("=" * 60)
    print(
        "Tell me about your skills and interests, and I will recommend the\n"
        "most similar job roles / career paths from the dataset."
    )

    df = load_skills_csv(DATA_PATH)
    recommender = TechStackRecommender(df["role"], df["skills"].str.split(","))

    skills = ask_for_skills()
    results = recommender.recommend(skills)

    print_results(results)

    print("\nRecommendations are based solely on the similarity between your")
    print("skills and each role's skill profile (cosine similarity of TF-IDF")
    print("vectors). No user history or external AI is used.")


if __name__ == "__main__":
    main()