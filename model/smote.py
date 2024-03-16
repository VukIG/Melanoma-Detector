from imblearn.over_sampling import SMOTE
import os
import cv2
import numpy as np

benign_dir = '/home/vuk/Documents/ML_Data/HAM/train/benign'
malignant_dir = '/home/vuk/Documents/ML_Data/HAM/train/malignant'

images = []
labels = []

def load_and_preprocess_images(directory):
    for filename in os.listdir(directory):
        img = cv2.imread(os.path.join(directory, filename), cv2.IMREAD_GRAYSCALE)
        img = img.flatten()
        images.append(img)
        labels.append(0 if 'benign' in directory else 1)
    return np.array(images), np.array(labels)

X_benign, y_benign = load_and_preprocess_images(benign_dir)
X_malignant, y_malignant = load_and_preprocess_images(malignant_dir)

X = np.concatenate((X_benign, X_malignant))
y = np.concatenate((y_benign, y_malignant))

smote = SMOTE(sampling_strategy='minority', random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Assuming the images were originally grayscale and resized to 64x64
# Adjust the reshaping dimensions to match the original image size
X_resampled_images = X_resampled.reshape(-1, 64, 64)

if not os.path.exists(malignant_dir):
    os.makedirs(malignant_dir)

for i, img in enumerate(X_resampled_images):
    cv2.imwrite(os.path.join(malignant_dir, f'malignant_{i}.png'), img)
