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
def predict(img: str):
    convImg = base64_to_numpy(img)
    if convImg is None:
        return {"cihan": "FAIL"}
    else:
        return { "message" : convImg.tolist()}