import "./App.css";
import Dashboard from "./routes/Dashboard";
import TaskForm from "./routes/TaskForm";
import { TaskProvider } from "./context/Task.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tasklist from "./routes/Tasklist";
import Login from "./routes/Login";
import { LoginProvider } from "./context/login.context";
import Home from "./routes/Home";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/taskform", element: <TaskForm /> },
    { path: "/tasklist", element: <Tasklist /> },
  ]);

  return (
    <LoginProvider>
      <TaskProvider>
        <div
          className={`w-full min-h-screen flex justify-center py-6 items-center `}
        >
          <RouterProvider router={router} />
        </div>
      </TaskProvider>
    </LoginProvider>
  );
}

export default App;
