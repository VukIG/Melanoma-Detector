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

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormData(BaseModel):
    img: Optional[str] = None

def base64_to_numpy(base64_string):
    decoded_bytes = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(decoded_bytes))
    image_np = np.array(image)
    return image_np

@app.post('/predict')
def predict(formData: FormData):
    image_array = base64_to_numpy(formData.img)
    return { "message " : image_array}