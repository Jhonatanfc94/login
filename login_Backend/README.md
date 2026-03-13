# 🚀 Backend - API de Autenticación

¡Bienvenido al backend de nuestra aplicación! Este proyecto está construido con **Python y Flask**. Proporciona una API RESTful para manejar el registro y la autenticación de usuarios de forma segura.

Si es tu primera vez trabajando con un backend, ¡no te preocupes! Sigue estos pasos uno a uno.

## 🛑 1. Requisitos Previos (¡Muy Importante!)
Antes de escribir cualquier comando, asegúrate de tener instaladas estas herramientas en tu computadora:

* **Python (versión 3.8 o superior):** Es el lenguaje en el que está escrito el código. 
  * [Descargar Python aquí](https://www.python.org/downloads/). *(Nota para Windows: Durante la instalación, asegúrate de marcar la casilla **"Add Python to PATH"** en la primera pantalla).*
* **Visual Studio Code (VS Code):** Es el editor de código donde trabajaremos.
  * [Descargar VS Code aquí](https://code.visualstudio.com/).
* **Postman (Opcional pero recomendado):** Para probar que nuestra API funciona.
  * [Descargar Postman aquí](https://www.postman.com/downloads/).

## 💻 2. Preparando el Entorno

1. **Abre el proyecto en VS Code:**
   Abre Visual Studio Code, ve a `Archivo > Abrir Carpeta` (File > Open Folder) y selecciona la carpeta principal de este proyecto (`login_Backend`).
2. **Abre la Terminal:**
   En VS Code, ve al menú superior y selecciona `Terminal > Nueva Terminal`.

## ⚙️ 3. Instalación paso a paso

Vamos a crear un "Entorno Virtual". Esto es como una burbuja aislada en tu computadora para que las herramientas de este proyecto no interfieran con otros programas.

**Paso A: Crear la burbuja (Entorno Virtual)**
En tu terminal, escribe el siguiente comando y presiona Enter:
```bash
python -m venv .venv
```
*(Notarás que aparece una nueva carpeta llamada `.venv` en tus archivos).*

**Paso B: Entrar a la burbuja (Activar el entorno)**
Dependiendo de tu sistema operativo, ejecuta el comando correspondiente:

* **En Mac/Linux:**
  ```bash
  source .venv/bin/activate
  ```
* **En Windows (PowerShell/CMD):**
  ```powershell
  .venv\Scripts\activate
  ```
  > ⚠️ **¿Te dio un error rojo en Windows sobre permisos?**
  > Esto es normal. Windows bloquea la ejecución de scripts por seguridad. Para solucionarlo, escribe esto en la terminal y presiona Enter:
  > `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
  > Luego, vuelve a intentar el comando `.venv\Scripts\activate`.

Sabrás que funcionó porque en tu terminal aparecerá la palabra `(.venv)` al inicio de la línea.

**Paso C: Instalar las herramientas mágicas (Dependencias)**
Ahora que estamos dentro de la burbuja, vamos a instalar Flask, herramientas de seguridad y documentación. Ejecuta:
```bash
pip install -r requirements.txt
```

## 🚀 4. ¡Enciende el Servidor!

Con todo instalado, solo queda arrancar el motor de nuestra API:
```bash
python app.py
```
Si todo salió bien, verás un mensaje en la terminal indicando que el servidor está corriendo.

* **API en vivo:** `http://localhost:5000/`
* **Documentación interactiva (Swagger):** `http://localhost:5000/apidocs/` *(Abre este enlace en tu navegador web para ver y probar los endpoints visualmente).*

---

## 📁 Estructura de Datos y Seguridad
Para mantener este ejercicio sencillo, usamos un archivo de texto plano en `data/users.txt` como base de datos. 
* El archivo se crea solo. No necesitas hacerlo tú.
* **Seguridad:** Aunque usamos un archivo de texto, las contraseñas **NUNCA** se guardan legibles. Se encriptan usando `bcrypt`. Por favor, no intentes agregar usuarios escribiendo en este archivo a mano.

## 📡 Endpoints (Rutas) Principales
Si vas a conectar esto con un frontend (como Angular), estas son las rutas que debes llamar:

* `POST /register`: Recibe `{ "username": "...", "password": "..." }`. Encripta la contraseña y guarda al usuario.
* `POST /login`: Recibe las credenciales, verifica que sean correctas y devuelve un mensaje de éxito.