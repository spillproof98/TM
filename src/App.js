import React, { useState, useEffect } from 'react';
import KanbanColumn from './components/KanbanColumn';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import { fetchTasks, createTask, updateTask } from './services/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetchTasks();
      setTasks(response.data);
    };
    loadTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    const response = await createTask(newTask);
    setTasks((prev) => [...prev, response.data]);
    setAddModalOpen(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleTaskUpdated = async (updatedTask) => {
    const response = await updateTask(updatedTask.id, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? response.data : task))
    );
    setEditModalOpen(false);
  };

  return (
    <div>
      <header className="header">
        <h1>Task Management</h1>
        <button className="btn-primary" onClick={() => setAddModalOpen(true)}>
          Add Task
        </button>
      </header>
      <div className="kanban-board">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onEditTask={handleEditTask}
          />
        ))}
      </div>
      {isAddModalOpen && (
        <AddTaskModal onClose={() => setAddModalOpen(false)} onTaskAdded={handleAddTask} />
      )}
      {isEditModalOpen && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setEditModalOpen(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default App;
