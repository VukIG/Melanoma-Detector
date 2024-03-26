# This script is used to crop an image based on a 
# binary mask and generate an inverted version of the cropped image.
# The cropped image, inverted image, and the binary mask are then 
# saved to the specified output directory.
#
# Example usage: python img-crop-binary-mask.py -i input.jpg -o output
#   Input:  input.jpg
#   Output: output/original_cropped.jpg, 
#           output/inverted_cropped.jpg, 
#           output/binary_mask_cropped.jpg
#
#   Dep:    Computer Vision
#   Author: Sabian Hibbs
#   Circa:  2024 - 14/03/2024

# The authors code was modified by removing the inverted_cropped version of an image
# Using inverted images as a way to train the model has not yet been tested and
# thus it will not be used. Also glob library was added to loop over the benign and
# malignant folders in order to prepeare the HAM dataset for model training

import glob
import argparse
import cv2
import numpy as np
import os
from skimage.transform import resize


# Constants
IMAGE_PADDING = 10 # Pixle padding around ROI before cropping.
IMG_CONTRAST = 1.0 # Image contrast factor. (0.0 = no contrast, 2.0 = double contrast)

# Define the directories

base_dir = '/home/vuk/Documents/ML_Data/HAM/processed'
starting_dir = '/home/vuk/Documents/ML_Data/HAM/train/'
benign_dir = '/home/vuk/Documents/ML_Data/HAM/train/benign'
malignant_dir = '/home/vuk/Documents/ML_Data/HAM/train/malignant'
roi_dir = os.path.join(base_dir, 'roi')
binary_dir = os.path.join(base_dir, 'binary')

# Create the output directories if they don't exist
os.makedirs(roi_dir, exist_ok=True)
os.makedirs(binary_dir, exist_ok=True)


def read_image(image_path):
    """
    Loads an image from a specified path.

    Args:
        image_path (str): The path to the image file.

    Returns:
        numpy.ndarray: The loaded image as a NumPy array.
    """
    return cv2.imread(image_path) # Read image from file.


def preprocess_image(image):
    """
    Applies preprocessing steps to the image.

    Args:
        image (numpy.ndarray): The input image.

    Returns:
        numpy.ndarray: The preprocessed image.
    """
    print("Original image shape:", image.shape)  # Debug print
    # Apply Gaussian blur to the image.
    image_blurred = cv2.GaussianBlur(image, (5, 5), 1) 
    # Convert the image to the LAB color space.
    return cv2.cvtColor(image_blurred, cv2.COLOR_BGR2LAB)

def generate_binary_mask(image):
    """
    Generates a binary mask for the image.

    Args:
        image (numpy.ndarray): The input image.

    Returns:
        numpy.ndarray: The binary mask generated from the input image.
    """
    # Convert the image to grayscale.
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply Otsu's thresholding to the grayscale image.
    _, binary_mask = cv2.threshold(gray_image, 0, 256, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return binary_mask


def crop_image(original_image, binary_mask, buffer=IMAGE_PADDING):
    """
    Crops the region of interest from the given image and binary mask.

    Args:
        original_image (numpy.ndarray): The original image.
        binary_mask (numpy.ndarray): The binary mask indicating the region of interest.
        buffer (int, optional): The buffer size around the region of interest. Defaults to 0.

    Returns:
        tuple: A tuple containing the cropped original image and the cropped binary mask.
    """
    # Find the contours in the binary mask
    contours, _ = cv2.findContours(binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    # If no contours are found, return None
    if not contours:
        print("No contours detected; unable to crop the image.")
        return None, None

    # Find the largest contour and compute the bounding box
    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest_contour)

    # Compute the square crop dimensions with buffer
    side_length = max(w, h) + 2 * buffer
    center_x, center_y = x + w // 2, y + h // 2
    x = max(center_x - side_length // 2, 0)
    y = max(center_y - side_length // 2, 0)
    # Ensure the crop dimensions do not exceed the image size
    if x + side_length > original_image.shape[1]:
        side_length = original_image.shape[1] - x
    if y + side_length > original_image.shape[0]:
        side_length = original_image.shape[0] - y

    # Crop the original image and the binary mask
    cropped_original = original_image[y:y + side_length, x:x + side_length]
    cropped_mask = binary_mask[y:y + side_length, x:x + side_length]
    return cropped_original, cropped_mask


def invert_colors(image):
    """
    Inverts the colors of the given image and increases contrast.

    Args:
        image (numpy.ndarray): The input image to be processed.

    Returns:
        numpy.ndarray: The inverted image with increased contrast.
    """
    # Convert the image to the HSV color space
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    hsv_image[:, :, 1] = 255 - hsv_image[:, :, 1]

    # Increase contrast
    hsv_image[:, :, 2] = np.clip(hsv_image[:, :, 2] * IMG_CONTRAST, 0, 255)

    # Convert the image back to the BGR color space
    inverted_image = cv2.cvtColor(hsv_image, cv2.COLOR_HSV2BGR)
    return inverted_image


def save_cropped_images(cropped_original, cropped_mask, i, class_name):
    """
    Saves the cropped original and the cropped binary mask images.

    Args:
        cropped_original (numpy.ndarray): The cropped original image.
        cropped_mask (numpy.ndarray): The cropped binary mask image.
        output_path (str): The path where the images will be saved.
        i (int): The index of the image.
        class_name (str): The class name of the image (benign or malignant).

    Returns:
        None
    """
    os.makedirs(os.path.join(roi_dir, class_name), exist_ok=True)
    os.makedirs(os.path.join(binary_dir, class_name), exist_ok=True)
    # Save the cropped original image
    cv2.imwrite(os.path.join(roi_dir,class_name, f"{i}.jpg"), cropped_original)
    # Save the cropped image with the binary mask applied
    cv2.imwrite(os.path.join(binary_dir,class_name, f"{i}.jpg"), cropped_mask)

def main():
    """
    Image Cropping and Mask Generation Tool.

    This tool takes an input image file, crops the image based on a binary mask,
    and generates an inverted version of the cropped image. The cropped image,
    inverted image, and the binary mask are then saved to the specified output directory.

    Args:
        -i, --input (str): Path to the input image file.
        -o, --output (str, optional): Directory to save the output images. If not provided,
            the output images will be saved in the same directory as the input image.

    Returns:
        None
    """
    #parser = argparse.ArgumentParser(description="Image Cropping and Mask Generation Tool")
    #parser.add_argument("-i", "--input", required=True, help="Path to the input image file")
    #parser.add_argument("-o", "--output", default="", help="Directory to save the output images")
    #args = parser.parse_args()

    #input_path = args.input
    #output_path = args.output if args.output else os.path.dirname(input_path)

    image_paths = glob.glob(os.path.join(starting_dir, '*', '*'))
    for i, image_path in enumerate(image_paths):
        print(image_path)
        original_image = read_image(image_path)
        if original_image is None:
            print(f"Failed to load image: {image_path}")
            continue  # Skip to the next image if loading failed
        preprocessed_image = preprocess_image(original_image)
        binary_mask = generate_binary_mask(preprocessed_image)
        cropped_original, cropped_mask = crop_image(original_image, binary_mask)
        if 'benign' in image_path:
            class_name = 'benign'
        elif 'malignant' in image_path:
            class_name = 'malignant'
        else:
            print(f"Unknown class for image: {image_path}")
            continue
        save_cropped_images(cropped_original, cropped_mask, i, class_name)
if __name__ == "__main__":
    main()