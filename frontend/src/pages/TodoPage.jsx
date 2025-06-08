import { useEffect, useState } from 'react';
import API from '../api/api';
import TodoItem from '../components/TodoItem';
import { useNavigate } from 'react-router-dom';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      alert('Error fetching todos');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await API.post('/todos', { task });
      setTodos([...todos, res.data]);
      setTask('');
    } catch (err) {
      alert('Error adding todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await API.put(`/todos/${id}`, { completed: !currentStatus });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (err) {
      alert('Update failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todo Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
