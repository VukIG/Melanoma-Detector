import numpy as np
from sklearn.feature_selection import mutual_info_classif, SelectKBest
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
from skrvm import RVC

# Placeholder functions for preprocessing, handcraft_features, deep_learning_features
def preprocessing(img):
    # Example preprocessing steps
    return img

def handcraft_features(img):
    # Example handcrafted feature extraction
    return np.array([1, 2, 3])  # Placeholder array

def deep_learning_features(img):
    # Example deep learning feature extraction
    return np.array([4, 5, 6])  # Placeholder array

# Define the wrapping_features function as requested
def wrapping_features(img):
    img_roi = preprocessing(img)
    hf = handcraft_features(img_roi)
    dlf = deep_learning_features(img_roi)
    # Ensure hf and dlf are 2D arrays before concatenation
    extracted_features = np.concatenate([hf[np.newaxis, :], dlf[np.newaxis, :]], axis=1)
    return extracted_features

# Assuming images and labels are your dataset
images = [np.random.rand(100, 100) for _ in range(100)]  # Example images
labels = np.random.choice(['class1', 'class2'], size=100)  # Example labels

# Encode labels if they are not numeric
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)

# Apply wrapping_features function across your dataset
combined_features = np.array([wrapping_features(img) for img in images])

# Select the top N features based on mutual information
N = 100  # Adjust N as needed
selector = SelectKBest(mutual_info_classif, k=N).fit(combined_features, encoded_labels)
selected_features = selector.transform(combined_features)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(selected_features, encoded_labels, test_size=0.2, random_state=42)

# Models to be tested, including RVC now
models = {
    "LogisticRegression": LogisticRegression(max_iter=1000),
    "SVC": SVC(),
    "RVC": RVC(kernel='rbf')  # Using RBF kernel as per the example
}

# Hyperparameter tuning setup for RVC and others
param_grid = {
    "LogisticRegression": {"C": [0.01, 0.1, 1, 10]},
    "SVC": {"C": [0.1, 1, 10], "kernel": ["linear", "rbf"]},
    "RVC": {"alpha": [1e-6, 1e-4, 1e-2], "beta": [1e-6, 1e-4, 1e-2]}
}

# Model selection and hyperparameter tuning
best_models = {}
for model_name in models:
    grid_search = GridSearchCV(models[model_name], param_grid[model_name], cv=5, scoring='accuracy', n_jobs=-1)
    grid_search.fit(X_train, y_train)
    best_models[model_name] = grid_search.best_estimator_
    print(f"{model_name} best score: {grid_search.best_score_}")

# Model evaluation
for model_name, model in best_models.items():
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print(f"{model_name} Test Accuracy: {accuracy}")
    print(f"Classification Report for {model_name}:")
    print(classification_report(y_test, predictions))
    print("---------------------------------------------------\n")
