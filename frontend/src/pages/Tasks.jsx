import React, { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Tasks({ session, onLogout }) {
  const { token, user } = session;
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState('');

  const handle = async (fn) => {
    setError('');
    try {
      await fn();
    } catch (err) {
      if (err.message.toLowerCase().includes('token')) return onLogout();
      setError(err.message);
    }
  };

  useEffect(() => {
    handle(async () => setTasks(await api.listTasks(token)));
  }, []);

  const add = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    handle(async () => {
      const task = await api.createTask(token, title);
      setTasks([task, ...tasks]);
      setTitle('');
    });
  };

  const toggle = (t) =>
    handle(async () => {
      const updated = await api.updateTask(token, t._id, { done: !t.done });
      setTasks(tasks.map((x) => (x._id === t._id ? updated : x)));
    });

  const saveEdit = (t) =>
    handle(async () => {
      const updated = await api.updateTask(token, t._id, { title: editTitle });
      setTasks(tasks.map((x) => (x._id === t._id ? updated : x)));
      setEditing(null);
    });

  const remove = (t) =>
    handle(async () => {
      await api.deleteTask(token, t._id);
      setTasks(tasks.filter((x) => x._id !== t._id));
    });

  return (
    <div className="card">
      <div className="row between">
        <span>Hi, {user.name}</span>
        <button className="secondary" onClick={onLogout}>Logout</button>
      </div>

      <form className="row" onSubmit={add}>
        <input placeholder="New task..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="tasks">
        {tasks.length === 0 && <li className="empty">No tasks yet.</li>}
        {tasks.map((t) => (
          <li key={t._id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
            {editing === t._id ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <button onClick={() => saveEdit(t)}>Save</button>
                <button className="secondary" onClick={() => setEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className={t.done ? 'done' : ''}>{t.title}</span>
                <button className="secondary" onClick={() => { setEditing(t._id); setEditTitle(t.title); }}>Edit</button>
                <button className="danger" onClick={() => remove(t)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
