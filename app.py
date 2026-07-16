import streamlit as st
import numpy as np
import tensorflow as tf
from PIL import Image
import os

# Silence TF warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

st.set_page_config(page_title="Wildfire Detector", page_icon="🔥")
st.title("🔥 Wildfire Detection AI")
st.write("Upload an aerial or forest image to check for wildfires.")

# Cache the model so it only loads once
@st.cache_resource
def load_model():
    return tf.keras.models.load_model("models/wildfire_detection_model.keras")

model = load_model()

# Create a file uploader in the web interface
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Open the image and convert to RGB
    image = Image.open(uploaded_file).convert('RGB')
    
    # Show the image on the screen
    st.image(image, caption="Uploaded Image", use_container_width=True)
    
    with st.spinner("Analyzing image..."):
        # Resize and prepare the image just like before
        img = image.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Run prediction
        prediction = model.predict(img_array, verbose=0)[0][0]
        
        # Display Results
        st.markdown("---")
        if prediction >= 0.5:
            st.error(f"### 🔥 WILDFIRE DETECTED!\n**Confidence:** {prediction * 100:.2f}%")
        else:
            st.success(f"### 🌳 Clear / No Fire\n**Confidence:** {(1 - prediction) * 100:.2f}%")