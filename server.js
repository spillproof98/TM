const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

let tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Complete the project proposal',
    status: 'To Do',
    screenshots: []
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Finalize the design layout',
    status: 'In Progress',
    screenshots: []
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Prepare the client presentation',
    status: 'Done',
    screenshots: []
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description, status, screenshots } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    screenshots: screenshots || [],
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status, screenshots } = req.body;
  
  let task = tasks.find((task) => task.id === parseInt(id));
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.title = title;
  task.description = description;
  task.status = status;
  task.screenshots = screenshots || [];
  
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
