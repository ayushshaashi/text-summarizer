from flask import Flask, render_template, request, jsonify
from flask_cors import cross_origin, CORS
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)
CORS(app)  # Apply CORS globally for all routes

# Load tokenizer and model (improved error handling)
try:
    tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
    model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")
    pipe = pipeline("summarization", model=model, tokenizer=tokenizer)
    print("Model and tokenizer loaded successfully!")  # Informative message
except Exception as e:
    print(f"Error loading model or tokenizer: {str(e)}")
    exit(1)  # Exit with error code

@app.route('/summarize', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def summarize():
    try:
        print('Request received for summarization!')

        data = request.get_json(force=True)
        article = data.get('article')  # Use .get to handle missing key gracefully

        if not article:
            return jsonify({'error': 'Missing article text in request'}), 400

        summary = pipe(article, max_length=130, min_length=30, do_sample=False)[0]['summary_text']
        return jsonify({'summary': summary})

    except Exception as e:
        print(f'Error during summarization: {str(e)}')
        return jsonify({'error': 'An error occurred during summarization'}), 500

if __name__ == '__main__':
    app.run(debug=True)
