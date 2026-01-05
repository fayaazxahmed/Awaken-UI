"""
Process images/PDFs using Chandra OCR Model

This script loads the Chandra model and processes input files to generate
Markdown, HTML, or JSON output.
"""

import sys
import os
from pathlib import Path
from PIL import Image
from transformers import AutoProcessor, AutoModelForVision2Seq
import torch

def load_model():
    """Load Chandra model to CPU"""
    print("Loading Chandra model...")
    processor = AutoProcessor.from_pretrained("datalab-to/chandra")
    model = AutoModelForVision2Seq.from_pretrained(
        "datalab-to/chandra",
        device_map="cpu",
        torch_dtype=torch.float32
    )
    model = model.to("cpu")
    model.eval()
    print("Model loaded successfully")
    return processor, model

def process_file(input_path: str, output_dir: str, processor, model):
    """
    Process a file (image or PDF) using Chandra model
    
    Args:
        input_path: Path to input file
        output_dir: Directory to save output files
        processor: Loaded processor
        model: Loaded model
    """
    input_path = Path(input_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Load image
    if input_path.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif', '.bmp']:
        image = Image.open(input_path).convert('RGB')
    else:
        raise ValueError(f"Unsupported file type: {input_path.suffix}")
    
    print(f"Processing: {input_path.name}")
    
    # Process with model
    # Note: This is a simplified example. Full implementation would need
    # to handle the specific input format expected by Chandra
    inputs = processor(images=image, return_tensors="pt")
    
    # Generate output
    with torch.no_grad():
        generated_ids = model.generate(**inputs, max_length=512)
    
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    
    # Save output
    output_base = output_dir / input_path.stem
    with open(f"{output_base}.md", "w", encoding="utf-8") as f:
        f.write(generated_text)
    
    print(f"Output saved to: {output_base}.md")
    return generated_text

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_with_chandra.py <input_file> <output_dir>")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    processor, model = load_model()
    result = process_file(input_path, output_dir, processor, model)
    print("Processing complete!")

