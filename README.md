# Melanoma Detector 📸💻

## Project Overview
This is an open-source project dedicated to helping people living in regions with a lack of dermatologists! 🚀 We've developed a Skin Cancer Detection App using React Native for the front end and TensorFlow, NumPy, and Python for the back end. The app empowers users to check if a naevus (mole) is benign or malignant.

## Features
- 📷 **Camera Integration:** Capture photos directly from your phone's camera.
- 🔄 **Real-time Detection:** Instantly send the photo to the TensorFlow model for analysis.
- 🤖 **Machine Learning Magic:** Utilizing TensorFlow, NumPy, and Python to distinguish between benign and malignant moles.

## How It Works
1. 📱 **User Permission:** The app prompts the user for camera permissions.
2. 📸 **Capture Photo:** Users can take photos of the naevus they want to analyze.
3. 🚀 **Model Processing:** The app sends the photo to the TensorFlow model for analysis.
4. 🩺 **Diagnosis Result:** The model processes the image and provides feedback on whether the naevus is benign or malignant.

## Technologies Used
- ⚛️ **React Native:** For the frontend development.
- 🧠 **TensorFlow:** Powering the machine learning model.
- 🐍 **Python:** Backend development and model training.
- 📊 **NumPy:** Handling numerical operations efficiently.
- 📷 **Expo:** Leveraging the React Native's cross-platform capability

## Training Data
- 📊 **Kaggle Dataset:** The model has been trained on a curated dataset from Kaggle, ensuring robust and accurate predictions.

## Future Enhancements
- 🌐 **Web Deployment:** I am considering deploying the app on the web for broader accessibility.
- 🌈 **Improved UX/UI:** I plan to enhance the user interface with nativewind.

## Acknowledgments
A big shoutout to the open-source community and the incredible tools and libraries that made this project possible. 
Special thanks to my team members for contributing so much to this project! 🎉 

Also a big thank you to the authors of the
### Melanoma and Nevus Skin Lesion Classification Using Handcraft and Deep Learning Feature Fusion via Mutual Information Measures
research paper for sharing their CAD system

Happy Coding! 🚀👩‍💻👨‍💻

## Requirements

- Android or iOS device with a camera
- Internet connection for TensorFlow.js model updates (if applicable)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/VukIG/Melanoma-Detector.git
    ```

2. Install dependencies:

    ```bash
    cd Melanoma-Detector
    npm install
    ```

3. Run the app and Scan the QR code with the Expo app from Play Store :

    ```bash
    npx expo start --tunnel
    ```
4. Run the app on your emulator ( Optional if you don't want to use the expo app ):
    ```bash
    Press w for web, a for android emulator ( Requires the AndroidSDK setup ) or i for ios emulator ( requires xcode )    
    ```
## How to Contribute
Feel free to fork the repository and contribute to the development. Your suggestions and enhancements are more than welcome! 🙌


We welcome contributions! If you have suggestions, found a bug, or want to improve the app, please open an issue or submit a pull request.

## License

This project is licensed under the [Apache 2.0](LICENSE).

## Detailed explanation

The detailed explanation on how this app should work is in Serbian and can be accessed through this url: https://docs.google.com/document/d/1NwlALtB-bNRuoXDWS3nWsnSi3bMCoCZO5Nre84uz1rA/edit?usp=sharing
