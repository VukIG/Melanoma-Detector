import os
import numpy as np
from keras.preprocessing.image import ImageDataGenerator, array_to_img
from imblearn.over_sampling import SMOTE

patho = {'benign': 0, 'malignant': 1}

imagegen = ImageDataGenerator()
# Load train data from drive
train_generator = imagegen.flow_from_directory("/home/vuk/Documents/ML_Data/HAM/processed/roi/", class_mode="binary", shuffle=False, batch_size=128, target_size=(224, 224), seed=42)
x = np.concatenate([train_generator.next()[0] for i in range(train_generator.__len__())])
y = np.concatenate([train_generator.next()[1] for i in range(train_generator.__len__())])

# Convert color images to a vector
X_train = x.reshape(1293, 224*224*3)

# Apply SMOTE method to the minority class (malignant)
sm = SMOTE(random_state=2)
X_smote, y_smote = sm.fit_resample(X_train, y)

Xsmote_img = X_smote.reshape(6700, 224, 224, 3)

# This function returns the label name
def get_key(val): 
    for key, value in patho.items(): 
        if val == value: 
            return key 

# Adjusted saving part
for i in range(len(Xsmote_img)):
    # Check if the label is 'malignant'
    if y_smote[i] == patho['malignant']:
        # Define the directory for malignant images
        malignant_dir = '/home/vuk/Documents/ML_Data/HAM/processed/roi/malignant/'
        
        # Check if the directory exists, if not, create it
        if not os.path.exists(malignant_dir):
            os.mkdir(malignant_dir)
        
        # Convert the image array to a PIL image
        pil_img = array_to_img(Xsmote_img[i] * 255)
        
        # Save the image with a naming convention that reflects their index in the oversampled dataset
        pil_img.save(malignant_dir + 'smote_' + str(1293 + i) + '.jpg')