import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { updateTask } from '../services/api';

const KanbanColumn = ({ status, tasks, onEditTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: async (item) => {
      if (item.status !== status) {
        const updatedTask = { ...item, status };
        await updateTask(item.id, updatedTask);
      }
    },
  });

  return (
    <div ref={drop} className="kanban-column">
      <h3>{status}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
      ))}
    </div>
  );
};

export default KanbanColumn;
