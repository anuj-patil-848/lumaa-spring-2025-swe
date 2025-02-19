const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors'); 
const sequelize = require('../database');
const UserController = require('./Controllers/UserController'); 
const TaskController = require('./Controllers/TaskController'); 
const authenticateJWT = require('./Middleware/authMiddleware');

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3001", credentials: true }));

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
}

//auth
app.post('/auth/register', UserController.createUser);
app.post('/auth/login', UserController.loginUser);

//tasks
app.post('/tasks', authenticateJWT, TaskController.createTask);
app.get('/tasks', authenticateJWT, TaskController.getTasks);
app.put('/tasks/:id', authenticateJWT, TaskController.updateTask);
app.delete('/tasks/:id', authenticateJWT, TaskController.deleteTask);

//Error handlng
app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

startServer();
