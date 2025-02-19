import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import TasksPage from "./Components/TasksPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
};

export default App;
