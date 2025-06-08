import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
