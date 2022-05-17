from flask import Blueprint, jsonify, request
import database.init_db

notes = Blueprint('notes', __name__)


@notes.route('/api/notes', methods=['GET'])
def index():
    try:
        psql = database.init_db.connectDB()
        psql.execute("SELECT * FROM note")
        notes = psql.fetchall()
        return jsonify(notes)
    except Exception as e:
        return jsonify({"error": str(e)})


@notes.route('/api/notes/<int:id>', methods=['GET'])
def get_note(id):
    try:
        psql = database.init_db.connectDB()
        psql.execute("SELECT * FROM note WHERE id = %(id)s", {'id': id})
        note = psql.fetchone()
        psql.close()
        if note is None:
            return jsonify({'message': 'Note not found'}), 404
        return jsonify(note)
    except Exception as e:
        return jsonify({"error": str(e)})


@notes.route('/api/notes', methods=['POST'])
def create_note():
    # verify if the fields in the request are valid
    errors = validate_note(request.json)
    if errors:
        return jsonify({'errors': errors}), 422
    try:
        psql = database.init_db.connectDB()
        psql.execute(
            "INSERT INTO note (title, description) VALUES (%(title)s, %(description)s)", request.json)
        psql.close()
        return jsonify({'message': 'Note created'}), 201
    except Exception as e:
        return jsonify({"error": str(e)})

# Function to validate the request fields 
def validate_note(note):
    errors = []
    if not note.get('title'):
        errors.append('Missing title')
    if not note.get('content'):
        errors.append('Missing content')
    return errors
