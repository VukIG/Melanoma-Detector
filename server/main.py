import binascii
from fastapi import Request
from typing import Optional
from fastapi import FastAPI, File, Form, UploadFile
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

class PredictFormData(BaseModel):
    age: int
    gender: str
    localization: str

@app.get('/')
def read_root():
    print("yo")
    return { "message" : "jesam" }

@app.post('/user-data')
def read_root(data: dict):
    print("user info received!")
    print(data)
    return { "message" : data["data"]["_parts"][0] }

def resize_image(image_path, width, height):
    image = Image.open(image_path)
        
    newImage = image.resize((width, height))
    newImage.save("resizedImage.jpg")

@app.post("/predict")
async def predict(
                age: int = Form(...), 
                gender: str = Form(...), 
                localization: str = Form(...),
                photo: UploadFile = File(...)):
    try:
        image_path = f"images/{photo.filename}"

        print('age: ', age)
        print('gender: ', gender)
        print('localization: ', localization)
        print(photo)
        print('image_path: ', image_path)

        with open(image_path, "wb") as file:
            contents = await photo.read()
            file.write(contents) 

        image_to_array(contents, 450, 600)

        file.close()
        return {"file_contents": contents.decode("utf-8", "ignore")}
    except Exception as e:
        print("Error receiving image:", e)
        return {"error": e}  

def image_to_array(img, width, height):
    image = Image.open(io.BytesIO(img))
    
    # image_grayscale = image.convert("L")      # probably want to keep original image color
    # resized_image = image_grayscale.resize((width, height))

    resized_image = image.resize((width, height))   

    image_array = np.array(resized_image)

    # print("image_array: ", image_array)

    normalized_image = image_array / 255.0  # value depends on the pixel value range

    # print(normalized_image)

    