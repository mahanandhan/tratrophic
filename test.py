
import numpy as np

from tratrophicai import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score


# ==========================================
# DATASET
# ==========================================

years = np.array([
    1.2, 1.4, 1.6, 2.1, 2.3, 3.0, 3.1, 3.3, 3.3, 3.8,
    4.0, 4.1, 4.1, 4.2, 4.6, 5.0, 5.2, 5.4, 6.0, 6.1,
    6.9, 7.2, 8.0, 8.3, 8.8, 9.1, 9.6, 9.7, 10.4, 10.6
], dtype=np.float64)

salary = np.array([
    39344.0, 46206.0, 37732.0, 43526.0, 39892.0, 56643.0,
    60151.0, 54446.0, 64446.0, 57190.0, 63219.0, 55795.0,
    56958.0, 57082.0, 61112.0, 67939.0, 66030.0, 83089.0,
    81364.0, 93941.0, 91739.0, 98274.0, 101303.0, 113813.0,
    109432.0, 105583.0, 116970.0, 112636.0, 122392.0, 121873.0
], dtype=np.float64)


# ==========================================
# SPLIT DATASET
# ==========================================

X = years.reshape(-1, 1)
y = salary

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==========================================
# TRAIN TRATROPHICAI MODEL
# ==========================================

model = LinearRegression(
    learning_rate=0.01,
    iterations=20000
)

model.fit(X_train, y_train)


# ==========================================
# PREDICTIONS
# ==========================================

train_predictions = model.predict(X_train)
test_predictions = model.predict(X_test)


# ==========================================
# MODEL EVALUATION
# ==========================================

train_r2 = r2_score(y_train, train_predictions)
test_r2 = r2_score(y_test, test_predictions)


# ==========================================
# RESULTS
# ==========================================

print("\n========== TRATROPHICAI LINEAR REGRESSION ==========")

print("\nIntercept:", model.intercept)
print("Coefficient:", model.coef)

print("\nTrain R²:", train_r2)
print("Test R²:", test_r2)


# ==========================================
# PREDICTIONS COMPARISON
# ==========================================

print("\n========== PREDICTIONS ==========")

print("\nActual Test Values:")
print(y_test)

print("\nPredicted Test Values:")
print(test_predictions)


# ==========================================
# MODEL STATUS
# ==========================================

print("\n========== MODEL STATUS ==========")

if test_r2 >= 0.90:
    print("Good performance on this test dataset.")
elif test_r2 >= 0.70:
    print("Moderate performance on this test dataset.")
else:
    print("The model may need improvement.")

print("\nTratrophicAI test completed!")
