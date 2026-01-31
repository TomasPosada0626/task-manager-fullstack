
import { useEffect, useState, useCallback } from 'react';
import {
  Paper, Box, Typography, Grid, TextField, MenuItem, Button, Chip, List, IconButton, Alert, CircularProgress, Tooltip, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  fetchTasks, createTask, updateTask, deleteTask, Task
} from '../services/taskService';
import { useNotification } from '../hooks/useNotification';

const initialForm: Partial<Task> = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

const statusColors: Record<string, 'warning' | 'primary' | 'success'> = {
  pending: 'warning',
  'in-progress': 'primary',
  completed: 'success',
};
const priorityColors: Record<string, 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Task>>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { show } = useNotification();
  const [expanded, setExpanded] = useState<string | false>(false);

  // Cerrar el accordion al hacer click fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Si el click no es dentro de un accordion summary, cerrar
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest('.task-accordion-summary')) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const loadTasks = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks(statusFilter, priorityFilter, pageNum, 5);
      setTasks(data.tasks);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter]);

  useEffect(() => {
    loadTasks(1);
  }, [loadTasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError('Title and description are required');
      return;
    }
    try {
      const updatedForm = { ...form };
      // Si se está editando y cambia a 'in-progress', setear startDate
      if (editingId && form.status === 'in-progress' && !form.startDate) {
        updatedForm.startDate = new Date().toISOString();
      }
      // Si se está editando y cambia a 'completed', setear finishedAt
      if (editingId && form.status === 'completed' && !form.finishedAt) {
        updatedForm.finishedAt = new Date().toISOString();
      }
      if (editingId) {
        await updateTask(editingId, updatedForm);
        setSuccessMsg('Task updated successfully!');
        show('Task updated successfully!', 'success');
      } else {
        await createTask(form);
        setSuccessMsg('Task created successfully!');
        show('Task created successfully!', 'success');
      }
      setForm(initialForm);
      setEditingId(null);
      loadTasks(page);
    } catch {
      setError('Error saving task');
    }
  };

  const handleEdit = (task: Task) => {
    setForm({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
    });
    setEditingId(task._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setSuccessMsg('Task deleted successfully!');
      show('Task deleted successfully!', 'success');
      loadTasks(page);
    } catch {
      setError('Error deleting task');
    }
  };

  const handleFilter = () => {
    loadTasks(1);
  };

  const handlePageChange = (newPage: number) => {
    loadTasks(newPage);
  };

  return (
    <Paper sx={{ maxWidth: 900, mx: 'auto', mt: 5, p: 4, borderRadius: 4 }}>
      <Typography variant="h3" mb={3} align="center" fontWeight={700}>
        My Tasks
      </Typography>

      {/* Formulario de tarea */}
      <Box component="form" onSubmit={handleSubmit} mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              name="title"
              label="Title * *"
              value={form.title || ''}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              disabled={!!editingId}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="description"
              label="Description * *"
              value={form.description || ''}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              disabled={!!editingId}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              select
              name="priority"
              label="Priority * *"
              value={form.priority || 'medium'}
              onChange={handleChange}
              fullWidth
              size="small"
              disabled={!!editingId}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              name="dueDate"
              label="Due Date"
              type="date"
              value={form.dueDate || ''}
              onChange={handleChange}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              select
              name="status"
              label="Status * *"
              value={form.status || 'pending'}
              onChange={handleChange}
              fullWidth
              size="small"
              disabled={false}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<AddTaskIcon />}
              sx={{ height: '100%' }}
            >
              {editingId ? 'Update' : 'ADD'}
            </Button>
          </Grid>
          {editingId && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={() => {
                  setForm(initialForm);
                  setEditingId(null);
                }}
                color="secondary"
                sx={{ mt: 1 }}
              >
                Cancel Edit
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Alertas */}
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMsg(null)}>
          {successMsg}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Filtros mejorados */}
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 160, background: '#fff' }}
        >
          <MenuItem value="">Status</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <TextField
          select
          label="Priority"
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 160, background: '#fff' }}
        >
          <MenuItem value="">Priority</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <Button
          variant="contained"
          onClick={handleFilter}
          sx={{ fontWeight: 700, minWidth: 160, height: 40, boxShadow: 1, background: '#2563eb' }}
        >
          APLICAR FILTROS
        </Button>
      </Box>

      {/* Lista de tareas con Accordions retráctiles */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {tasks.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
              No tasks found.
            </Typography>
          ) : (
            tasks.map(task => (
              <Accordion
                key={task._id}
                expanded={expanded === task._id}
                onChange={(_, isExpanded) => setExpanded(isExpanded ? task._id : false)}
                sx={{ mb: 2, borderRadius: 3, boxShadow: 1, background: '#f9fafb' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="task-accordion-summary"
                  sx={{ cursor: 'pointer', borderRadius: 3 }}
                >
                  <Typography variant="h6" fontWeight={700} flex={1}>{task.title}</Typography>
                  <Chip label={task.status} color={statusColors[task.status]} size="small" sx={{ fontWeight: 600, mx: 0.5 }} />
                  <Chip label={task.priority} color={priorityColors[task.priority]} size="small" sx={{ fontWeight: 600, mx: 0.5 }} />
                  {task.dueDate && (
                    <Chip label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`} color="info" size="small" sx={{ mx: 0.5 }} />
                  )}
                  <Tooltip title="Edit">
                    <IconButton onClick={e => { e.stopPropagation(); handleEdit(task); }} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={e => { e.stopPropagation(); handleDelete(task._id); }} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails>
                  <Box ml={1} mb={1}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}><b>Description:</b> {task.description}</Typography>
                    <Typography variant="body2" color="text.secondary"><b>Created:</b> {task.createdAt ? new Date(task.createdAt).toLocaleString() : '-'}</Typography>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                      <b>Due:</b> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                      {Array.isArray(task.dueDateHistory) && task.dueDateHistory.length > 0 && (
                        <Tooltip title={`Previous: ${new Date(task.dueDateHistory[task.dueDateHistory.length-1]).toLocaleDateString()}`} arrow>
                          <Chip label="Modified" color="warning" size="small" sx={{ ml: 1, fontWeight: 600 }} />
                        </Tooltip>
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"><b>Status:</b> {task.status}</Typography>
                    <Typography variant="body2" color="text.secondary"><b>Priority:</b> {task.priority}</Typography>
                    <Typography variant="body2" color="text.secondary"><b>Tags:</b> {Array.isArray(task.tags) ? (task.tags.length > 0 ? task.tags.join(', ') : '-') : (task.tags || '-')}</Typography>
                    {task.startDate && (
                      <Typography variant="body2" color="text.secondary">
                        <b>Start:</b> {new Date(task.startDate).toLocaleDateString()} {task.status === 'in-progress' && <Chip label="in-progress" color="primary" size="small" sx={{ ml: 1 }} />}
                      </Typography>
                    )}
                    {task.finishedAt && (
                      <Typography variant="body2" color="text.secondary">
                        <b>Finished:</b> {new Date(task.finishedAt).toLocaleDateString()} {task.status === 'completed' && <Chip label="completed" color="success" size="small" sx={{ ml: 1 }} />}
                      </Typography>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </List>
      )}

      {/* Paginación */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
        <Button
          variant="outlined"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          PREVIOUS
        </Button>
        <Typography fontWeight={600}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          NEXT
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskList;
