import numpy as np
def train_test_split(X, y, test_size = 0.2):
    X = np.array(X)
    y = np.array(y)
    m = len(X)
    indices = np.random.permutation(m)
    test_count = int(m*test_size)
    test_indices = indices[:test_count]
    train_indices = indices[test_count:]
    X_train = X[train_indices]
    X_test = X[test_indices]
    y_train = y[train_indices]
    y_test = y[test_indices]
    return X_train, X_test, y_train, y_test