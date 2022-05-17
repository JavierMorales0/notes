from flask import Flask, jsonify
import requests
from os import environ

from routes.notes import notes
import database.init_db

# Crear instancia de la aplicacion
app = Flask(__name__)

# Registrar las rutas
app.register_blueprint(notes)

