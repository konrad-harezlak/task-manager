# Task Manager

## Description

Task Manager is a simple task management system that allows users to register, log in, add, edit, delete, and view tasks. The system supports categories, titles, and task descriptions, as well as the generation of PDF and TXT files containing task information.

## Features

1. **Registration and Login:**
   - Users can register new accounts and log in to existing ones.

2. **Task Management:**
   - Adding new tasks.
   - Editing existing tasks (changing data, categories, titles, descriptions).
   - Deleting tasks.

3. **Categories, Titles, and Descriptions:**
   - Tasks are categorized and have titles and descriptions.

4. **Viewing Tasks:**
   - Users can view all their tasks.

5. **Generating PDF and TXT Files:**
   - Generating a PDF file containing a view of all tasks.
   - Generating a TXT file with tasks that can be uploaded back to the website to update tasks.

6. **Logout:**
   - Users can safely log out.

7. **Admin Page:**
   - Access to the admin page is restricted to users with the "admin" role.
   - On the admin page, it is possible to delete users (who are not admins) from the database.

## Frontend

### Installation

```bash
npm install react-router-dom
npm install axios
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
npm install jspdf
```
### Configuration
Open the file frontend/src/api/api.js and update the baseURL variable to point to your locally running backend server:

```javascript
// Change this line
// const baseURL = "https://task-manager-backend-umxh.onrender.com";
const baseURL = "http://localhost:3000";
```

This change is necessary to connect the frontend to your locally running backend server.


## Backend

### Installation

```bash
npm install express
npm install pg
npm install jsonwebtoken
npm install dotenv
npm install cors
npm install cookie-parser
```

## Running the Application

### Start the frontend:
```bash
Copy code
cd frontend
```
npm start
### Start the backend:
```bash
Copy code
cd backend
npm start
```

### Demo
You can access the demo website at [Task Manager Demo](https://task-manager-frontend-2l7a.onrender.com). Use the following credentials:

### Admin Account:

Username: admin
Password: admin

### User Account:

Username: user1
Password: user
