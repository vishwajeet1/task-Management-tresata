import React from "react";
import { type Task, type TaskFilter } from "../types/Task";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "incomplete":
        return !task.completed;
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {filter === "completed"
            ? "No completed tasks yet."
            : filter === "incomplete"
            ? "All tasks completed! 🎉"
            : "No tasks yet. Add one above!"}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
