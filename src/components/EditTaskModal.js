import React, { useState } from 'react';
import { updateTask } from '../services/api';

const EditTaskModal = ({ task, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, status };
    const response = await updateTask(task.id, updatedTask);
    onTaskUpdated(response.data);
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
