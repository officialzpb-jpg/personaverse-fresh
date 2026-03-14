from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import os
import json
import tempfile
import shutil
from pathlib import Path
import replicate
import httpx
import asyncio
from datetime import datetime

app = FastAPI(title="Jersey Beats Generator", version="0.1.0")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Config
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

# Replicate API token from env
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

class GenerateRequest(BaseModel):
    prompt: str
    options: Optional[dict] = None

class RemixRequest(BaseModel):
    options: Optional[dict] = None

@app.get("/")
async def root():
    return {"message": "Jersey Beats Generator API", "version": "0.1.0"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/generate")
async def generate_beat(request: GenerateRequest):
    """Generate a Jersey Club beat from text prompt using Replicate."""
    
    if not REPLICATE_API_TOKEN:
        raise HTTPException(status_code=500, detail="REPLICATE_API_TOKEN not configured")
    
    try:
        # Enhanced prompt for Jersey Club style
        enhanced_prompt = f"""
        {request.prompt}
        
        Style: Jersey Club, Baltimore Club
        Characteristics: Triplet kick patterns, bed squeak samples, chopped vocal cuts,
        heavy bass, energetic bounce, club-ready production
        """
        
        # Use Replicate's MusicGen or similar model
        # Note: Replace with actual model version
        output = replicate.run(
            "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
            input={
                "prompt": enhanced_prompt,
                "duration": request.options.get("duration", 30) if request.options else 30,
                "model_version": "large",
                "output_format": "mp3",
                "normalization_strategy": "peak"
            }
        )
        
        # Download the generated audio
        async with httpx.AsyncClient() as client:
            response = await client.get(output)
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = OUTPUT_DIR / f"jersey_beat_{timestamp}.mp3"
        
        with open(output_path, "wb") as f:
            f.write(response.content)
        
        return {
            "success": True,
            "name": f"Jersey Beat {timestamp}",
            "url": f"/api/download/{output_path.name}",
            "bpm": request.options.get("bpm", 145) if request.options else 145,
            "prompt": request.prompt,
            "created_at": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@app.post("/api/remix")
async def remix_tracks(
    files: List[UploadFile] = File(...),
    options: str = Form("{}")
):
    """Upload tracks and Jersey-fy them with AI remixing."""
    
    if len(files) == 0:
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    if len(files) > 2:
        raise HTTPException(status_code=400, detail="Max 2 files allowed")
    
    try:
        options_dict = json.loads(options)
    except:
        options_dict = {}
    
    saved_paths = []
    
    # Save uploaded files
    for file in files:
        if not file.content_type.startswith("audio/"):
            continue
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_path = UPLOAD_DIR / f"{timestamp}_{file.filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        saved_paths.append(file_path)
    
    if not saved_paths:
        raise HTTPException(status_code=400, detail="No valid audio files")
    
    # TODO: Implement stem separation with Demucs
    # TODO: Apply Jersey Club patterns
    # For now, return mock response
    
    return {
        "success": True,
        "name": f"Jersey Remix of {files[0].filename}",
        "url": f"/api/download/mock_jersey_remix.mp3",
        "bpm": options_dict.get("bpm", 145),
        "uploaded_files": [f.filename for f in files],
        "note": "Full remix pipeline coming soon - using direct generation for now",
        "created_at": datetime.now().isoformat()
    }

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    """Download a generated beat."""
    file_path = OUTPUT_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(file_path, media_type="audio/mpeg", filename=filename)

@app.get("/api/models")
async def list_models():
    """List available AI models for generation."""
    return {
        "models": [
            {
                "id": "musicgen",
                "name": "MusicGen (Meta)",
                "description": "General music generation, good for Jersey Club with proper prompting",
                "cost_per_minute": "~$0.05"
            },
            {
                "id": "udio",
                "name": "Udio (coming soon)",
                "description": "High quality music generation with style control",
                "cost_per_minute": "~$0.10"
            },
            {
                "id": "suno",
                "name": "Suno (coming soon)",
                "description": "Full song generation with vocals",
                "cost_per_minute": "~$0.08"
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
