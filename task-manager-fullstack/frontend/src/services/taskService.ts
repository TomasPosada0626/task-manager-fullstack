import { authFetch } from './authFetch';


export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  startDate?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string | string[];
  assignedTo?: string;
  finishedAt?: string;
  dueDateHistory?: string[];
}

export interface PaginatedTasks {
  tasks: Task[];
  total: number;
  page: number;
  totalPages: number;
}

export const fetchTasks = async (
  status?: string,
  priority?: string,
  page = 1,
  limit = 10
): Promise<PaginatedTasks> => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (priority) params.append('priority', priority);
  params.append('page', String(page));
  params.append('limit', String(limit));
  const res = await authFetch(`/api/tasks?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await authFetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const res = await authFetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await authFetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
};
