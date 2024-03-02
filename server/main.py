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

class PredictFormData(BaseModel):
    age: int
    gender: str
    localization: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return { "message" : "jesam" }


@app.post("/predict")
async def predict(age: int = Form(...), 
                  gender: str = Form(...), 
                  localization: str = Form(...),
                  photo: UploadFile = File(...)):
    contents = await photo.read()

    image_to_array(contents,450,600)


    return {"file_contents": contents.decode("utf-8", "ignore")}

def image_to_array(img, width, height):
    image = Image.open(io.BytesIO(img))  # Create a BytesIO object and pass it to Image.open()
    
    # image_grayscale = image.convert("L")

    # resized_image = image_grayscale.resize((width, height))
    resized_image = image.resize((width, height))   # probably want to keep original image color
    image_array = np.array(resized_image)
    normalized_image = image_array / 255.0  # value depends on the pixel value range
    print(normalized_image)

    