import React from "react";
import { type Task, type TaskFilter } from "../types/Task";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onUpdateTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onUpdateTask,
  onDeleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.status === "completed";
      case "incomplete":
        return task.status !== "completed";
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
      {filteredTasks.map((task, index) => (
        <div key={task.id} style={{ "--index": index } as React.CSSProperties}>
          <TaskItem
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
