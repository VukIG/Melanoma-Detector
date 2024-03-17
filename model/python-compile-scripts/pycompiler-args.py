# Dep: Python Script Compiler with args
# Author: Sabian Hibbs
# Circa: 2024 - 16/03/2024

"""Compile a Python script into a standalone executable.

Usage:  python pycompiler-args.py -i img-crop-binary-mask.py -o /path/to/output/directory
-i = Input python script to be converted to exe
-o = Output exe directory + aditional files 

react.js Example: ------------------------------------------------------------------\
                                                                                    |
import RNFS from 'react-native-fs';                                                 |
                                                                                    |
// Function to execute the binary                                                   |
const executeBinary = async () => {                                                 |
  const binaryPath = RNFS.DocumentDirectoryPath + '/path/to/img_crop_binary_mask';  |
  const outputDir = RNFS.DocumentDirectoryPath + '/output/';                        |
                                                                                    |
  try {                                                                             |
    // Execute the binary with the desired flags                                    |
    const result = await RNFS.execFile(binaryPath, [                                |
      '-bd', '/path/to/base/dir',                                                   |
      '-sd', '/path/to/starting/dir',                                               |
      '-bnd', '/path/to/benign/dir',                                                |
      '-md', '/path/to/malignant/dir',                                              |
      '-o', outputDir                                                               |
    ]);                                                                             |
    console.log('Binary execution result:', result);                                |
  } catch (error) {                                                                 |
    console.error('Error executing binary:', error);                                |
  }                                                                                 |
};                                                                                  |
                                                                                    |
------------------------------------------------------------------------------------/
"""

import os
import subprocess
import shutil
import argparse
import importlib.util


def is_pyinstaller_installed():
    """Check if PyInstaller is installed."""
    try:
        spec = importlib.util.find_spec('PyInstaller')
        return spec is not None
    except ImportError:
        return False


def install_pyinstaller():
    """Install PyInstaller using pip."""
    print("PyInstaller is not installed.")
    while True:
        choice = input("Do you want to install PyInstaller? [y/n]: ").lower()
        if choice == 'y':
            subprocess.run(['pip', 'install', 'pyinstaller'], check=True)
            print("PyInstaller installed successfully.")
            return True
        elif choice == 'n':
            print("PyInstaller installation canceled.")
            return False
        else:
            print("Invalid choice. Please enter 'y' or 'n'.")


def compile_script(script_path, output_dir):
    """Compile the Python script into a standalone executable.

    Args:
        script_path: Path to the input Python script.
        output_dir: Directory to store the compiled executable.
    """
    # Set the name of the executable file based on the input script name
    script_name = os.path.splitext(os.path.basename(script_path))[0]
    executable_name = script_name.replace('-', '_')

    # Set the PyInstaller command and options
    pyinstaller_cmd = [
        'pyinstaller',
        '--onefile',
        '--name', executable_name,
        '--hidden-import', 'opencv-python',
        '--hidden-import', 'scikit-image',
        '--collect-data', 'skimage.transform',
        '--collect-data', 'cv2',
        script_path
    ]

    # Run PyInstaller to create the standalone executable
    subprocess.run(pyinstaller_cmd, check=True)

    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Move the executable to the output directory
    executable_path = os.path.join(output_dir, executable_name)
    if os.path.exists(executable_path):
        os.remove(executable_path)
    shutil.move(os.path.join('dist', executable_name), output_dir)

    # Clean up the temporary files created by PyInstaller
    shutil.rmtree('build')
    os.remove(f'{executable_name}.spec')

    print(f"Standalone executable created: {executable_path}")


def main():
    """Parse command-line arguments and compile the Python script."""

    parser = argparse.ArgumentParser(
        description='Compile a Python script into a standalone executable -i input script | -o output_dir')
    #parser.add_argument('--help', action='store_true', help='-i input script | -o output_dir')
    
    parser.add_argument('-i',
                        '--input_script',
                        required=True,
                        help='Path to the input Python script')
    
    parser.add_argument('-o',
                        '--output_dir',
                        default='dist',
                        help='Directory to store the compiled executable '
                             '(default: dist)')
    args = parser.parse_args()

    script_path = args.input_script
    output_dir = args.output_dir

    if not os.path.exists(script_path):
        print(f"Input script not found: {script_path}")
        return

    if not is_pyinstaller_installed():
        if not install_pyinstaller():
            return

    compile_script(script_path, output_dir)


if __name__ == '__main__':
    main()
