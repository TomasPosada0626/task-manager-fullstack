
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Alert, CircularProgress, Paper, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface RegisterFormProps {
  onSubmit: (email: string, username: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const isPasswordStrong = (pwd: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pwd);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isUsernameValid = username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  const isPasswordValid = password.length >= 8;
  const isConfirmValid = password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (email && username && password && password === confirmPassword && isPasswordStrong(password)) {
      onSubmit(email, username, password);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 420, mx: 'auto', background: 'rgba(255,255,255,0.98)' }}>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
          <LockOpenIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight={700} mb={1}>
            Register
          </Typography>
        </Box>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
          error={touched && !isEmailValid}
          helperText={touched && !isEmailValid ? 'Email inválido' : ' '}
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
          error={touched && !isUsernameValid}
          helperText={touched && !isUsernameValid ? 'El username debe tener al menos 3 caracteres y solo letras, números o _' : ' '}
        />
        <Tooltip title="Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo" arrow>
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
            error={Boolean(touched && (!isPasswordValid || !isPasswordStrong(password)))}
            helperText={
              touched && !isPasswordValid
                ? 'La contraseña debe tener al menos 8 caracteres'
                : touched && password && !isPasswordStrong(password)
                ? 'Debe incluir mayúscula, minúscula, número y caracter especial'
                : ' '
            }
          />
        </Tooltip>
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon color="action" />
              </InputAdornment>
            ),
          }}
          error={touched && !isConfirmValid}
          helperText={touched && !isConfirmValid ? 'Las contraseñas no coinciden' : ' '}
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
          {loading ? 'Registrando...' : 'Register'}
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
