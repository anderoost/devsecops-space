import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await open({ filename: './todos.db', driver: sqlite3.Database });
await db.run("INSERT INTO todos (text, done) VALUES ('Primer reto DevSecOps', 0)");
await db.run("INSERT INTO todos (text, done) VALUES ('Explorar la app', 0)");
console.log('Seeds insertados');
await db.close();
