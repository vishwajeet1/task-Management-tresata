import React, { useState, useRef } from "react";
import { type Task, type TaskStatus } from "../types/Task";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/delete.svg";
import "../styles/TaskItem.css";

interface TaskItemProps {
  task: Task;
  onUpdateTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const taskRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    // Check if date is valid
    if (!date || isNaN(date.getTime())) {
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return "#6b7280";
      case "in-progress":
        return "#f59e0b";
      case "completed":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

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

  const handleUpdate = () => {
    setIsUpdating(true);
    onUpdateTask(task.id, task.title);

    // Reset updating state after animation
    setTimeout(() => {
      setIsUpdating(false);
    }, 600);
  };

  const handleDelete = () => {
    setIsDeleting(true);

    // Wait for animation to complete before actually deleting
    setTimeout(() => {
      onDeleteTask(task.id);
    }, 300);
  };

  return (
    <div
      ref={taskRef}
      className={`task-item ${isDeleting ? "deleting" : ""} ${
        isUpdating ? "updating" : ""
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="task-avatar">{task.title.charAt(0).toUpperCase()}</div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-status">
            <span
              className="status-dot"
              style={{ backgroundColor: getStatusColor(task.status) }}
            ></span>
            <span className="status-text">{getStatusLabel(task.status)}</span>
          </div>
        </div>

        <p className="task-description">{task.description}</p>
        <p className="task-date">{formatDate(task.createdAt)}</p>
      </div>

      {showActions && !isDeleting && (
        <div className="task-actions">
          <button
            onClick={handleUpdate}
            className="action-button edit-button"
            title="Edit task"
            disabled={isUpdating}
          >
            <img src={EditIcon} alt="Edit" className="action-icon" />
          </button>
          <button
            onClick={handleDelete}
            className="action-button delete-button"
            title="Delete task"
            disabled={isDeleting}
          >
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
