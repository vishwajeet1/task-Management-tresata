import React from "react";
import { type TaskFilter as FilterType } from "../types/Task";
import "../styles/TaskFilter.css";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    pending: number;
    "in-progress": number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="task-filter">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-button ${currentFilter === key ? "active" : ""}`}
          onClick={() => onFilterChange(key)}
        >
          {label} ({taskCounts[key as keyof typeof taskCounts]})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
