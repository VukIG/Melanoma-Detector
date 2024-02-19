from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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


# Load your cancer detection model only once when the app starts
@app.get('/')
def index():
    return {'message': 'Amenelibockura'}
