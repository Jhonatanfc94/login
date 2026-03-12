from flask import Flask, request, jsonify
from flask_cors import CORS
from flasgger import Swagger # 1. Importas Flasgger
import os
import json
import bcrypt

app = Flask(__name__)
CORS(app)

swagger = Swagger(app)
FILE_PATH = 'data/users.txt'

# Crear el directorio y el archivo si no existen
os.makedirs(os.path.dirname(FILE_PATH), exist_ok=True)
if not os.path.exists(FILE_PATH):
    with open(FILE_PATH, 'w') as f:
        json.dump([], f)

def get_users():
    try:
        with open(FILE_PATH, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def save_users(users):
    with open(FILE_PATH, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/register', methods=['POST'])
def register():
    """
    Registra un nuevo usuario en el sistema.
    Recibe un nombre de usuario y una contraseña, la encripta usando bcrypt y la guarda en la base de datos local.
    ---
    tags:
      - Autenticación
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - username
            - password
          properties:
            username:
              type: string
              example: nuevo_usuario
            password:
              type: string
              example: MiPasswordSeguro123
    responses:
      201:
        description: Usuario registrado con éxito
      400:
        description: Datos inválidos o el usuario ya existe
    """
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
         return jsonify({'message': 'Datos inválidos'}), 400

    username = data['username']
    password = data['password']
    users = get_users()

    # Verificar si el usuario ya existe
    for user in users:
        if user['username'] == username:
            return jsonify({'message': 'El usuario ya existe'}), 400

    # Hashear la contraseña (compatible con PASSWORD_BCRYPT de PHP)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    users.append({
        'username': username,
        'password': hashed_password
    })

    save_users(users)
    return jsonify({'message': 'Usuario registrado con éxito'}), 201

@app.route('/login', methods=['POST'])
def login():
    """
    Inicia sesión en el sistema.
    Esta ruta recibe un usuario y contraseña y verifica si coinciden
    con la base de datos.
    ---
    tags:
      - Autenticación
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - username
            - password
          properties:
            username:
              type: string
              example: tester
            password:
              type: string
              example: 123456
    responses:
      200:
        description: Login exitoso
      400:
        description: Datos inválidos
      401:
        description: Credenciales incorrectas
    """
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
         return jsonify({'message': 'Datos inválidos'}), 400

    username = data['username']
    password = data['password']
    users = get_users()

    # Buscar el usuario y verificar contraseña
    for user in users:
        if user['username'] == username:
            # Comparamos la contraseña en texto plano con el hash guardado
            if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                # Por seguridad, no enviamos el hash de la contraseña de vuelta al frontend
                safe_user = {'username': user['username']}
                return jsonify({'message': 'Login exitoso', 'user': safe_user}), 200

    return jsonify({'message': 'Credenciales incorrectas'}), 401

@app.route('/user/<username>', methods=['DELETE'])
def delete_user(username):
    """
    Elimina un usuario del sistema.
    ---
    tags:
      - Autenticación
    parameters:
      - name: username
        in: path
        type: string
        required: true
        description: Nombre de usuario a eliminar
    responses:
      200:
        description: Usuario eliminado con éxito
      404:
        description: Usuario no encontrado
    """
    users = get_users()
    initial_count = len(users)
    
    # Filtrar la lista excluyendo al usuario que queremos eliminar
    users = [user for user in users if user['username'] != username]
    
    # Si la longitud es la misma, el usuario no existía
    if len(users) == initial_count:
        return jsonify({'message': 'Usuario no encontrado'}), 404
        
    save_users(users)
    return jsonify({'message': 'Usuario eliminado con éxito'}), 200

# Iniciar el servidor
if __name__ == '__main__':
    # debug=True reinicia el servidor automáticamente cuando haces cambios
    app.run(debug=True, port=5000)