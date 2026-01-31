import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { login: loginContext, logout } = useAuth();
  // Al cargar la página de login, forzar logout para limpiar cualquier estado previo
  useEffect(() => {
    logout();
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (identifier: string, password: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await login(identifier, password);
      loginContext(data.token); // Actualiza el contexto de autenticación
      setLoading(false);
      navigate('/');
    } catch (err: unknown) {
      setError('Invalid email/username or password');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <div>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span>Don&apos;t have an account? </span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
