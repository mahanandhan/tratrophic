import numpy as np
from tratrophicai.preprocessing import StandardScalar
class LinearRegression:
    def __init__(self, learning_rate = 0.01, iterations=20000):
        self.coef = None
        self.intercept = 0.0
        self.learning_rate = learning_rate
        self.iterations = iterations
        self.scalar = StandardScalar()
    def fit(self, X, y):
        X = np.array(X, dtype=float)
        y = np.array(y, dtype=float)
        X = self.scalar.fit_transform(X)
        m = X.shape[0]
        n = X.shape[1]
        self.coef = np.zeros(n)
        self.intercept = 0.0
        for _ in range(self.iterations):
            # creating the prediction part which should be match to original which is y_predict
            y_predict = np.dot(X, self.coef) + self.intercept
            # creating the deravitive part of w called dw
            dw = (2/m)*np.dot(X.T, (y_predict - y))
            # creating the deravitive part of c called dc
            dc = (2/m)*np.sum(y_predict-y)
            self.coef = self.coef - self.learning_rate*dw
            self.intercept = self.intercept - self.learning_rate*dc
        return self
    def predict(self, X):
        X = np.array(X, dtype=float)
        X = self.scalar.transform(X)
        y_predict = np.dot(X, self.coef) + self.intercept
        return y_predict
    
