"""
Load Chandra OCR Model for CPU inference

This script loads the Chandra model from Hugging Face and configures it for CPU usage.
Based on: https://huggingface.co/datalab-to/chandra
"""

from transformers import AutoProcessor, AutoModelForVision2Seq
import torch

def load_chandra_model():
    """
    Load the Chandra OCR model to CPU.
    
    Returns:
        tuple: (processor, model) - The loaded processor and model
    """
    print("Loading Chandra model from Hugging Face...")
    print("Model: datalab-to/chandra")
    print("Device: CPU")
    
    # Load processor
    processor = AutoProcessor.from_pretrained("datalab-to/chandra")
    print("✓ Processor loaded")
    
    # Load model to CPU
    model = AutoModelForVision2Seq.from_pretrained(
        "datalab-to/chandra",
        device_map="cpu",  # Explicitly set to CPU
        torch_dtype=torch.float32  # Use float32 for CPU (better compatibility)
    )
    
    # Ensure model is on CPU (additional safety check)
    model = model.to("cpu")
    model.eval()  # Set to evaluation mode
    
    print("✓ Model loaded to CPU")
    print(f"Model device: {next(model.parameters()).device}")
    
    return processor, model

if __name__ == "__main__":
    try:
        processor, model = load_chandra_model()
        print("\n✓ Chandra model successfully loaded and ready for inference!")
        print(f"Model type: {type(model)}")
        print(f"Processor type: {type(processor)}")
    except Exception as e:
        print(f"\n✗ Error loading model: {e}")
        raise

