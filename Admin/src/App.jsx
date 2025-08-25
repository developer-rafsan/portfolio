// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './pages/DashboardLayout.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Projects from './Components/Projects.jsx';
import Categories from './Components/Categories.jsx';
import CreateProject from './Components/CreateProject.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Default redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          {/* Child routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="categories" element={<Categories />} />
          <Route path="create-project" element={<CreateProject />} />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
