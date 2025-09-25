import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: './src/todos.db',
    driver: sqlite3.Database
  });
  await db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )`);
}

app.get('/api/todos', async (req, res) => {
  const todos = await db.all('SELECT * FROM todos');
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const result = await db.run('INSERT INTO todos (text, done) VALUES (?, ?)', [text, 0]);
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', [result.lastID]);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  await db.run('UPDATE todos SET text = ?, done = ? WHERE id = ?', [text, done ? 1 : 0, id]);
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', [id]);
  res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM todos WHERE id = ?', [id]);
  res.status(204).end();
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  });
});
