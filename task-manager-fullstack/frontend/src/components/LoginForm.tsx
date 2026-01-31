
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Alert, CircularProgress, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface LoginFormProps {
  onSubmit: (identifier: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (identifier && password) {
      onSubmit(identifier, password);
    }
  };

  const isIdentifierValid = identifier.length >= 3;
  const isPasswordValid = password.length >= 8;

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 380, mx: 'auto', background: 'rgba(255,255,255,0.98)' }}>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
          <LockIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight={700} mb={1}>
            Login
          </Typography>
        </Box>
        <TextField
          label="Email o Username"
          variant="outlined"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
          error={touched && !isIdentifierValid}
          helperText={touched && !isIdentifierValid ? 'Ingresa tu email o username' : ' '}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon color="action" />
              </InputAdornment>
            ),
          }}
          error={touched && !isPasswordValid}
          helperText={touched && !isPasswordValid ? 'La contraseña debe tener al menos 8 caracteres' : ' '}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mt: 1, fontWeight: 600, borderRadius: 2, boxShadow: 1 }}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Entrando...' : 'Login'}
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
