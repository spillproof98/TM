import React, { useState } from 'react';

const AddTaskModal = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [screenshots, setScreenshots] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setScreenshots((prev) => [...prev, data.filePath]);
      } else {
        setError('File upload failed');
      }
    } catch (err) {
      console.error('File upload error:', err);
      setError('File upload error');
    }
  };

  const handleFileChange = (e) => {
    setError(null);
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.size <= 50 * 1024 * 1024) {
        handleFileUpload(file);
      } else {
        setError('File size exceeds 50 MB');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status, screenshots };
    try {
      await onTaskAdded(newTask);
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="form-input"
          accept="image/*"
        />
        {screenshots.length > 0 && (
          <div className="file-list">
            {screenshots.map((file, index) => (
              <p key={index} className="file-name">
                {file}
              </p>
            ))}
          </div>
        )}
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button className="btn-primary" type="submit">
            Add Task
          </button>
          <button className="btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;
