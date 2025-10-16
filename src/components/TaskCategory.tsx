import React, { useState } from "react";
import { type Task, type TaskStatus } from "../types/Task";
import TaskItem from "./TaskItem";
import ArrowIcon from "../assets/arrrow.svg";
import "../styles/TaskCategory.css";

interface TaskCategoryProps {
  status: TaskStatus;
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskCategory: React.FC<TaskCategoryProps> = ({
  status,
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isExpanded, setIsExpanded] = useState(status === "in-progress");

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <div className="task-category">
      <div
        className="category-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="category-title">
          <span className="status-label">{getStatusLabel(status)}</span>
          <span className="task-count">({tasks.length})</span>
        </div>
        <img
          src={ArrowIcon}
          alt="Expand/Collapse"
          className={`expand-icon ${isExpanded ? "expanded" : ""}`}
        />
      </div>

      <div
        className={`category-tasks ${isExpanded ? "expanded" : "collapsed"}`}
      >
        {tasks.length === 0 ? (
          <div className="empty-category">
            <p>No {getStatusLabel(status).toLowerCase()} tasks</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={() => onUpdateTask(task)}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskCategory;
