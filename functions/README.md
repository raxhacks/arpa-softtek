### Iniciar cloud functions emulator
## Testeo local

# Prerequisitos:
- Node.js 18+
- Python 3.11+
- Tener instalado via npm Firebase SDK. Para instalar: `npm install -g firebase-tools`
- Tener en el `firebase.json` el `"runtime": "python3xx"` dentro del key functions.

**NOTA:** Cambiar las 'x' por su version de python (Ej. 3.12) <br/>

# ¨Pasos:
1. Estando dentro de este directorio iniciar un Virtual Environment con `python3.xx -m venv venv`
2. Entrar al venv:
    - Windows: `venv\Scripts\activate`
    - Unix based: `source venv/bin/activate`
3. Instalar librerías `pip install -r requirements.txt` 
4. Correr `firebase emulators:start`