import React, { useState } from 'react';
import { api } from '../api.js';

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data =
        mode === 'login'
          ? await api.login({ email: form.email, password: form.password })
          : await api.register(form);
      onLogin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>{mode === 'login' ? 'Login' : 'Create account'}</h2>
      {mode === 'register' && (
        <input name="name" placeholder="Name" value={form.name} onChange={change} required />
      )}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
      <input
        name="password"
        type="password"
        placeholder="Password (min 6)"
        value={form.password}
        onChange={change}
        minLength={6}
        required
      />
      {error && <p className="error">{error}</p>}
      <button disabled={loading}>{loading ? '...' : mode === 'login' ? 'Login' : 'Register'}</button>
      <p className="switch">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <a href="#" onClick={(e) => { e.preventDefault(); setError(''); setMode(mode === 'login' ? 'register' : 'login'); }}>
          {mode === 'login' ? 'Register' : 'Login'}
        </a>
      </p>
    </form>
  );
}
