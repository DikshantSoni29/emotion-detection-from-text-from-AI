from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load pre-trained emotion pipeline
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)
@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    data = request.json
    text = data.get('text', '')

    if not text.strip():
        return jsonify({'error': 'Empty text'}), 400

    result = emotion_classifier(text)[0]
    return jsonify({'label': result['label'], 'score': result['score']})

if __name__ == '__main__':
    app.run(debug=True)