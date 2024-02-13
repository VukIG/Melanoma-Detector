from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from pydantic import BaseModel
from PIL import Image
import numpy as np
import base64
import io

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
async def predict_cancer(patient_info: PatientInfo):
    base64_encoded= patient_info.image
    base64_decoded = base64.b64decode(base64_encoded)

    image = Image.open(io.BytesIO(base64_decoded))
    image_np = np.array(image)

    return {'message' : print(image_np)}
