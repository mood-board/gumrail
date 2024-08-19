import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "../src/app/templates/landing-page/LandingPage";
import SignInSide from "../src/app/templates/sign-in-side/SignInSide";
import SignUp from "../src/app/templates/sign-up/SignUp";
import CreateOrganisation from "../src/app/components/onboarder/CreateOrganisation";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";
import CreateSite from "./app/components/onboarder/CreateSite";
import TrackingCodeDisplay from "./app/components/onboarder/Setup";
import Dashboard from "./app/components/Dashboard";
import DashboardV2 from "./app/components/DashboardV2";
import Layout from "./app/components/Layout";
import HotjarSetup from "./app/components/Setup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignInSide />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/onboard",
    children: [
      {
        path: "organisation",
        element: <CreateOrganisation />,
      },
      {
        path: "site",
        element: <CreateSite />,
      },
      {
        path: "setup",
        element: <TrackingCodeDisplay />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/test",
        element: <HotjarSetup />,
      },
      // Add more routes here that should use the Layout
    ],
  },
  {
    path: "/dashboard",
    element: <div>Dashboard</div>,
  },
  {
    path: "/dashboardv2",
    element: <DashboardV2 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
