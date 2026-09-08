"""DecodeLabs AI Project 2 - Data Classification Using AI.

Builds a K-Nearest Neighbors (KNN) classifier on the classic Iris dataset.

Pipeline:
  Load Dataset -> Understand Dataset -> Separate Features/Target
  -> Feature Scaling (StandardScaler) -> Train/Test Split
  -> Create KNN -> Train -> Predict -> Evaluate -> Display Results

No data leakage: the StandardScaler is fitted on training data only and then
applied to the test data.
"""

import os

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.metrics import (
    ConfusionMatrixDisplay,
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

RANDOM_STATE = 42
TEST_SIZE = 0.2
N_NEIGHBORS = 5

RESULTS_DIR = os.path.join(os.path.dirname(__file__), "results")


def main() -> None:
    # ----------------------------------------------------------------
    # 1. Load Dataset
    # ----------------------------------------------------------------
    iris = load_iris()
    X = iris.data
    y = iris.target
    feature_names = iris.feature_names
    target_names = iris.target_names

    # ----------------------------------------------------------------
    # 2. Understand Dataset
    # ----------------------------------------------------------------
    print("=" * 60)
    print("IRIS DATA CLASSIFICATION WITH KNN")
    print("=" * 60)
    print(f"Number of samples: {X.shape[0]}")
    print(f"Number of features: {X.shape[1]} -> {feature_names}")
    print(f"Number of classes: {len(target_names)} -> {target_names}")

    df = pd.DataFrame(X, columns=feature_names)
    df["species"] = pd.Series(y).map({i: name for i, name in enumerate(target_names)})
    print("\nDataset preview (first 5 rows):")
    print(df.head())
    print("\nClass distribution in the full dataset:")
    print(df["species"].value_counts())

    print("\nFeature statistics:")
    print(df.describe())

    # ----------------------------------------------------------------
    # 3. Separate Features and Target
    # ----------------------------------------------------------------
    # X and y are already separated by load_iris(); no further action needed.

    # ----------------------------------------------------------------
    # 4. Train/Test Split (stratified, reproducible)
    # ----------------------------------------------------------------
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y,
    )
    print(f"\nTrain samples: {len(X_train)} | Test samples: {len(X_test)}")

    # ----------------------------------------------------------------
    # 5. Feature Scaling (StandardScaler, fit on train only - no leakage)
    # ----------------------------------------------------------------
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # ----------------------------------------------------------------
    # 6. Create + Train KNN Model
    # ----------------------------------------------------------------
    model = KNeighborsClassifier(n_neighbors=N_NEIGHBORS)
    model.fit(X_train_scaled, y_train)

    # ----------------------------------------------------------------
    # 7. Predict Test Data
    # ----------------------------------------------------------------
    predictions = model.predict(X_test_scaled)

    # ----------------------------------------------------------------
    # 8. Evaluate Predictions
    # ----------------------------------------------------------------
    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions, average="weighted", zero_division=0)
    recall = recall_score(y_test, predictions, average="weighted", zero_division=0)
    f1 = f1_score(y_test, predictions, average="weighted")
    cm = confusion_matrix(y_test, predictions)

    print("\n" + "=" * 60)
    print("EVALUATION RESULTS")
    print("=" * 60)
    print(f"Accuracy:  {accuracy:.4f}")
    print(f"Precision: {precision:.4f} (weighted)")
    print(f"Recall:    {recall:.4f} (weighted)")
    print(f"F1 Score:  {f1:.4f} (weighted)")
    print("\nConfusion Matrix (rows = actual, columns = predicted):")
    print(cm)

    # ----------------------------------------------------------------
    # 9. Display Results (confusion matrix plot)
    # ----------------------------------------------------------------
    os.makedirs(RESULTS_DIR, exist_ok=True)

    disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=target_names)
    disp.plot(cmap="Blues", colorbar=False)
    plt.title("Confusion Matrix - KNN on Iris Dataset")
    plt.xlabel("Predicted label")
    plt.ylabel("Actual label")

    plot_path = os.path.join(RESULTS_DIR, "confusion_matrix.png")
    plt.savefig(plot_path, dpi=150, bbox_inches="tight")
    plt.close()
    print(f"\nConfusion matrix saved to: {plot_path}")

    # A few example predictions for transparency.
    print("\nExample predictions (first 10 test samples):")
    print("Actual      -> Predicted")
    for i in range(10):
        actual = target_names[y_test[i]]
        predicted = target_names[predictions[i]]
        marker = "" if actual == predicted else "   <-- MISMATCH"
        print(f"{actual:<11}-> {predicted}{marker}")


if __name__ == "__main__":
    main()