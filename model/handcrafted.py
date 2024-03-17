
# %%
from skimage.feature import graycomatrix, graycoprops
import matplotlib.pyplot as plt
import numpy as np
import cv2
# %%
def calculate_color_features(image):
    # Convert image to RGB color space
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Convert image to LAB color space
    lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    
    # Extract the chosen channel from RGB and LAB color spaces
    # For example, to choose the blue channel from RGB and the b* channel from LAB
    channel_rgb = rgb_image[:, :, 2]  # Assuming blue channel
    channel_lab = lab_image[:, :, 2]  # Assuming b* channel
    
    # Calculate statistical characteristics
    min_channel = np.min(channel_rgb)
    max_channel = np.max(channel_rgb)
    var_channel = np.var(channel_rgb)
    mean_channel = np.mean(channel_rgb)
    
    min_lab = np.min(channel_lab)
    max_lab = np.max(channel_lab)
    var_lab = np.var(channel_lab)
    mean_lab = np.mean(channel_lab)
    
    return {
        'min_rgb': min_channel,
        'max_rgb': max_channel,
        'var_rgb': var_channel,
        'mean_rgb': mean_channel,
        'min_lab': min_lab,
        'max_lab': max_lab,
        'var_lab': var_lab,
        'mean_lab': mean_lab
    }

# %%

def compute_entropy(p):
    # Ensure p is an array to handle division by zero
    p = np.array(p)
    # Avoid division by zero by adding a small constant
    p = p + np.finfo(float).eps
    return -np.sum(p * np.log2(p))

def compute_mutual_information(p_xy, p_x, p_y):
    # Calculate entropies
    H_X = compute_entropy(p_x)
    H_Y = compute_entropy(p_y)
    H_XY = compute_entropy(p_xy)
    # Calculate mutual information
    return H_X + H_Y - H_XY


def computeIMC(Px, Py, Pd):
    # Calculate entropies
    H_X = compute_entropy(Px)
    H_Y = compute_entropy(Py)
    H_XY = compute_entropy(Pd)

    # Assuming p_xy1 and p_xy2 are defined elsewhere
    joint_entropy_xy1 = compute_entropy(p_xy1)
    joint_entropy_xy2 = compute_entropy(p_xy2)

    # Calculate mutual information
    mutual_information_xy = compute_mutual_information(Pd, Px, Py)

    # Calculate joint entropies for scenarios 1 and 2
    joint_entropy_xy1 = compute_entropy(p_xy1)
    joint_entropy_xy2 = compute_entropy(p_xy2)

    # Calculate IMCorr1 and IMCorr2
    IMCorr1 = (mutual_information_xy - mutual_information_x_y1) / max(H_X, H_Y)
    IMCorr2 = np.sqrt(1 - np.exp(-2 * (joint_entropy_xy2 - joint_entropy_xy)))

    # Return IMCorr1 and IMCorr2 values
    return IMCorr1, IMCorr2


# %%
def calculate_texture_features(gray_image):
    # Convert image to grayscale    
    # Compute the GLCM
    distances = [0]  # You can adjust the distances if needed
    angles = [0, np.pi/4, np.pi/2, 3*np.pi/4]  # Adjust angles as needed
    glcm = graycomatrix(gray_image, distances=distances, angles=angles, symmetric=True, normed=True)


    #potential bug in dimensionality reduction
    glcm_2d = glcm[0, 0, :, :]

    N = glcm_2d.shape[0] # Number of gray levels
    print(glcm.shape)
    
    # Calculate statistical texture features
    asm = graycoprops(glcm, 'ASM').flatten().mean()
    contrast = graycoprops(glcm, 'contrast').flatten().mean()
    correlation = graycoprops(glcm, 'correlation').flatten().mean()
    variance = graycoprops(glcm, 'ASM').flatten().var()
    idm = np.sum(1 / (1 + np.arange(N)[:, None] - np.arange(N)[None, :]) ** 2 * glcm)
    entropy = -np.sum(glcm * np.log(glcm + 1e-15))  # Avoid division by zero

    sum_variance = 0
    for k in range(2, 2 * N):
        sum_variance += (k - (μx + μy)) ** 2 * Px_y[k]

    sum_entropy = 0
    for k in range(2, 2 * N):
        sum_entropy -= Px_y[k] * np.log(Px_y[k])

    difference_variance = 0
    for k in range(N):
        difference_variance += (k - μ_x_y) ** 2 * P_x_minus_y[k]
        difference_entropy -= P_x_minus_y[k] * np.log(P_x_minus_y[k])

    

    imcorr1, imcorr2 = computeIMC()
    
    return {
        'ASM': asm,
        'contrast': contrast,
        'correlation': correlation,
        'variance': variance,
        'IDM': idm,
        'entropy': entropy, #BUG
        'Sum_Variance': sum_variance,
        'Sum_Entropy': sum_entropy,
        'Difference_Variance': difference_variance,
        'Difference_Entropy': difference_entropy,
        'IMCorr1': imcorr1,
        'IMCorr2': imcorr2,
    }

# %%
def calculate_symmetry(bin_image):    
    
    # Calculate the symmetry mask
    symmetry_mask = cv2.bitwise_or(bin_image, cv2.flip(bin_image, 1))
    
    # Calculate the synthetic image A
    synthetic_image = cv2.bitwise_or(bin_image, symmetry_mask)
    
    # Calculate the symmetry value at 0 degrees
    symmetry_0_degrees = 1 - (cv2.countNonZero(synthetic_image) / cv2.countNonZero(bin_image))
    
    # Calculate the symmetry value at 90 degrees
    rotated_image = cv2.rotate(synthetic_image, cv2.ROTATE_90_CLOCKWISE)
    symmetry_90_degrees = 1 - (cv2.countNonZero(rotated_image) / cv2.countNonZero(bin_image))
    
    # Calculate the average symmetry value
    average_symmetry = (symmetry_0_degrees + symmetry_90_degrees) / 2
    
    return average_symmetry

# %%
def extract_handcrafted(Iroi, Ibin):
    gray_image = cv2.cvtColor(Iroi, cv2.COLOR_BGR2GRAY)
    contours, _ = cv2.findContours(gray_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    moments = cv2.moments(contours[0])

    # Calculate the central moments
    mu20 = moments['mu20']
    mu02 = moments['mu02']
    mu11 = moments['mu11']

    #potential bug in the value of the area
    total_area = 0
    for contour in contours:
        area = cv2.contourArea(contour)
        total_area += area
                        

    perimeter = cv2.arcLength(contours[0], True)
    circularity = (4 * np.pi * area) / (perimeter ** 2)        
    diameter = np.sqrt(4 * area / np.pi)
    eccentricity = np.sqrt((mu20 - mu02) ** 2 + 4 * mu11 ** 2) / (mu20 + mu02 + np.sqrt((mu20 - mu02) ** 2 + 4 * mu11 ** 2))

    color_features = calculate_color_features(Iroi)
    color_features = np.array([color_features])

    texture_features = calculate_texture_features(gray_image)
    texture_features = np.array([texture_features])

    symmetry_value = calculate_symmetry(Ibin)
    symmetry_value = np.array([symmetry_value])

    handcrafted_features = np.concatenate([np.array([area, perimeter, circularity, diameter, eccentricity]),
                                        color_features, texture_features, symmetry_value])
    return handcrafted_features
