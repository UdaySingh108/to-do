// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoPage from './pages/TodoPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
