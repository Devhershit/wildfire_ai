import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array

# Silence unnecessary warning logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

MODEL_PATH = "models/wildfire_detection_model.keras"
IMAGE_PATH = "test_images/sample.jpg"  

print("Loading trained model...")
model = tf.keras.models.load_model(MODEL_PATH)

print(f"Processing image...")
# Load and resize the image to exactly what the model was trained on
img = load_img(IMAGE_PATH, target_size=(224, 224))
img_array = img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

print("Running detection...")
prediction = model.predict(img_array, verbose=0)[0][0]

print("-" * 30)
if prediction >= 0.5:
    print(f"🔥 WILDFIRE DETECTED! (Confidence: {prediction * 100:.2f}%)")
else:
    print(f"🌳 Clear / No Fire (Confidence: {(1 - prediction) * 100:.2f}%)")
print("-" * 30)