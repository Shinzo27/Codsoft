import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Tasks from "./Pages/Tasks";
import Dashboard from "./Pages/Dashboard";
import User from "./Pages/User";
import Trash from "./Pages/Trash";
import TaskDetails from "./Pages/TaskDetails";
import Toaster from 'sonner'

function App() {
  return (
    <main className=" w-full min-h-screen bg-[#f3f4f5]">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<User />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
