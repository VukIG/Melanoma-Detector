import numpy as np
import pandas as pd
import os
from sklearn.feature_selection import mutual_info_classif, SelectKBest
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
from skrvm import RVC
from tensorflow.keras.preprocessing.image import ImageDataGenerator

from imgCropBinaryMask import image_data_gen_preprocessing
from handcrafted import extract_handcrafted
from modelcrafted import dl_extract_features_from_img


# Specify the directory containing your training and validation images
train_dir = '/home/vuk/Documents/ML_Data/HAM/train'
test_dir = '/home/vuk/Documents/ML_Data/HAM/test'
valid_dir = '/home/vuk/Documents/ML_Data/HAM/validate'
csv_file = '/home/vuk/Documents/ML_Data/HAM/HAM10000_metadata.csv'

numerOfImages = 10005
image_height = image_width = 224
batch_size = 32
num_epochs = 9


# Load labels from CSV file
labels_df = pd.read_csv(csv_file)
labels_dict = dict(zip(labels_df['image_id'], labels_df['dx']))

# maybe use this? dataset = tf.data.Dataset.from_tensor_slices(images)
def crop_img(img):
    cropped_img, _ = image_data_gen_preprocessing(img)
    return cropped_img

def bin_mask(img):
    _, cropped_mask, _ = image_data_gen_preprocessing(img)
    return cropped_mask



# Define the wrapping_features function as requested
def wrapping_features(img):
    print(img)
    img_bin = bin_mask(img)
    hf = extract_handcrafted(img, img_bin)
    dlf = dl_extract_features_from_img(img)
    # Ensure hf and dlf are 2D arrays before concatenation
    extracted_features = np.concatenate([hf[np.newaxis, :], dlf[np.newaxis, :]], axis=1)
    return extracted_features

datagen = ImageDataGenerator(preprocessing_function=crop_img)

# Create data generators
#%%
train_generator = datagen.flow_from_directory(
    train_dir,
    target_size=(image_height, image_width),
    batch_size=batch_size,
    class_mode='binary'  # Set class_mode to 'categorical' if you have multiple classes
)

valid_generator = datagen.flow_from_directory(
    valid_dir,
    target_size=(image_height, image_width),
    batch_size=batch_size,
    class_mode='binary'  # Set class_mode to 'categorical' if you have multiple classes
)

test_generator = datagen.flow_from_directory(
    test_dir,
    target_size=(image_height, image_width),
    batch_size=batch_size,
    class_mode='binary'  # Set class_mode to 'categorical' if you have multiple classes
)

#%%
# Extract features from images
train_features = np.array([wrapping_features(image) for image, _ in train_generator])
test_features = np.array([wrapping_features(image) for image, _ in test_generator])
valid_features = np.array([wrapping_features(image) for image, _ in valid_generator])

# Encode labels
label_encoder = LabelEncoder()
train_labels = label_encoder.fit_transform([labels_dict[os.path.basename(image_path)] for image_path in train_generator.filepaths])
test_labels = label_encoder.transform([labels_dict[os.path.basename(image_path)] for image_path in test_generator.filepaths])
valid_labels = label_encoder.transform([labels_dict[os.path.basename(image_path)] for image_path in valid_generator.filepaths])

#%%
# Select top N features based on mutual information
N = 100  # Adjust N as needed
selector = SelectKBest(mutual_info_classif, k=N).fit(train_features, train_labels)
train_features_selected = selector.transform(train_features)
test_features_selected = selector.transform(test_features)
valid_features_selected = selector.transform(valid_features)

#%%
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

#%%
# Model selection and hyperparameter tuning
best_models = {}
for model_name in models:
    grid_search = GridSearchCV(models[model_name], param_grid[model_name], cv=5, scoring='accuracy', n_jobs=-1)
    grid_search.fit(train_features_selected, train_labels)
    best_models[model_name] = grid_search.best_estimator_
    print(f"{model_name} best score: {grid_search.best_score_}")

# Model evaluation
for model_name, model in best_models.items():
    predictions = model.predict(test_features_selected)
    accuracy = accuracy_score(test_labels, predictions)
    print(f"{model_name} Test Accuracy: {accuracy}")
    print(f"Classification Report for {model_name}:")
    print(classification_report(test_labels, predictions))
    print("---------------------------------------------------\n")