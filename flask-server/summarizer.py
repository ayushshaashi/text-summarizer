import pickle
from transformers import pipeline

# Define the summarizer pipeline
summarizer = pipeline("summarization")

# Save the summarizer pipeline object to a pickle file
with open('summarizer_pipeline.pkl', 'wb') as f:
    pickle.dump(summarizer, f)