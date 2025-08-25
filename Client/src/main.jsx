import React, { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Spinner from "./Spinner";

const App = lazy(() => import("./App.jsx"));

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Suspense  fallback={<Spinner size={30} color="red-500" bg="bg-gray-100" />}>
      <App />
    </Suspense>
  </StrictMode>
);
