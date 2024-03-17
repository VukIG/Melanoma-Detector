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


""" MOST RECENT COMMIT DETAILS

Commit: Improve image cropping and handle low-quality images + Added Argparse for flags.

Changes:
- Modified the `crop_image` function to return a boolean `is_valid` indicating if the cropped image is valid or not.
  - Added a check to determine if the cropped image is empty or completely white.
  - If the cropped image is invalid, the function returns `None` for the cropped 
    original and cropped mask, and `False` for `is_valid`.

- Updated the `save_cropped_images` function to handle invalid cropped images.
  - Added a new parameter `is_valid` to indicate whether the cropped image is valid or not.
  - If `is_valid` is `False`, the function saves the rejected image with the caption 
    "Image not valid - Image Quality Too Low" using `cv2.putText`.
  - The rejected image is saved in the `output_path` directory with the prefix 
    `{class_name}_rejected_{i}.jpg`.

- Modified the `main` function to incorporate the changes in `crop_image` and `save_cropped_images`.
  - After calling `crop_image`, the function checks the value of `is_valid`.
  - If `is_valid` is `False`, it prints a message indicating that the image is not valid due to low quality.
  - The `save_cropped_images` function is called with the `is_valid` parameter to determine whether 
    to save the cropped images or the rejected image with the caption.

These changes improve the image cropping process by handling cases where the cropped image 
is empty or completely white. The script now saves the rejected images with the caption 
"Image not valid - Image Quality Too Low" in the `output_path` directory, while still 
saving the valid cropped images and binary masks as before. This helps in identifying 
and managing low-quality images in the dataset.

"""

import glob
import argparse
import cv2
import numpy as np
import os
from skimage.transform import resize


# Constants
IMAGE_PADDING = 10 # Pixle padding around ROI before cropping.
IMG_CONTRAST = 1.0 # Image contrast factor. (0.0 = no contrast, 2.0 = double contrast)

def image_data_gen_preprocessing(image_path):
    img = read_image(image_path)
    Ipro = preprocess_image(img)
    Ibin = generate_binary_mask(Ipro)
    Iroi = crop_image(Ipro,Ibin)

    return Iroi;

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
        tuple: A tuple containing the cropped original image, the cropped binary mask, and a boolean indicating if the cropped image is valid.
    """
    # Find the contours in the binary mask
    contours, _ = cv2.findContours(binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    # If no contours are found, return None
    if not contours:
        print("No contours detected; unable to crop the image.")
        return None, None, False

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

    # Check if the cropped image is empty or completely white
    if cropped_original.size == 0 or np.all(cropped_original >= 250):
        print("Cropped image is empty or completely white.")
        return None, None, False

    return cropped_original, cropped_mask, True


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


def save_cropped_images(cropped_original, cropped_mask, output_path, i, class_name, is_valid, output_dir):
    """
    Saves the cropped original and the cropped binary mask images.

    Args:
        cropped_original (numpy.ndarray): The cropped original image.
        cropped_mask (numpy.ndarray): The cropped binary mask image.
        output_path (str): The path where the images will be saved.
        i (int): The index of the image.
        class_name (str): The class name of the image (benign or malignant).
        is_valid (bool): Indicates whether the cropped image is valid or not.
        output_dir (str): The output directory for saving the images.

    Returns:
        None
    """
    if not is_valid:
        # Save the rejected image with the caption
        cv2.putText(cropped_original, "Image not valid - Image Quality Too Low", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        cv2.imwrite(os.path.join(output_dir, f"{class_name}_rejected_{i}.jpg"), cropped_original)
        return

    # Save the cropped original image
    cv2.imwrite(os.path.join(output_dir, f"{class_name}_cropped_{i}.jpg"), cropped_original)
    # Save the cropped image with the binary mask applied
    cv2.imwrite(os.path.join(output_dir, f"{class_name}_binary_{i}.jpg"), cropped_mask)


def main():
    """
    Image Cropping and Mask Generation Tool.

    This tool takes an input image file, crops the image based on a binary mask,
    and generates an inverted version of the cropped image. The cropped image,
    inverted image, and the binary mask are then saved to the specified output directory.

    Args:
        Base directory for processed data "-bd", for "--base_dir"
        Starting directory for training data "-sd", for "--starting_dir"
        Directory for benign images "-bnd", for "--benign_dir"
        Directory for malignant images "-md", for "--malignant_dir"
        Output directory for saving the images "-o", for "--output_dir"

    Returns:
        None main()

    """

    parser = argparse.ArgumentParser(description="Image Cropping and Mask Generation Tool")
    parser.add_argument("-bd", "--base_dir", default="/home/vuk/Documents/ML_Data/HAM/processed",
                        help="Base directory for processed data (default: /home/vuk/Documents/ML_Data/HAM/processed)")
    
    parser.add_argument("-sd", "--starting_dir", default="/home/vuk/Documents/ML_Data/HAM/train/",
                        help="Starting directory for training data (default: /home/vuk/Documents/ML_Data/HAM/train/)")

    parser.add_argument("-bnd", "--benign_dir", default="/home/vuk/Documents/ML_Data/HAM/train/benign",
                        help="Directory for benign images (default: /home/vuk/Documents/ML_Data/HAM/train/benign)")

    parser.add_argument("-md", "--malignant_dir", default="/home/vuk/Documents/ML_Data/HAM/train/malignant",
                        help="Directory for malignant images (default: /home/vuk/Documents/ML_Data/HAM/train/malignant)")

    parser.add_argument("-o", "--output_dir", default="/path/to/output/directory",
                        help="Output directory for saving the images (default: /path/to/output/directory)")
    args = parser.parse_args()

    base_dir = args.base_dir
    starting_dir = args.starting_dir
    benign_dir = args.benign_dir
    malignant_dir = args.malignant_dir
    output_dir = args.output_dir

    roi_dir = os.path.join(output_dir, 'roi')
    binary_dir = os.path.join(output_dir, 'binary')

    # Create the output directories if they don't exist
    os.makedirs(roi_dir, exist_ok=True)
    os.makedirs(binary_dir, exist_ok=True)

    image_paths = glob.glob(os.path.join(starting_dir, '*', '*'))

    for i, image_path in enumerate(image_paths):
        print(image_path)
        original_image = read_image(image_path)
        if original_image is None:
            print(f"Failed to load image: {image_path}")
            continue  # Skip to the next image if loading failed
        preprocessed_image = preprocess_image(original_image)
        binary_mask = generate_binary_mask(preprocessed_image)
        cropped_original, cropped_mask, is_valid = crop_image(original_image, binary_mask)
        if not is_valid:
            print(f"Image {i} not valid - Image Quality Too Low.")
        if 'benign' in image_path:
            class_name = 'benign'
        elif 'malignant' in image_path:
            class_name = 'malignant'
        else:
            print(f"Unknown class for image: {image_path}")
            continue
        save_cropped_images(cropped_original, cropped_mask, roi_dir, i, class_name, is_valid, output_dir)


if __name__ == "__main__":
    main()
