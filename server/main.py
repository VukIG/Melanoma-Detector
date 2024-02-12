from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import tensorflow as tf
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
saved_model_path = "/home/vuk/Documents/ML/model/model.h5"
model = tf.keras.models.load_model(saved_model_path)


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
    image_uri = patient_info.image
    image_data = process_image(image_uri)

    if image_data is None:
        return JSONResponse(content={"error": "Invalid image URI"}, status_code=400)

    try:
        # Assuming your model expects a numpy array
        img_input = np.array.reshape(image_data, (1, image_data.shape[0], image_data.shape[1], image_data.shape[2]))
        prediction = model.predict(img_input)
        return {"prediction": int(prediction[0])}
    except Exception as e:
        return JSONResponse(content={"error": f"Error during prediction: {e}"}, status_code=500)
