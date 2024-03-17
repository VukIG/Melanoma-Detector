# %%
import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from keras.applications.mobilenet_v2 import preprocess_input
from keras.preprocessing import image
from skimage.transform import resize
import os, shutil
from keras.preprocessing.image import ImageDataGenerator


# %%
mobile = tf.keras.applications.MobileNetV2(weights='imagenet', include_top=False, input_shape = (224,224,3))

# %%
mobile.summary()

# %%
datagen = ImageDataGenerator(rescale=1./255)
batch_size = 32

def dl_extract_features(directory, sample_count):
    features = np.zeros(shape=(sample_count, 7, 7, 1280))  # Must be equal to the output of the convolutional base
    labels = np.zeros(shape=(sample_count))
    # Preprocess data
    generator = datagen.flow_from_directory(directory,
                                            target_size=(224,224),
                                            batch_size = batch_size,
                                            class_mode='binary')
    # Pass data through convolutional base
    i = 0
    for inputs_batch, labels_batch in generator:
        features_batch = mobile.predict(inputs_batch)
        features[i * batch_size: (i + 1) * batch_size] = features_batch
        labels[i * batch_size: (i + 1) * batch_size] = labels_batch
        i += 1
        if i * batch_size >= sample_count:
            break
    return features, labels
    

# %%
numerOfImages = 10005
train_dir = '/home/vuk/Documents/ML_Data/HAM/processed/roi'
valid_dir = '/home/vuk/Documents/ML_Data/HAM/valid'
test_dir = '/home/vuk/Documents/ML_Data/HAM/test'
train_features, train_labels = dl_extract_features(train_dir, numerOfImages)  # Agree with our small dataset size
validation_features, validation_labels = dl_extract_features(valid_dir, numerOfImages)
test_features, test_labels = dl_extract_features(test_dir, numerOfImages)

# test_features, test_labels = extract_features(test_dir, test_size)