from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from pydantic import BaseModel
from PIL import Image
import numpy as np

app = FastAPI()

class PatientInfo(BaseModel):
    image: bytes

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
    image_blob = patient_info.image
    return {'message' : print(image_blob)}
