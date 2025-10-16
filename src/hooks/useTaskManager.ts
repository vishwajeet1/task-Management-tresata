import { useState, useCallback, useMemo } from "react";
import { type Task, type TaskStatus } from "../types/Task";
import { useTaskStorage } from "./useTaskStorage";

export function useTaskManager() {
  // Initial sample data for demo purposes
  const [tasks, setTasks] = useTaskStorage("tasks", [
    {
      id: "1",
      title: "Review PR #123",
      description: "Need to review the authentication changes before merging",
      status: "in-progress",
      createdAt: new Date(2024, 6, 31),
      updatedAt: new Date(2024, 6, 31),
    },
    {
      id: "2",
      title: "Update documentation",
      description: "Add examples for the new API endpoints",
      status: "in-progress",
      createdAt: new Date(2024, 6, 30),
      updatedAt: new Date(2024, 6, 30),
    },
    {
      id: "3",
      title: "Fix login bug",
      description: "Users can't login with special characters in password",
      status: "pending",
      createdAt: new Date(2024, 6, 29),
      updatedAt: new Date(2024, 6, 29),
    },
    {
      id: "4",
      title: "Setup CI/CD pipeline",
      description: "Configure automated testing and deployment",
      status: "pending",
      createdAt: new Date(2024, 6, 28),
      updatedAt: new Date(2024, 6, 28),
    },
    {
      id: "5",
      title: "Database migration",
      description: "Migrate user table to new schema",
      status: "completed",
      createdAt: new Date(2024, 6, 27),
      updatedAt: new Date(2024, 6, 27),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<"main" | "add" | "edit">(
    "main"
  );
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter tasks based on search query - search both title and description
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  // Group filtered tasks by their status for display
  const tasksByStatus = useMemo(() => {
    return {
      pending: filteredTasks.filter((task) => task.status === "pending"),
      "in-progress": filteredTasks.filter(
        (task) => task.status === "in-progress"
      ),
      completed: filteredTasks.filter((task) => task.status === "completed"),
    };
  }, [filteredTasks]);

  // CRUD operations for tasks
  const addTask = useCallback(
    (title: string, description: string, status: TaskStatus) => {
      const newTask: Task = {
        id: Date.now().toString(), // Simple ID generation
        title,
        description,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, title: string, description: string, status: TaskStatus) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, title, description, status, updatedAt: new Date() }
            : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  // Navigation between different views
  const handleAddTask = useCallback(() => {
    setCurrentPage("add");
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setCurrentPage("edit");
  }, []);

  const handleBackToMain = useCallback(() => {
    setCurrentPage("main");
    setEditingTask(null);
  }, []);

  return {
    // State
    tasks,
    searchQuery,
    currentPage,
    editingTask,
    filteredTasks,
    tasksByStatus,

    // Actions
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,

    // Navigation
    handleAddTask,
    handleEditTask,
    handleBackToMain,
  };
}
