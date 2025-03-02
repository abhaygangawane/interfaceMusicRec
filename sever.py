from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
import io

app = Flask(__name__)

# Load PyTorch model
MODEL_PATH = "best_2_scripted.pt"  # Ensure this is the correct file
model = torch.jit.load(MODEL_PATH, map_location="cpu")
model.eval()

# Define image transformation (modify as needed based on your model input requirements)
def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((800, 800)),  # Resize to match model input
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0)  # Add batch dimension

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    image_bytes = file.read()
    
    input_tensor = transform_image(image_bytes)
    with torch.no_grad():
        output = model(input_tensor)
    
    return jsonify({"prediction": output.tolist()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
