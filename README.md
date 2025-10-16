# Task Manager

A modern task management application built with React and TypeScript, featuring a clean UI and intuitive task organization.

## Features

- **Task Management**: Create, edit, and delete tasks
- **Status Tracking**: Organize tasks by status (Pending, In Progress, Completed)
- **Search**: Find tasks quickly with real-time search
- **Persistence**: Tasks are saved to local storage
- **Responsive**: Works on desktop and mobile devices
- **Modern UI**: Clean design with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **CSS3** for styling
- **Local Storage** for data persistence

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with navigation
│   ├── TaskForm.tsx    # Add/Edit task form
│   ├── TaskCategory.tsx # Task grouping by status
│   ├── TaskItem.tsx    # Individual task display
│   ├── Input.tsx       # Reusable input component
│   ├── TextArea.tsx    # Reusable textarea component
│   └── StatusDropdown.tsx # Custom status selector
├── styles/             # CSS stylesheets
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
    ├── useTaskManager.ts # Main business logic hook
    ├── useTaskStorage.ts # Task persistence hook
    └── useLocalStorage.ts # Generic localStorage hook
```

## Key Components

- **TaskForm**: Unified form for adding and editing tasks
- **StatusDropdown**: Custom dropdown with colored status indicators
- **TaskCategory**: Collapsible sections for task organization
- **Input/TextArea**: Reusable form components with consistent styling

## Features Implemented

- Task creation, editing, and deletion
- Status management (Pending, In Progress, Completed)
- Search functionality
- Local storage persistence
- Responsive design
- Smooth animations and transitions
- Custom dropdown components
- Form validation and accessibility
