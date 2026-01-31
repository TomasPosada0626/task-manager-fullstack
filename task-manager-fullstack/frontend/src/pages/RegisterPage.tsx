import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleRegister = async (email: string, username: string, password: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await register(email, username, password);
      setLoading(false);
      navigate('/login');
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message?: string }).message || 'Registration failed');
      } else {
        setError('Registration failed');
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <div>
        <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
