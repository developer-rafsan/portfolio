import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { ProjectCreate } from "./pages/ProjectCreate/ProjectCreate";
import { Dashbord } from "./pages/DashBord/Dashbord";

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
