import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button } from '@mui/material';

const TasksPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Box sx={{ position: 'fixed', top: 24, right: 32, zIndex: 100 }}>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          sx={{ fontWeight: 700, borderRadius: 3, boxShadow: 2, px: 3, py: 1 }}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ pt: 6 }}>
        <TaskForm />
        <TaskList />
      </Box>
    </Box>
  );
};

export default TasksPage;
