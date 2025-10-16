export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskFilter =
  | "all"
  | "pending"
  | "in-progress"
  | "completed"
  | "incomplete";
