import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './hooks/useStore';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, setUser } = useStore();

  useEffect(() => {
    // Verificar se há um token salvo e validar
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      // Aqui você poderia validar o token com o backend
      // Por enquanto, vamos simular um usuário logado
      setUser({
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      });
    }
  }, [user, setUser]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
