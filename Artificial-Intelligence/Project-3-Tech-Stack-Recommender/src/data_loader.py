"""Load the tech-stack skill dataset from a CSV file."""

import pandas as pd


def load_skills_csv(path):
    """Read the raw_skills.csv dataset and return a cleaned DataFrame.

    Expected columns: ``role`` (job role / career path) and ``skills``
    (comma-separated list of associated skills).
    """
    df = pd.read_csv(path)

    required = {"role", "skills"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(
            f"Dataset must contain columns: {sorted(required)}. Missing: {sorted(missing)}"
        )

    df = df.dropna(subset=["role", "skills"]).copy()
    df["role"] = df["role"].astype(str).str.strip()
    df["skills"] = df["skills"].astype(str).str.strip()
    df = df[df["role"] != ""].reset_index(drop=True)

    if df.empty:
        raise ValueError("Dataset contains no valid job roles.")

    return df