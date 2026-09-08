# Project 2 — Data Classification Using AI

## Project Title

**Iris Flower Classification Using K-Nearest Neighbors (KNN)**

## Problem Statement

Given measurements of an Iris flower (sepal length, sepal width, petal length,
petal width), can a machine learning model predict which of the three Iris
species the flower belongs to? The dataset is small (150 samples) but well
balanced, which makes it a perfect benchmark for learning supervised
classification.

## Objective

Build a basic supervised classification model that:

- Loads and inspects a real dataset
- Separates features from the target label
- Splits data into training and test sets
- Scales the features
- Trains a K-Nearest Neighbors (KNN) classifier
- Makes predictions on unseen test data
- Evaluates the model thoroughly (accuracy, precision, recall, F1,
  confusion matrix)

## Dataset

The classic **Iris dataset** from scikit-learn (`sklearn.datasets.load_iris`).

```text
Samples: 150
Classes: 3
Features: 4
```

## Dataset Description

- 150 flower samples
- 3 species (classes): **setosa**, **versicolor**, **virginica** — 50 samples each
- 4 numeric measurements per sample:
  - sepal length (cm)
  - sepal width (cm)
  - petal length (cm)
  - petal width (cm)
- The target is the species label (0, 1, 2)

## Features

The four features used for classification:

```text
sepal length (cm)
sepal width (cm)
petal length (cm)
petal width (cm)
```

## Machine Learning Approach

**Supervised learning with K-Nearest Neighbors (KNN).**

KNN classifies a new sample by looking at the `k` closest training samples in
feature space and taking a majority vote of their labels. It is a simple,
interpretable algorithm well suited to visually-verifiable benchmark datasets
like Iris.

## Preprocessing

The dataset ships clean (no missing values, all numeric), so the main
preprocessing step is **feature scaling**.

## Feature Scaling

Features have very different scales (e.g. sepal width ranges 2.0–4.4 while
petal length ranges 1.0–6.9). KNN relies on distances, so features must be
scaled to equal importance.

`StandardScaler` is used:

```python
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

**No data leakage:** the scaler is fitted **only on the training data**, then
applied to both training and test data.

## Train/Test Split

The dataset is split **80% training / 20% testing**:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

- `stratify=y` keeps the class distribution balanced in both sets
- `random_state=42` makes the split reproducible

## KNN Algorithm

```python
model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train_scaled, y_train)
predictions = model.predict(X_test_scaled)
```

`n_neighbors = 5` follows the DecodeLabs instructional material.

## Model Training

The scaled training features (`X_train_scaled`) and training labels (`y_train`)
are passed to `model.fit()`. No further tuning is needed for this baseline.

## Evaluation Metrics

The model is evaluated with:

```text
Accuracy
Precision   (weighted)
Recall      (weighted)
F1 Score    (weighted)
Confusion Matrix
```

For multi-class classification, precision/recall/F1 use the **weighted**
averaging strategy, which weights each class by the number of true samples.

## Confusion Matrix

The confusion matrix shows actual vs predicted labels per class and is both
printed in the console and saved as an image:

```
results/confusion_matrix.png
```

## Results

Run from a clean environment with `random_state=42`:

```text
Accuracy:  0.9333
Precision: 0.9444 (weighted)
Recall:    0.9333 (weighted)
F1 Score:  0.9327 (weighted)

Confusion Matrix (rows = actual, columns = predicted):
[[10  0  0]
 [ 0 10  0]
 [ 0  2  8]]
```

Interpretation: every `setosa` and `versicolor` test sample was classified
correctly; 2 of 10 `virginica` samples were misclassified as `versicolor`.

## How to Run

1. Install Python 3 and the required packages:

```bash
pip install -r requirements.txt
```

2. Run the program:

```bash
python main.py
```

3. Open the generated confusion matrix:

```text
results/confusion_matrix.png
```

## Project Structure

```text
Project-2-Data-Classification/
│
├── main.py
├── README.md
├── requirements.txt
├── results/
│   └── confusion_matrix.png
└── .gitignore
```

## Limitations

- Small dataset (150 samples) → results may not generalise to other domains
- Baseline KNN with `n_neighbors=5` only, no hyperparameter search
- No error analysis beyond the confusion matrix
- KNN is a distance-based method; it slows down on very large datasets

## Future Improvements

- Try cross-validation to estimate performance more reliably
- Experiment with other `n_neighbors` values and distance metrics
- Compare KNN against other classifiers (e.g. logistic regression, decision
  tree)
- Add plots of feature distributions and decision regions
- Save predictions to a CSV for further analysis