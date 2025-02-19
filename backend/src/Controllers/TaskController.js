const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const Task = require('../Entities/Task'); 

// Get all tasks for logged-in user
async function getTasks(req, res) {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.userId } });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createTask(req, res) {
    const { title, description, isComplete } = req.body;

    try {

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. No user ID in request.' });
        }

        const newTask = await Task.create({
            title,
            description,
            isComplete,
            userId: req.user.userId, 
        });

        return res.status(201).json({
            message: 'Task created successfully',
            task: {
                id: newTask.id,
                title: newTask.title,
                description: newTask.description,
                isComplete: newTask.isComplete,
                userId: newTask.userId,
            },
        });
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateTask(req, res) {
    const { id } = req.params;  
    const updates = req.body;   

    try {
        const task = await Task.findOne({ where: { id, userId: req.user.userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.update(updates);
        res.json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteTask(req, res) {
    const { id } = req.params;  

    try {
        const task = await Task.findOne({ where: { id, userId: req.user.userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
