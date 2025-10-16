import React, { useState, useEffect } from "react";
import { type Task, type TaskStatus } from "../types/Task";
import Header from "./Header";
import Input from "./Input";
import TextArea from "./TextArea";
import StatusDropdown from "./StatusDropdown";
import "../styles/TaskForm.css";

interface TaskFormProps {
  mode: "add" | "edit";
  task?: Task;
  onBack: () => void;
  onSubmit: (title: string, description: string, status: TaskStatus) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  mode,
  task,
  onBack,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");

  // Populate form fields when editing an existing task
  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [mode, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title.trim(), description.trim(), status);
      // Clear form after successful submission in add mode
      if (mode === "add") {
        setTitle("");
        setDescription("");
        setStatus("pending");
      }
      onBack();
    }
  };

  const handleCancel = () => {
    // Clear form when canceling in add mode
    if (mode === "add") {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
    onBack();
  };

  const pageTitle = mode === "add" ? "Add Task" : "Edit Task";
  const submitButtonText = mode === "add" ? "ADD" : "Update";

  return (
    <div className="task-form-page">
      <Header title={pageTitle} showBackButton={true} onBack={handleCancel} />

      <div className="page-content">
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <Input
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="Enter task title"
              variant="form"
              id={`${mode}-task-title`}
              name="title"
              required
            />
          </div>

          <div className="form-group">
            <TextArea
              value={description}
              onChange={setDescription}
              placeholder="Enter task description"
              rows={4}
              required
              variant="form"
              id={`${mode}-task-description`}
              name="description"
            />
          </div>

          {mode === "edit" && (
            <div className="form-group">
              <StatusDropdown
                value={status}
                onChange={setStatus}
                id={`${mode}-task-status`}
                name="status"
                required
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
