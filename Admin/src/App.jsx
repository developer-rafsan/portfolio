import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashbord } from "./components/DashBord/Dashbord";
import { Login } from "./components/Login/Login";
import { ProjectCreate } from "./components/ProjectCreate/ProjectCreate";

function App() {
  const [adminLogin, setAdminLogin] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: adminLogin ? (
        <Dashbord />
      ) : (
        <Login setAdminLogin={setAdminLogin} />
      ),
    },
    {
      path: "/create-project",
      element: adminLogin ? (
        <ProjectCreate />
      ) : (
        <Login setAdminLogin={setAdminLogin} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
