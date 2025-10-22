import { useState, useCallback, useMemo } from "react";
import { type Task, type TaskStatus } from "../types/Task";
import { useTaskStorage } from "./useTaskStorage";
import { SAMPLE_TASKS } from "../constant";

export function useTaskManager() {
  // Initial sample data for demo purposes
  const [tasks, setTasks] = useTaskStorage("tasks", SAMPLE_TASKS);

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
