import numpy as np

class StandardScalar:
    def __init__(self):
        self.mean = None
        self.std = None
    def fit(self, X):
        X = np.array(X, dtype=float)
        self.mean = np.mean(X, axis=0)
        self.std = np.std(X, axis=0)
        self.std[self.std == 0] = 1
        return self

    def transform(self, X):
        X = np.array(X, dtype=float)
        X_scaled = (X - self.mean)/self.std
        return X_scaled
    def fit_transform(self, X):
        self.fit(X)
        return self.transform(X)