# Backend - API de Autenticación

Este es el backend de la aplicación, construido con **Python y Flask**. Proporciona una API RESTful para manejar el registro y la autenticación de usuarios de forma segura utilizando `bcrypt` para el hash de contraseñas.

## 🚀 Tecnologías utilizadas
* **Python 3**
* **Flask** (Microframework web)
* **Flask-CORS** (Para permitir peticiones desde el frontend en Angular)
* **Bcrypt** (Encriptación segura de contraseñas)
* **JSON** (Almacenamiento local de datos)

## 📁 Estructura de Datos
Para este mockup, la base de datos es un archivo de texto plano ubicado en `data/users.txt`. 
* El archivo se crea automáticamente si no existe al iniciar el servidor.
* **Seguridad:** Las contraseñas NUNCA se guardan en texto plano; se encriptan con `bcrypt` antes de ser almacenadas. No agregues usuarios manualmente escribiendo contraseñas normales en este archivo.

## ⚙️ Requisitos previos
* Python 3.x instalado en el sistema.

## 🛠️ Instalación y ejecución

1. **Navega a la carpeta del backend**:
   ```bash
   cd login_Backend

2. **Crea y activa un entorno virtual (Recomendado):**

Bash
python -m venv .venv
# En Windows:
.venv\Scripts\activate
# En Mac/Linux:
source .venv/bin/activate
3. **Instala las dependencias necesarias:**
Si tienes un archivo requirements.txt, ejecuta pip install -r requirements.txt. Si no, instala los paquetes manualmente:

Bash
pip install flask flask-cors bcrypt
4. **Inicia el servidor:**

Bash
python app.py
El servidor se ejecutará en modo debug en http://localhost:5000/.
http://localhost:5000/apidocs/

**📡 Endpoints de la API**
POST /register: Recibe { "username": "...", "password": "..." }. Encripta la contraseña y guarda al usuario.

POST /login: Recibe las credenciales, verifica el hash de la contraseña y devuelve un mensaje de éxito.