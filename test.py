from tratrophicai import LinearRegression

# Training data
X_train = [
    [3000, 5],
    [2000, 4],
    [1200, 2],
    [1000, 2],
    [2500, 5],
    [3200, 6],
    [2200, 4],
    [1500, 3]
]

y_train = [30, 20, 12, 10, 25, 32, 22, 15]

# Testing data
X_test = [
    [2800, 5],
    [1800, 3]
]

y_test = [28, 18]

# Create the model
model = LinearRegression()

# Train the model
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Display results
print("Weights:", model.coef)
print("Bias:", model.intercept)
print("Predictions:", predictions)
print("Actual Values:", y_test)