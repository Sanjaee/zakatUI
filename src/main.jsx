import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ZakatCalculator from "./CaculatorZakat";
import Data from "./Data";

// import DetailPopuler from "./Pages/Payment/DetailCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Data />,
  },
  {
    path: "/kakulator",
    element: <ZakatCalculator />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
