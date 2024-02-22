import binascii
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import base64

from pydantic import BaseModel
#pip installation required + add the version to requirements.txt

app = FastAPI()

#CORS ERRORI SKINUTI

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def base64_to_numpy(base64_string):
    try:
        imgdata = base64_string.split(',')[1]
        padding_needed = len(imgdata) %   4
        if padding_needed >   0:
            imgdata += '=' * (4 - padding_needed)
        decoded = base64.b64decode(imgdata)
        image = Image.open(io.BytesIO(decoded))
        image_np = np.array(image)
        return image_np
    except (binascii.Error, IOError) as e:
        print(f"Error processing image: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

@app.get('/')
def read_root():
    return { "message" : "jesam" }


@app.post('/predict')
<<<<<<< Updated upstream
def predict(img: str):
    convImg = base64_to_numpy(img)
    if convImg is None:
        return {"cihan": "FAIL"}
    else:
        return { "message" : convImg.tolist()}
=======
async def predict(photo: dict):
    try:
        base64FromUser = photo["image"]["_parts"][0][1]["base64"]

        tempImg = None

        with open("tempImgToSave.jpg", "wb") as file:
            tempImg = base64.b64decode(base64FromUser)  # actual image in bytes
            file.write(base64.b64decode(base64FromUser))  # creating a new file and saving it to current directory
        
        # print("tempImg: ", tempImg)
        image_to_array(tempImg, 600, 600)   # change to whatever width and height of image that is necessary

        if not photo["image"]["_parts"][0][1]["base64"]:
            return {"msg": "Failed to upload image to the server...", "status": 400}

        return {"msg": "Image received!", "status": 200}

    except Exception as e:
        print("Error receiving image:", e)

def image_to_array(img, width, height):
    image = Image.open("tempImgToSave.jpg")

    # the bottom code grayscales the image, so if color is important, omit this    
    # image_grayscale = image.convert("L") 
    # resized_image = image_grayscale.resize((width, height))

    resized_image = image.resize((width, height)) 

    image_array = np.array(resized_image)

    normalized_image = image_array / 255.0  # value depends on the pixel value range

    print(normalized_image)

    
>>>>>>> Stashed changes
