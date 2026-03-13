# 🎨 Frontend - Mockup de Sistema de Inventario

¡Bienvenido al frontend de nuestra aplicación! Este proyecto está desarrollado en **Angular** y se encarga de todo lo que el usuario ve y con lo que interactúa (Login, Registro, etc.).

Si nunca has levantado un proyecto en Angular, ¡no te preocupes! Sigue esta guía paso a paso y lo lograremos juntos.

## 🛑 1. Requisitos Previos (¡Instalar antes de empezar!)
Para que Angular funcione, tu computadora necesita tener instalado lo siguiente:

* **Node.js (versión LTS recomendada):** Es el motor que nos permite usar paquetes de desarrollo. Al instalarlo, también se instala `npm` (el gestor de paquetes).
  * [Descargar Node.js aquí](https://nodejs.org/).
  * ⚠️ *Importante: Si acabas de instalar Node.js, **debes reiniciar Visual Studio Code** o la terminal que estés usando para que lo reconozca.*
* **Visual Studio Code (VS Code):** Nuestro editor de código.
  * [Descargar VS Code aquí](https://code.visualstudio.com/).

## 🌍 2. Instalación de Angular (Una sola vez)
Angular necesita una herramienta global en tu computadora para poder ejecutar sus comandos. 

1. Abre una terminal nueva en VS Code (`Terminal > Nueva Terminal`).
2. Escribe el siguiente comando y presiona Enter:
```bash
npm install -g @angular/cli
```
*(El `-g` significa "global", por lo que solo tendrás que hacer esto una vez en tu computadora, no por cada proyecto).*

## 💻 3. Preparando Nuestro Proyecto

1. **Abre el proyecto en VS Code:**
   Abre VS Code, ve a `Archivo > Abrir Carpeta` y selecciona la carpeta de este proyecto (`login_Frontend`).
2. **Abre la Terminal de VS Code.**
3. **Instala las dependencias del proyecto:**
   Ahora vamos a descargar todas las librerías específicas que necesita este proyecto (como las herramientas para los formularios y el diseño). Ejecuta:
```bash
npm install
```
*(Esto creará una carpeta llamada `node_modules` que puede tardar un par de minutos en llenarse. ¡Es normal!)*

## 🚀 4. ¡A encender el Frontend!

Con todo instalado, vamos a levantar el servidor de desarrollo para ver nuestra aplicación en el navegador:

```bash
ng serve -o
```
*(El `-o` es un atajo para "open", que abrirá automáticamente la página en tu navegador por defecto).*

> ⚠️ **¿Te dio un error rojo en Windows sobre "ng.ps1 no se puede cargar porque la ejecución de scripts está deshabilitada"?**
> Al igual que con Python, Windows bloquea algunos comandos por seguridad. Para solucionarlo:
> 1. En la terminal de VS Code, escribe esto y presiona Enter:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
> 2. Vuelve a intentar el comando `ng serve -o`.

Si todo salió bien, verás un mensaje verde de "Compiled successfully" y tu aplicación brillando en `http://localhost:4200/`.

---

## 🛠️ Tecnologías utilizadas en este proyecto
* **Angular:** El framework principal estructurado en componentes.
* **TypeScript:** Una versión superpoderosa de JavaScript.
* **HTML5 & CSS3:** Para darle estructura y un diseño moderno tipo tarjeta usando Flexbox.
* **Reactive Forms:** Para manejar de forma segura los datos que escribes en los formularios (login/registro).