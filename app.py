from flask import Flask, request, jsonify
import requests
from os import environ

# Crear instancia de la aplicacion
app = Flask(__name__)
# API_KEY y API_URL
API_KEY = environ.get('API_KEY')
API_URL = environ.get('API_URL')

# Crear ruta para la raiz de la aplicacion


@app.route('/', methods=['GET'])
def index():
    city = request.args.get('city') or 'San_Miguel,El_Salvador'
    api_result = requests.get(
        API_URL + "/current?access_key=" + API_KEY + "&query=" + city)
    return jsonify(api_result.json())