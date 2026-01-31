"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskService = exports.updateTaskService = exports.getTaskByIdService = exports.getTasksService = exports.createTaskService = void 0;
const Task_1 = require("../models/Task");
const createTaskService = async (userId, data) => {
    const requiredFields = ['title', 'description', 'status', 'priority', 'assignedTo', 'startDate', 'dueDate'];
    for (const field of requiredFields) {
        if (typeof data[field] === 'undefined') {
            // Si no viene, lo agregamos como string vacío
            data[field] = '';
        }
        // Solo validamos los campos realmente obligatorios
        if (['title', 'description', 'status', 'priority', 'dueDate'].includes(field)) {
            if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
                const error = new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                error.status = 400;
                throw error;
            }
        }
    }
    // Convert tags to array if it's a string
    if (data.tags && typeof data.tags === 'string') {
        data.tags = data.tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
    }
    // Si startDate o finishedAt llegan vacíos, igual los guardamos
    if (typeof data.startDate === 'undefined')
        data.startDate = '';
    if (typeof data.finishedAt === 'undefined')
        data.finishedAt = '';
    if (typeof data.assignedTo === 'undefined')
        data.assignedTo = '';
    const task = new Task_1.Task({ ...data, user: userId });
    await task.save();
    return task;
};
exports.createTaskService = createTaskService;
const getTasksService = async (userId, status, priority, page = 1, limit = 10) => {
    const filter = { user: userId };
    if (status)
        filter.status = status;
    if (priority)
        filter.priority = priority;
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
        Task_1.Task.find(filter)
            .sort({ dueDate: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Task_1.Task.countDocuments(filter),
    ]);
    return {
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getTasksService = getTasksService;
const getTaskByIdService = async (userId, taskId) => {
    const task = await Task_1.Task.findOne({ _id: taskId, user: userId });
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    return task;
};
exports.getTaskByIdService = getTaskByIdService;
const updateTaskService = async (userId, taskId, data) => {
    const currentTask = await Task_1.Task.findOne({ _id: taskId, user: userId });
    if (!currentTask) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    // Limpiar string vacío y normalizar a null
    if (data.startDate === '' || data.startDate === undefined)
        data.startDate = null;
    if (data.finishedAt === '' || data.finishedAt === undefined)
        data.finishedAt = null;
    // Si el status vuelve a 'pending', limpiar fechas
    if (data.status === 'pending') {
        data.startDate = null;
        data.finishedAt = null;
    }
    // Si el status pasa a 'in-progress' y no hay startDate válido, poner fecha actual
    if (data.status === 'in-progress' && (!currentTask.startDate || !data.startDate)) {
        data.startDate = new Date();
    }
    // Si el status pasa a 'completed' y no hay finishedAt válido, poner fecha actual
    if (data.status === 'completed' && (!currentTask.finishedAt || !data.finishedAt)) {
        data.finishedAt = new Date();
        // Si no hay startDate, también lo ponemos (por si se salta el paso in-progress)
        if (!currentTask.startDate && !data.startDate) {
            data.startDate = new Date();
        }
    }
    // Nunca guardar string vacío en fechas
    if (data.startDate === '')
        data.startDate = null;
    if (data.finishedAt === '')
        data.finishedAt = null;
    // Guardar historial de dueDate si cambia
    if (data.dueDate && currentTask.dueDate && new Date(data.dueDate).getTime() !== new Date(currentTask.dueDate).getTime()) {
        if (!currentTask.dueDateHistory)
            currentTask.dueDateHistory = [];
        // Solo guardar si la nueva fecha es diferente
        data.dueDateHistory = [...currentTask.dueDateHistory, currentTask.dueDate];
    }
    const task = await Task_1.Task.findOneAndUpdate({ _id: taskId, user: userId }, data, { new: true });
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    return task;
};
exports.updateTaskService = updateTaskService;
const deleteTaskService = async (userId, taskId) => {
    const task = await Task_1.Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
    }
    return;
};
exports.deleteTaskService = deleteTaskService;
//# sourceMappingURL=taskService.js.map