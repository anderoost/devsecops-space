# devsecops-space
Píldoras y desafíos - Ekoparty DevSecOps Space 2025

# DevSecOps Space - To-Do App

## Estructura

- `server/` → Backend Node.js + Express + SQLite
- `client/` → Frontend React + Vite (colores oficiales Ekoparty DevSecOps Space)

## Levantar el backend

```bash
cd src
npm install
npm run dev
```

Esto inicia el backend en `http://localhost:3001`.

### Endpoints principales

- `GET    /api/todos`         → Listar todas las tareas
- `POST   /api/todos`         → Crear nueva tarea `{ text }`
- `PUT    /api/todos/:id`     → Editar tarea `{ text, done }`
- `DELETE /api/todos/:id`     → Eliminar tarea

### Seed de ejemplo

Puedes agregar tareas de ejemplo ejecutando este script en NodeJS dentro de `server/seed.js`:

```js
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await open({ filename: './todos.db', driver: sqlite3.Database });
await db.run("INSERT INTO todos (text, done) VALUES ('Primer reto DevSecOps', 0)");
await db.run("INSERT INTO todos (text, done) VALUES ('Explorar la app', 0)");
console.log('Seeds insertados');
await db.close();
```

Guarda esto como `server/seed.js` y ejecútalo con:

```bash
node seed.js
```

## Levantar el frontend

```bash
cd site
npm install
npm run dev
```

Esto inicia el frontend en `http://localhost:5173`.

## Notas

- El frontend espera el backend en `http://localhost:3001`.
- Puedes personalizar los colores en `client/src/App.css`.
- Ideal para crear retos de seguridad y pruebas de DevSecOps.
