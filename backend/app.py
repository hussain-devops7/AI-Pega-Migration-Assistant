from fastapi import FastAPI, UploadFile, File
import os
import shutil

from parser import parse_inventory
from ai_engine import analyze_inventory

app = FastAPI(
    title="AI Powered Pega Migration Assistant",
    version="1.0"
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.get("/")
def home():
    return {
        "message": "AI Powered Pega Migration Assistant API"
    }

@app.post("/upload")
async def upload_inventory(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    inventory = parse_inventory(filepath)

    report = analyze_inventory(inventory)

    return report
