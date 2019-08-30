from flask import Flask
from flask import Flask, redirect, url_for, request, render_template
import os
from werkzeug.utils import secure_filename
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['image']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
        basepath, 'static/uploads', secure_filename(f.filename))
        f.save(file_path)
        return 'POST'
    # if request.method == 'GET':
    #     return 'GET'
    
    
