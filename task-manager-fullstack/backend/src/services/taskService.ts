import { Task } from '../models/Task';

export const createTaskService = async (userId: string, data: any) => {
  if (!data.title) {
    const error = new Error('Title is required');
    (error as any).status = 400;
    throw error;
  }
  const task = new Task({ ...data, user: userId });
  await task.save();
  return task;
};

export const getTasksService = async (userId: string, status?: string, priority?: string) => {
  const filter: any = { user: userId };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  return Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
};

export const getTaskByIdService = async (userId: string, taskId: string) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found');
    (error as any).status = 404;
    throw error;
  }
  return task;
};

export const updateTaskService = async (userId: string, taskId: string, data: any) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, user: userId }, data, { new: true });
  if (!task) {
    const error = new Error('Task not found');
    (error as any).status = 404;
    throw error;
  }
  return task;
};

export const deleteTaskService = async (userId: string, taskId: string) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found');
    (error as any).status = 404;
    throw error;
  }
  return;
};
