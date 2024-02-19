from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import base64
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

class FormData:
    img:str
    
def base64_to_numpy(base64_string):
    decoded_bytes = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(decoded_bytes))
    image_np = np.array(image)
    return image_np

# Load your cancer detection model only once when the app starts
@app.get('/')
def index():
    return {'message': 'Amenelibockura'}


@app.post('/predict')
def predict(formData: FormData):
    image_array = base64_to_numpy(formData.img)
    return { "message " : image_array}