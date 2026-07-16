# 🔥 Wildfire Detection AI

Welcome to the **Wildfire Detection AI** project! This project uses artificial intelligence to automatically detect the presence of wildfires in aerial or forest images.

## 🌟 What Does This Do?
When you give the AI an image of a forest or landscape, it will analyze the image and tell you if it spots a wildfire. It also gives you a "confidence percentage" so you know how sure the AI is about its decision.

This can be incredibly useful for early fire detection and environmental monitoring.

## 🛠️ Features
- **Modern Full-Stack Architecture:** Features a sleek, interactive React frontend (with a beautiful dark theme and dynamic background) connected to a high-performance FastAPI Python backend.
- **Alternative Interfaces:** Includes an easy-to-use Streamlit web app and a fast Python CLI script (`detect.py`) for quick testing.
- **Pre-trained AI Model:** Uses a deep learning model to accurately classify images.

## 🚀 How to Set Up and Run

### 1. Install Backend Requirements
First, make sure you have Python installed. Open your terminal and run this command to install the required libraries for the AI model and the FastAPI backend:
```bash
pip install fastapi uvicorn python-multipart streamlit tensorflow numpy pillow
```

### 2. Run the Full-Stack App (Recommended)
This requires running both the backend API and the frontend UI at the same time in two separate terminals.

**Terminal 1 (Backend):**
Start the FastAPI server which loads the AI model:
```bash
python api.py
```
*(Runs on `http://localhost:8000`)*

**Terminal 2 (Frontend):**
Navigate to the frontend folder, install dependencies, and start the React app:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

Now, open your browser to the frontend URL to use the premium drag-and-drop interface!

### 3. Alternative: Run the Streamlit App
If you prefer a simpler, all-in-one interface without the React frontend:
```bash
streamlit run app.py
```

### 4. Alternative: Command Line Script
If you just want to quickly test an image from the terminal:
```bash
python detect.py
```
*(Make sure you have your model in the `models/` folder and a test image in the `test_images/` folder!)*

## 📁 Project Structure
- `api.py`: The FastAPI backend server for the React app.
- `frontend/`: The modern React frontend built with Vite and Tailwind CSS v4.
- `app.py`: The code for the alternative Streamlit web application.
- `detect.py`: The command line script for running the model directly.
- `models/`: Folder containing the trained AI model (`wildfire_detection_model.keras`).
- `test_images/`: Folder for keeping sample images to test the AI.

## 🤝 Contribution
Feel free to fork this project, improve the model, or make the web app even better. Contributions are always welcome!
