import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TasksPage: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TasksPage;
