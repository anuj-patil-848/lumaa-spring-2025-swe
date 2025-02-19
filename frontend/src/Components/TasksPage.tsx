import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TasksPage.css"; 

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error fetching tasks");
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleAddTask = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description, isComplete: false }),
      });

      const newTask = await response.json();
      if (!response.ok) throw new Error(newTask.message || "Error creating task");
      setTasks([...tasks, newTask]); 
      setTitle("");
      setDescription("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdateTask = async (taskId: number, updatedTask: Partial<Task>) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) throw new Error("Failed to update task");
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="tasks-container">
      <h2>My Tasks</h2>
      {error && <p className="error">{error}</p>}

      {}
      <div className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.isComplete ? "completed" : ""}>
            <span>{task.title} - {task.description}</span>
            <button onClick={() => handleUpdateTask(task.id, { isComplete: !task.isComplete })}>
              {task.isComplete ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TasksPage;
