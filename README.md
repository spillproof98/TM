# Task Management Dashboard

This is a simple task management dashboard where users can create, update, delete, and track tasks. Tasks can also include screenshots, which can be uploaded via a drag-and-drop feature.

## Features

- **Add Tasks**: Add new tasks with a title, description, and status.
- **Edit Tasks**: Update the title, description, and status of existing tasks.
- **Delete Tasks**: Remove tasks from the dashboard.
- **File Upload**: Attach screenshots to tasks (with a 50MB size limit).
- **Drag-and-Drop**: Drag tasks between columns to change their status.

## Project Structure

project-root/ │ ├── public/ │ ├── index.html # HTML template ├── src/ │ ├── components/ # React components │ ├── services/ # API communication │ ├── App.js # Main app component │ ├── index.js # Entry point for the app │ ├── styles.css # Application styling ├── uploads/ # Folder for uploaded files ├── server.js # Express backend for file uploads ├── db.json # Mock database for tasks ├── package.json # Project dependencies └── README.md # Project documentation

## Backend Setup

The backend is built using **Express** and **Multer** to handle file uploads. The API provides the following endpoints:

- **`POST /upload`**: Upload a screenshot (max 50MB).
- **`GET /uploads/:filename`**: Serve uploaded files.
- **`GET /tasks`**: Retrieve all tasks (mocked data stored in `db.json`).
- **`POST /tasks`**: Add a new task.
- **`PUT /tasks/:id`**: Update an existing task.
- **`DELETE /tasks/:id`**: Delete a task.

## Frontend Setup

The frontend is built with **React** and allows users to:

- View tasks in Kanban columns.
- Add new tasks.
- Edit tasks.
- Delete tasks.
- Upload and display screenshots.

## Running the Project

### 1. Backend Setup

1. Install the required packages:
   ```bash
   npm install express multer
node server.js
npm start

---

### **How to Run the Application**

1. **Install Backend Dependencies**:
   - Install dependencies for the backend:
   ```bash
   npm install express multer
mkdir uploads
