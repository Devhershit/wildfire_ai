from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array
import io
from PIL import Image
import os

# Silence unnecessary warning logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

app = FastAPI(title="Wildfire Detection API")

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be restricted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "models/wildfire_detection_model.keras"

print("Loading trained model for API...")
model = None
if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)
else:
    print(f"Warning: Model not found at {MODEL_PATH}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        return {"error": "Model not loaded on server."}
        
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Resize and preprocess for the model
        image = image.resize((224, 224))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Run detection
        prediction = model.predict(img_array, verbose=0)[0][0]
        prediction_value = float(prediction)
        
        is_fire = prediction_value >= 0.5
        confidence = prediction_value if is_fire else (1 - prediction_value)
        
        return {
            "success": True,
            "fire_detected": is_fire,
            "confidence": confidence,
            "raw_score": prediction_value
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    print("Starting server on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
