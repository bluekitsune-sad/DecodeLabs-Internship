# Project 3 — Tech Stack Recommender

## Project Title

**Tech Stack Recommender** — a content-based job-role recommendation system.

## Problem Statement

People entering tech often wonder *"which job role fits my skills?"* Given a
few skills or interests, the system should recommend the most similar job
roles / career paths from a small dataset, without requiring any historical
user behaviour.

## Objective

Build a practical content-based recommendation system that maps a user's
skills, interests and career goals to relevant technologies, tools and job
roles, using:

```text
TF-IDF Vectorization
+ Cosine Similarity
+ Ranking (descending)
+ Top-3 Filtering
```

The system uses **content-based filtering** to rank job roles by skill
similarity.

## Content-Based Filtering

The engine compares what the **user** knows (a skills profile) against the
skill attributes of each **recommendation item** (a job role). Items are scored
purely from their own metadata, so new roles work immediately as long as they
have valid skill lists. No interaction history from thousands of users is
needed.

## Dataset

`data/raw_skills.csv` — a small dataset of 12 job roles with their associated
skill sets.

> The repository did **not** contain an official `raw_skills.csv`, so this is
> an **implementation dataset** created for this project (documented as such,
> per the PRD). It represents realistic career paths such as Data Scientist,
> DevOps Engineer, Cloud Engineer, Backend/Frontend/Full Stack Developer,
> System Administrator, Network Engineer, Security Analyst and more.

Columns:

```text
role     — the job role / career path (the recommendation item)
skills   — comma-separated list of skills associated with that role
```

## User Input

The user enters at least **3 skills/interests**, separated by commas.

Example:

```text
Python, Cloud Computing, Automation
```

Input is validated before recommendation:

- Each skill is trimmed and lowercased
- Empty entries are removed
- Fewer than 3 non-empty skills are rejected with a retry prompt

## Feature Extraction

Each job role's skill list is turned into one text document, and the whole
collection is converted into numerical vectors using TF-IDF (term frequency,
inverse document frequency). This measures how descriptive a term is: common
terms get less weight, distinctive skills get more.

## TF-IDF

Uses `sklearn.feature_extraction.text.TfidfVectorizer`:

```text
Job-role skill text  →  item TF-IDF vectors
User skill text      →  user TF-IDF vector
```

The user vector and the item vectors therefore live in the **same** vector
space.

## Vector Mapping

The vocabulary (the shared feature space) is built by fitting the TF-IDF
vectorizer on the **item corpus**. User input is then mapped into that same
vocabulary space with `vectorizer.transform(...)`. Tokens the user enters
which are not part of the item vocabulary simply contribute no weight rather
than being treated as unrelated concepts.

## Cosine Similarity

The primary similarity metric:

```text
cos(θ) = (A · B) / (||A|| ||B||)
```

Every job role receives a similarity score between the user vector and the
role's vector. Scores range from 0 to 1 and reflect how aligned the two
"skill vectors" are in orientation (length-independent).

## Recommendation Pipeline

```text
User Profile
     ↓
Feature Extraction
     ↓
Vector Mapping (shared vocabulary)
     ↓
TF-IDF Weighting
     ↓
Cosine Similarity (score every item)
     ↓
Scoring
     ↓
Sorting (descending)
     ↓
Filtering
     ↓
Top 3 Recommendations
```

### Step 1 — Ingestion
Collect and validate at least three user skills.

### Step 2 — Scoring
For each role: compute cosine similarity between the user vector and the
role's vector, and store the score.

### Step 3 — Sorting
Sort all roles by similarity score in **descending** order (highest first).

### Step 4 — Filtering
Return only the top **3** roles.

## Ranking

Output is displayed as:

```text
Rank   Recommendation    Similarity
1      DevOps Engineer    37.2%  (0.372)
```

Scores are shown both as a percentage (for readability) and as the underlying
numeric score (for transparency).

## Top-3 Filtering

The final result always contains the three highest-ranked recommendations
(where at least three valid candidates exist).

## Cold Start

- **User cold start:** if the user provides fewer than three meaningful skills,
  the engine refuses to produce meaningless similarity results and asks again.
- **Item cold start:** any new role with a valid skill list is immediately
  recommendable — content-based filtering works from item attributes and does
  not require interaction history.

## How to Run

Requires Python 3 with `pandas` and `scikit-learn`:

```bash
pip install -r requirements.txt
```

Run from the project folder:

```bash
python src/main.py
```

Run the tests from the project folder:

```bash
python -m unittest discover -s tests -p "test_*.py"
```

## Example Input

```text
Enter at least 3 skills/interests, separated by commas: python, docker, linux
```

## Example Output

```text
============================================================
TOP 3 RECOMMENDED CAREER PATHS
============================================================
Rank  Recommendation            Similarity
1     DevOps Engineer           37.2%  (0.372)
2     Backend Developer         32.0%  (0.320)
3     Security Analyst          17.5%  (0.175)

Recommendations are based on the similarity between your skills and each
role's skill profile (cosine similarity of TF-IDF vectors).
```

## Project Structure

```text
Project-3-Tech-Stack-Recommender/
│
├── data/
│   └── raw_skills.csv
├── src/
│   ├── data_loader.py
│   ├── recommender.py
│   └── main.py
├── tests/
│   └── test_recommender.py
├── results/
│   └── (outputs such as saved results, if generated)
├── README.md
├── requirements.txt
└── .gitignore
```

## Limitations

- Implementation dataset: small (12 roles), so coverage of the full tech
  landscape is limited
- No synonym/alias handling: "Web Design" and "Frontend Development" are
  distinct tokens unless the dataset uses the same wording
- Terms entered by the user that are absent from the vocabulary are ignored
- Scores depend on dataset wording; a broader corpus would give richer results

## Future Improvements

- Expand the dataset with more roles and canonical skill terminology
- Add a small synonym/alias mapping for common alternative phrasings
- Add a web UI in front of the recommender
- Let users weight which skills matter most
- Persist user profiles and recommendations to a database
- Visualize similarity scores with charts