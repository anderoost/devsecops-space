import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleTodo = async (id, done, todoText) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: todoText, done: !done })
    });
    setTodos(todos.map(t => t.id === id ? { ...t, done: !done } : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>DevSecOps To-Do</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Nueva tarea"
          className="todo-input"
        />
        <button type="submit" className="todo-btn">Agregar</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <span onClick={() => toggleTodo(todo.id, todo.done, todo.text)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
