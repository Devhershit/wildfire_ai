# 🔥 Wildfire Detection AI

Welcome to the **Wildfire Detection AI** project! This project uses artificial intelligence to automatically detect the presence of wildfires in aerial or forest images.

## 🌟 What Does This Do?
When you give the AI an image of a forest or landscape, it will analyze the image and tell you if it spots a wildfire. It also gives you a "confidence percentage" so you know how sure the AI is about its decision.

This can be incredibly useful for early fire detection and environmental monitoring.

## 🛠️ Features
- **Web Interface:** A beautiful, easy-to-use web app built with Streamlit where you can simply upload an image and see the results instantly.
- **Command Line Script:** A fast Python script (`detect.py`) if you prefer running things from your terminal.
- **Pre-trained AI Model:** Uses a deep learning model to accurately classify images.

## 🚀 How to Set Up and Run

### 1. Install Requirements
First, make sure you have Python installed. Then, open your terminal (or command prompt) and run this command to install the required libraries:
```bash
pip install streamlit tensorflow numpy pillow
```
*(Alternatively, you can install from a requirements.txt file if you have one).*

### 2. Run the Web App (Recommended)
To launch the interactive web interface, run:
```bash
streamlit run app.py
```
This will open a new tab in your web browser where you can upload an image and let the AI do its magic!

### 3. Run the Command Line Script
If you just want to quickly test an image from the terminal without opening a web browser, you can run:
```bash
python detect.py
```
Make sure you have your model in the `models/` folder and a test image in the `test_images/` folder!

## 📁 Project Structure
- `app.py`: The code for the interactive Streamlit web application.
- `detect.py`: The command line script for running the model directly.
- `models/`: Folder containing the trained AI model (`wildfire_detection_model.keras`).
- `test_images/`: Folder for keeping sample images to test the AI.

## 🤝 Contribution
Feel free to fork this project, improve the model, or make the web app even better. Contributions are always welcome!
