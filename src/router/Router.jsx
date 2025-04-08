// src/routes/router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../authentication/Register";
import SignIn from "../authentication/SignIn";
import Services from "../pages/Dashboard/Services";

// ✅ Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import AddService from "../pages/Dashboard/AddService";
import SingleService from "../pages/Dashboard/SingleService";
import BookedService from "../pages/Dashboard/BookedService";
import ServiceTodo from "../pages/Dashboard/ServiceToDo";
import ManageServices from "../pages/Dashboard/ManageServices";
import AllServices from "../pages/Dashboard/AllServices";
import PrivateRoute from "../Private/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/addService",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/allServices",
        element: (
          <PrivateRoute>
            <AllServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/singleService",
        element: (
          <PrivateRoute>
            <SingleService />
          </PrivateRoute>
        ),
      },
      {
        path: "/manageService",
        element: (
          <PrivateRoute>
            <ManageServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookedService",
        element: (
          <PrivateRoute>
            <BookedService />
          </PrivateRoute>
        ),
      },
      {
        path: "/serviceToDo",
        element: (
          <PrivateRoute>
            <ServiceTodo />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
