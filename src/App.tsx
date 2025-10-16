import { useTaskManager } from "./hooks/useTaskManager";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TaskCategory from "./components/TaskCategory";
import TaskForm from "./components/TaskForm";
import FloatingAddButton from "./components/FloatingAddButton";
import "./styles/App.css";
import type { TaskStatus } from "./types/Task";

function App() {
  // Get all task management logic from custom hook
  const {
    currentPage,
    editingTask,
    tasksByStatus,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    handleAddTask,
    handleEditTask,
    handleBackToMain,
  } = useTaskManager();

  // Show add task form
  if (currentPage === "add") {
    return <TaskForm mode="add" onBack={handleBackToMain} onSubmit={addTask} />;
  }

  // Show edit task form
  if (currentPage === "edit" && editingTask) {
    return (
      <TaskForm
        mode="edit"
        task={editingTask}
        onBack={handleBackToMain}
        onSubmit={(title, description, status: TaskStatus) =>
          updateTask(editingTask.id, title, description, status)
        }
      />
    );
  }

  // Main app view with task categories
  return (
    <div className="app">
      <Header title="TO-DO APP" />
      <SearchBar onSearch={setSearchQuery} />

      <main className="app-main">
        <div className="task-categories">
          {/* Render task categories in order: in-progress, pending, completed */}
          {["in-progress", "pending", "completed"].map((status) => (
            <TaskCategory
              key={status}
              status={status as TaskStatus}
              tasks={tasksByStatus[status as keyof typeof tasksByStatus]}
              onUpdateTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>
      </main>

      <FloatingAddButton onClick={handleAddTask} />
    </div>
  );
}

export default App;
