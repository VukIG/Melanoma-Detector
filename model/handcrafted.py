
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

#%% Calculate sigma's
def calculate_sigma_x_y(glcm):
    N_g = len(glcm)
    sigma_x = 0
    sigma_y = 0
    mew_x, mew_y = calculate_mew_x_y(glcm)
    
    for i in range(N_g):
        for j in range(N_g):
            sigma_x += ((i - mew_x) ** 2) * glcm[i][j]
            sigma_y += ((j - mew_y) ** 2) * glcm[i][j]

    sigma_x = np.sqrt(sigma_x)
    sigma_y = np.sqrt(sigma_y)

    return sigma_x, sigma_y

#%% Calculate mew's 
def calculate_mew_x_y(P_d):
    N_g = P_d.shape[0]
    mew_x = 0
    mew_y = 0
    mew_xy = 0
    for i in range(1, N_g + 1):
        for j in range(1, N_g + 1):
            mew_x += i * P_d[i - 1, j - 1]
            mew_y += j * P_d[i - 1, j - 1]
            mu_xy += abs(mew_x - mew_y)
    return mew_x, mew_y, mu_xy
#%% Calculate Pxminusy

def calculate_Pxy(glcm, Pd):
    N_g = len(glcm)
    Pxy = 0
    
    for i in range(N_g):
        for j in range(N_g):
            Pd[i][j] = glcm[i][j]
    
    for i in range(N_g):
        for j in range(N_g):
            if abs(i - j) == N_g:
                Pxy += Pd[i][j]
    
    return Pxy

# %%Entropy function
def compute_entropy(p):
    # Ensure p is an array to handle division by zero
    p = np.array(p)
    # Avoid division by zero by adding a small constant
    p = p + np.finfo(float).eps
    return -np.sum(p * np.log10(p))

#%% Compute entropy H(xy1)
def compute_entropy_xy1(Px, Py, Pd, Ng):
    # Avoid division by zero by adding a small constant
    Px = Px + np.finfo(float).eps
    Py = Py + np.finfo(float).eps
    
    H_xy1 = 0
    for i in range(Ng):
        for j in range(Ng):
            H_xy1 -= Pd[i][j] * np.log10(Px[i] * Py[j])
    
    return H_xy1

def compute_entropy_xy2(Px, Py, Ng):
    # Avoid division by zero by adding a small constant
    Px = Px + np.finfo(float).eps
    Py = Py + np.finfo(float).eps
    
    H_xy1 = 0
    for i in range(Ng):
        for j in range(Ng):
            H_xy1 -= Px[i]*Py[j] * np.log10(Px[i] * Py[j])
    
    return H_xy1
def computeIMC(Hx, Hy, Hxy, Hxy1, Hxy2):

    # Calculate IMCorr1 and IMCorr2
    IMCorr1 = ( Hxy - Hxy1) / max(Hx, Hy)
    IMCorr2 = np.sqrt(1 - np.exp(-2 * (Hxy2 - Hxy)))

    # Return IMCorr1 and IMCorr2 values
    return IMCorr1, IMCorr2
#%% Calculate entropies
def calculate_entropies(Px,Py,Pd,glcm,Ng):
    Hx = compute_entropy(Px)
    Hy = compute_entropy(Py)
    Hxy = calculate_Pxy(glcm, Pd,Ng) #BUG REDOSLED

    Hxy1 = compute_entropy_xy1(Pd, Py, Px, Ng)
    Hxy2 = compute_entropy_xy2(Px, Py, Ng)

    return Hx,Hy,Hxy,Hxy1,Hxy2
# %% 
def calculate_texture_features(gray_image):
    # Convert image to grayscale    
    # Compute the GLCM
    distances = [0]  # You can adjust the distances if needed
    angles = [0, np.pi/4, np.pi/2, 3*np.pi/4]  # Adjust angles as needed
    glcm = graycomatrix(gray_image, distances=distances, angles=angles, symmetric=True, normed=True)


    #potential bug in dimensionality reduction
    glcm_2d = glcm[0, 0, :, :]

    Ng = glcm_2d.shape[0] # Number of gray levels
    print(glcm.shape)

    Px = np.sum(glcm_2d, axis=1).flatten()  # Sum along rows, then flatten to 1D array
    Py = np.sum(glcm_2d, axis=0).flatten()  # Sum along columns, then flatten to 1D array
    Pd = np.sum(glcm, axis=(2, 3))  # sum  last two axes to obtain joint probabilities
    
    Px_y = calculate_Pxy(glcm, k)


    mewx, mewy, mewxy = calculate_mew_x_y(Pd, Ng)
    sigma_x, sigma_y = calculate_sigma_x_y(glcm, Ng)
    Hx, Hy,Hxy, Hxy1, Hxy2 = calculate_entropies(Px,Py,Pd,Ng)


    # Calculate statistical texture features
    asm = graycoprops(glcm, 'ASM').flatten().mean()
    contrast = graycoprops(glcm, 'contrast').flatten().mean()
    correlation = graycoprops(glcm, 'correlation').flatten().mean()
    variance = graycoprops(glcm, 'ASM').flatten().var()
    idm = np.sum(1 / (1 + np.arange(Ng)[:, None] - np.arange(Ng)[None, :]) ** 2 * glcm)
    entropy = -np.sum(glcm * np.log(glcm + 1e-15))  # Avoid division by zero



    sum_variance = 0
    for k in range(2, 2 * Ng):
        sum_variance += (k - (mewx + mewy)) ** 2 * Px_y[k]

    sum_entropy = 0
    for k in range(2, 2 * Ng):
        sum_entropy -= Px_y[k] * np.log(Px_y[k])

    difference_variance = 0
    for k in range(Ng):
        difference_variance += (k - mewxy) ** 2 * Px_y[k]
        difference_entropy -= Px_y[k] * np.log(Px_y[k])

    

    imcorr1, imcorr2 = computeIMC(Px, Py, Pd)
    

    return {
        'H(x)': Hx,
        'H(y)': Hy,
        'H(xy)': Hxy,
        'H(xy1)': Hxy1,
        'H(xy2)': Hxy2,
        'Px_y': Px_y,
        'sigma_x': sigma_x,
        'sigma_y': sigma_y,
        'mew_x': mewx,
        'mew_y': mewy,
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
def calculate_border_irregularity(contours):
    # Return some default or error value if no contours are found
    if not contours:
        return 0, 0 
    
    largest_contour = max(contours, key=cv2.contourArea)
    perimeter = cv2.arcLength(largest_contour, True)
    convex_hull = cv2.convexHull(largest_contour)
    hull_perimeter = cv2.arcLength(convex_hull, True)
    
    # Higher values indicate more irregularity
    irregularity = perimeter / hull_perimeter  
   
    return irregularity

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

    border_irregularity = calculate_border_irregularity(contours) 
    border_irregularity = np.array([border_irregularity])

    handcrafted_features = np.concatenate([np.array([area, perimeter, circularity, diameter, eccentricity]),
                                        color_features, texture_features, symmetry_value, border_irregularity])
    return handcrafted_features