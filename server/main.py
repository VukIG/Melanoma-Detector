from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from pydantic import BaseModel
from PIL import Image
import numpy as np
import base64
import io
import requests #pip installation required + add the version to requirements.txt

app = FastAPI()

class PatientInfo(BaseModel):
    image: str

#CORS ERRORI SKINUTI

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load your cancer detection model only once when the app starts


def process_image(image_bytes: bytes):
    try:
        img_file = BytesIO(image_bytes)
        img = Image.open(img_file) #potenciajlni bug
        img_input = np.reshape(img, (1, img.shape[0], img.shape[1], img.shape[2]))
        return img_input
    except Exception as e:
        print(f"Error processing image: {e}")
        return None


@app.get('/')
def index():
    return {'message': 'Amenelibockura'}

@app.post('/predict')
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
    
    # image_grayscale = image.convert("L")

    # resized_image = image_grayscale.resize((width, height))

    resized_image = image.resize((width, height))   # probably want to keep original image color

    image_array = np.array(resized_image)

    normalized_image = image_array / 255.0  # value depends on the pixel value range

    print(normalized_image)

    