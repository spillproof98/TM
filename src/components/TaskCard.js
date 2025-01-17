import React from 'react';
import { useDrag } from 'react-dnd';
import { deleteTask } from '../services/api';

const TaskCard = ({ task, onEditTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDelete = async () => {
    await deleteTask(task.id);
    window.location.reload();
  };

  return (
    <div ref={drag} className={`task-card ${isDragging ? 'dragging' : ''}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button className="btn-secondary" onClick={() => onEditTask(task)}>
        Edit
      </button>
      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
